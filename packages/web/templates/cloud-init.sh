#!/bin/bash
# =============================================================================
# HoldMyClaw Cloud-Init Script
# =============================================================================
# Runs automatically on first boot via cloud-init user_data.
# Identical across all cloud providers (Hetzner, DigitalOcean, etc.)
#
# What this script does:
#   1. Creates a non-root user with SSH access
#   2. Hardens security (firewall, fail2ban, disable password auth)
#   3. Installs Docker Engine + Docker Compose
#   4. Writes OpenClaw configuration files
#   5. Starts OpenClaw via Docker Compose
#   6. Sets up Caddy reverse proxy with health endpoint
#
# Template variables (substituted by core/cloud-init.ts before sending):
#   ${SSH_PUBLIC_KEY}         — User's public key (generated client-side)
#   ${OPENCLAW_GATEWAY_TOKEN} — Random gateway auth token
#   ${OPENCLAW_CONFIG_JSON}   — Rendered openclaw.json content
#   ${OPENCLAW_VERSION}       — Pinned OpenClaw Docker image tag
#   ${SOUL_MD_BLOCK}          — Either a heredoc writing SOUL.md or empty string
#   ${IDENTITY_MD_BLOCK}      — Either a heredoc writing IDENTITY.md or empty string
# =============================================================================

set -euo pipefail

LOG="/var/log/holdmyclaw-setup.log"
exec > >(tee -a "$LOG") 2>&1
echo "=== HoldMyClaw setup started at $(date) ==="

# --- 1. Create non-root user ---
echo "[1/8] Creating user 'openclaw'..."
useradd -m -s /bin/bash -G sudo openclaw
echo "openclaw ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/openclaw
mkdir -p /home/openclaw/.ssh
echo "${SSH_PUBLIC_KEY}" > /home/openclaw/.ssh/authorized_keys
chmod 700 /home/openclaw/.ssh
chmod 600 /home/openclaw/.ssh/authorized_keys
chown -R openclaw:openclaw /home/openclaw/.ssh

# --- 2. Security hardening ---
echo "[2/8] Hardening security..."
apt-get update -y
apt-get install -y ufw fail2ban || true

# Firewall: allow SSH + HTTP + OpenClaw dashboard
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # Caddy HTTP
ufw allow 18789/tcp # OpenClaw Control UI (direct access fallback)
ufw --force enable

# fail2ban for SSH brute-force protection
systemctl enable fail2ban || true
systemctl start fail2ban || true

# Disable root login and password authentication for SSH
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd

# --- 3. Install Docker Engine (official repo) ---
echo "[3/8] Installing Docker..."
apt-get install -y ca-certificates curl gnupg || true
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
usermod -aG docker openclaw

# --- 4. Create OpenClaw directory structure ---
echo "[4/8] Setting up OpenClaw directories..."
mkdir -p /opt/openclaw/config
mkdir -p /opt/openclaw/workspace

# --- 5. Write Docker Compose .env file ---
cat > /opt/openclaw/.env << 'ENVEOF'
OPENCLAW_GATEWAY_TOKEN=${OPENCLAW_GATEWAY_TOKEN}
OPENCLAW_VERSION=${OPENCLAW_VERSION}
ENVEOF
chmod 600 /opt/openclaw/.env

# --- 6. Write docker-compose.yml ---
cat > /opt/openclaw/docker-compose.yml << 'COMPOSEEOF'
services:
  openclaw-gateway:
    image: ghcr.io/openclaw/openclaw:${OPENCLAW_VERSION:-2026.2.6-3}
    container_name: openclaw-gateway
    environment:
      HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
    volumes:
      - ./config:/home/node/.openclaw
      - ./workspace:/home/node/.openclaw/workspace
    ports:
      - "18789:18789"
      - "18790:18790"
    init: true
    restart: unless-stopped
    command:
      - "node"
      - "dist/index.js"
      - "gateway"
      - "--bind"
      - "lan"
      - "--port"
      - "18789"

  openclaw-cli:
    image: ghcr.io/openclaw/openclaw:${OPENCLAW_VERSION:-2026.2.6-3}
    container_name: openclaw-cli
    environment:
      HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
      BROWSER: echo
    volumes:
      - ./config:/home/node/.openclaw
      - ./workspace:/home/node/.openclaw/workspace
    stdin_open: true
    tty: true
    init: true
    entrypoint: ["node", "dist/index.js"]
    profiles: ["cli"]
COMPOSEEOF

# --- 7. Write openclaw.json configuration ---
echo "[5/8] Writing OpenClaw configuration..."
cat > /opt/openclaw/config/openclaw.json << 'CONFIGEOF'
${OPENCLAW_CONFIG_JSON}
CONFIGEOF

# --- 8. Write SOUL.md (if personality provided) ---
${SOUL_MD_BLOCK}

# --- 9. Write IDENTITY.md (if identity provided) ---
${IDENTITY_MD_BLOCK}

# --- 10. Fix ownership (container runs as uid 1000 = node user) ---
echo "[6/8] Setting file permissions..."
chown -R 1000:1000 /opt/openclaw/config
chown -R 1000:1000 /opt/openclaw/workspace
chown openclaw:openclaw /opt/openclaw/.env
chown openclaw:openclaw /opt/openclaw/docker-compose.yml

# --- 11. Pull and start OpenClaw ---
echo "[7/8] Starting OpenClaw..."
cd /opt/openclaw
docker compose pull
docker compose up -d openclaw-gateway

# --- 12. Install Caddy for reverse proxy + health endpoint ---
echo "[8/8] Setting up web proxy..."
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https || true
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  > /etc/apt/sources.list.d/caddy-stable.list
apt-get update -y
apt-get install -y caddy

cat > /etc/caddy/Caddyfile << 'CADDYEOF'
:80 {
    # Health endpoint for HoldMyClaw wizard polling
    handle /health {
        respond "OK" 200
    }

    # Proxy to OpenClaw Control UI + Gateway
    handle {
        reverse_proxy localhost:18789
    }
}
CADDYEOF

systemctl restart caddy

echo "=== HoldMyClaw setup completed at $(date) ==="
echo "=== OpenClaw Control UI: http://$(hostname -I | awk '{print $1}'):18789 ==="
echo "=== Health endpoint: http://$(hostname -I | awk '{print $1}')/health ==="
