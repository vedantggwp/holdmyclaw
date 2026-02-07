/**
 * DigitalOcean API adapter.
 * See ProductPlan.md — DigitalOcean adapter specifics.
 */

import type {
  CloudProvider,
  Region,
  ServerType,
  ServerConfig,
  ValidationResult,
} from "./types.js";
import type { CreateServerResult } from "../types.js";

const API_BASE = "https://api.digitalocean.com/v2";
const CONSOLE_BASE = "https://cloud.digitalocean.com";

const REGIONS: Region[] = [
  { id: "nyc1", name: "New York 1" },
  { id: "sfo3", name: "San Francisco 3" },
  { id: "ams3", name: "Amsterdam 3" },
  { id: "sgp1", name: "Singapore 1" },
  { id: "lon1", name: "London 1" },
  { id: "fra1", name: "Frankfurt 1" },
  { id: "blr1", name: "Bangalore 1" },
];

const SERVER_TYPES: ServerType[] = [
  { id: "s-2vcpu-4gb", name: "s-2vcpu-4gb", description: "2 vCPU, 4 GB RAM — ~$6/mo" },
];

async function doFetch(
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

export const digitalocean: CloudProvider = {
  name: "digitalocean",
  displayName: "DigitalOcean",

  getRegions: () => REGIONS,
  getServerTypes: () => SERVER_TYPES,
  getEstimatedCost: () => "~$6/month",

  getConsoleUrl(): string {
    return `${CONSOLE_BASE}/droplets`;
  },

  async validateApiKey(apiKey: string): Promise<ValidationResult> {
    const res = await doFetch("/account", apiKey);
    if (res.ok) return { valid: true };
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    const message = body.message ?? res.statusText;
    if (res.status === 401) {
      return {
        valid: false,
        error:
          "This API token isn't valid. Get one from cloud.digitalocean.com → API → Tokens.",
        detail: message,
      };
    }
    return { valid: false, error: message, detail: message };
  },

  async createServer(config: ServerConfig): Promise<CreateServerResult> {
    const { apiKey, sshPublicKey, cloudInitScript, region, serverType, name } =
      config;

    // Add SSH key to DigitalOcean
    const keyRes = await doFetch("/account/keys", apiKey, {
      method: "POST",
      body: JSON.stringify({
        name: `holdmyclaw-${Date.now()}`,
        public_key: sshPublicKey,
      }),
    });
    if (!keyRes.ok) {
      const body = (await keyRes.json().catch(() => ({}))) as { message?: string };
      throw new Error(
        body.message ?? `Failed to add SSH key: ${keyRes.status}`
      );
    }
    const keyData = (await keyRes.json()) as { ssh_key?: { id: number }; id?: number };
    const sshKeyId = keyData.ssh_key?.id ?? keyData.id;
    if (!sshKeyId) {
      throw new Error("DigitalOcean did not return SSH key id");
    }

    const res = await doFetch("/droplets", apiKey, {
      method: "POST",
      body: JSON.stringify({
        name: name || "openclaw",
        region: region || "nyc1",
        size: serverType || "s-2vcpu-4gb",
        image: "ubuntu-24-04-x64",
        ssh_keys: [sshKeyId],
        user_data: cloudInitScript,
      }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      throw new Error(
        body.message ?? `Failed to create droplet: ${res.status}`
      );
    }

    const data = (await res.json()) as {
      droplet?: { id: number; networks?: { v4?: Array<{ type: string; ip_address?: string }> } };
    };
    const droplet = data.droplet;
    if (!droplet?.id) {
      throw new Error("DigitalOcean did not return droplet id");
    }

    // Droplet IP is not available immediately; caller will poll getServerStatus
    const ip =
      droplet.networks?.v4?.find((n: { type: string }) => n.type === "public")
        ?.ip_address ?? "";

    return {
      serverId: String(droplet.id),
      serverIp: ip,
    };
  },

  async getServerStatus(
    serverId: string,
    apiKey: string
  ): Promise<{ status: string; ip?: string }> {
    const res = await doFetch(`/droplets/${serverId}`, apiKey);
    if (!res.ok) return { status: "unknown" };
    const data = (await res.json()) as {
      droplet?: { status?: string; networks?: { v4?: Array<{ type: string; ip_address?: string }> } };
    };
    const d = data.droplet;
    const ip =
      d?.networks?.v4?.find((n: { type: string }) => n.type === "public")
        ?.ip_address;
    return {
      status: d?.status ?? "unknown",
      ip,
    };
  },

  async deleteServer(serverId: string, apiKey: string): Promise<void> {
    const res = await doFetch(`/droplets/${serverId}`, apiKey, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 404) {
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      throw new Error(body.message ?? `Delete failed: ${res.status}`);
    }
  },
};
