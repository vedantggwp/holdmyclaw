/**
 * Cloud provider adapter interface and shared types.
 * See ProductPlan.md — Provider Adapter Interface.
 */

import type { ValidationResult, CreateServerResult } from "../types.js";

export type { ValidationResult, CreateServerResult };

export interface Region {
  id: string;
  name: string;
}

export interface ServerType {
  id: string;
  name: string;
  description?: string;
}

export interface ServerConfig {
  apiKey: string;
  sshPublicKey: string;
  cloudInitScript: string;
  region: string;
  serverType: string;
  name: string;
}

export interface CloudProvider {
  name: string;
  displayName: string;

  validateApiKey(apiKey: string): Promise<ValidationResult>;

  createServer(config: ServerConfig): Promise<CreateServerResult>;
  getServerStatus(serverId: string, apiKey: string): Promise<{ status: string; ip?: string }>;
  deleteServer(serverId: string, apiKey: string): Promise<void>;

  getConsoleUrl(serverId: string): string;
  getRegions(): Region[];
  getServerTypes(): ServerType[];
  getEstimatedCost(): string;
}

export type CloudProviderId = "hetzner" | "digitalocean";
