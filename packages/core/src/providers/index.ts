/**
 * Cloud provider registry and factory.
 * See ProductPlan.md — Provider Adapter Interface.
 */

import type { CloudProvider, CloudProviderId } from "./types.js";
import { hetzner } from "./hetzner.js";
import { digitalocean } from "./digitalocean.js";

const providers: Record<CloudProviderId, CloudProvider> = {
  hetzner,
  digitalocean,
};

export function getProvider(id: CloudProviderId): CloudProvider {
  const p = providers[id];
  if (!p) throw new Error(`Unknown provider: ${id}`);
  return p;
}

export function getProviderIds(): CloudProviderId[] {
  return Object.keys(providers) as CloudProviderId[];
}

export { hetzner, digitalocean };
export type { CloudProvider, CloudProviderId } from "./types.js";
export { generateLocalDockerFiles, getLocalConfigTemplateName } from "./local-docker.js";
export type { LocalDockerFiles } from "./local-docker.js";
