/**
 * Hetzner Cloud API adapter.
 * See ProductPlan.md — Hetzner adapter specifics.
 */

import type {
  CloudProvider,
  Region,
  ServerType,
  ServerConfig,
  ValidationResult,
} from "./types.js";
import type { CreateServerResult } from "../types.js";

const API_BASE = "https://api.hetzner.cloud/v1";
const CONSOLE_BASE = "https://console.hetzner.cloud";

const REGIONS: Region[] = [
  { id: "fsn1", name: "Falkenstein, Germany" },
  { id: "nbg1", name: "Nuremberg, Germany" },
  { id: "hel1", name: "Helsinki, Finland" },
  { id: "ash", name: "Ashburn, USA" },
  { id: "hil", name: "Hillsboro, USA" },
  { id: "sin", name: "Singapore" },
];

const SERVER_TYPES: ServerType[] = [
  { id: "cx22", name: "CX22", description: "2 vCPU, 4 GB RAM — ~€4/mo" },
];

async function hetznerFetch(
  path: string,
  apiKey: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export const hetzner: CloudProvider = {
  name: "hetzner",
  displayName: "Hetzner",

  getRegions: () => REGIONS,
  getServerTypes: () => SERVER_TYPES,
  getEstimatedCost: () => "~$4/month",

  getConsoleUrl(_serverId: string): string {
    return `${CONSOLE_BASE}/projects`;
  },

  async validateApiKey(apiKey: string): Promise<ValidationResult> {
    const res = await hetznerFetch("/servers?per_page=1", apiKey);
    if (res.ok) return { valid: true };
    const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    const message = body.error?.message ?? res.statusText;
    if (res.status === 401) {
      return {
        valid: false,
        error: "This API key isn't valid. Check that you copied the full key from Hetzner Cloud Console → Security → API Tokens.",
        detail: message,
      };
    }
    return { valid: false, error: message, detail: message };
  },

  async createServer(config: ServerConfig): Promise<CreateServerResult> {
    const { apiKey, sshPublicKey, cloudInitScript, region, serverType, name } =
      config;

    // Add SSH key to Hetzner (required before create)
    const keyRes = await hetznerFetch("/ssh_keys", apiKey, {
      method: "POST",
      body: JSON.stringify({
        name: `holdmyclaw-${Date.now()}`,
        public_key: sshPublicKey,
      }),
    });
    if (!keyRes.ok) {
      const body = (await keyRes.json().catch(() => ({}))) as { error?: { message?: string } };
      throw new Error(
        body.error?.message ?? `Failed to add SSH key: ${keyRes.status}`
      );
    }
    const keyData = (await keyRes.json()) as { ssh_key?: { id: number } };
    const sshKeyId = keyData.ssh_key?.id;
    if (!sshKeyId) {
      throw new Error("Hetzner did not return SSH key id");
    }

    const res = await hetznerFetch("/servers", apiKey, {
      method: "POST",
      body: JSON.stringify({
        name: name || "openclaw",
        server_type: serverType || "cx22",
        image: "ubuntu-24.04",
        location: region || "fsn1",
        ssh_keys: [sshKeyId],
        user_data: cloudInitScript,
      }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
      throw new Error(
        body.error?.message ?? `Failed to create server: ${res.status}`
      );
    }

    const data = (await res.json()) as {
      server?: { id: number; public_net?: { ipv4?: { ip: string } } };
    };
    const server = data.server;
    if (!server?.id || !server.public_net?.ipv4?.ip) {
      throw new Error("Hetzner did not return server id or IP");
    }

    return {
      serverId: String(server.id),
      serverIp: server.public_net.ipv4.ip,
    };
  },

  async getServerStatus(
    serverId: string,
    apiKey: string
  ): Promise<{ status: string; ip?: string }> {
    const res = await hetznerFetch(`/servers/${serverId}`, apiKey);
    if (!res.ok) return { status: "unknown" };
    const data = (await res.json()) as {
      server?: { status?: string; public_net?: { ipv4?: { ip: string } } };
    };
    const server = data.server;
    return {
      status: server?.status ?? "unknown",
      ip: server?.public_net?.ipv4?.ip,
    };
  },

  async deleteServer(serverId: string, apiKey: string): Promise<void> {
    const res = await hetznerFetch(`/servers/${serverId}`, apiKey, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 404) {
      const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
      throw new Error(body.error?.message ?? `Delete failed: ${res.status}`);
    }
  },
};
