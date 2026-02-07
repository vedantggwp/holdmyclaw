/**
 * Wizard state and reducer for setup flow.
 * See ProductPlan.md — Wizard State Management, Wizard Action Types.
 */

export type DeployTarget = "cloud" | "local";
export type CloudProviderId = "hetzner" | "digitalocean";
export type LLMProvider = "anthropic" | "openai" | "google" | "openrouter";
export type Channel = "telegram" | "whatsapp" | "discord";

export interface WizardState {
  step: number;
  deployTarget: DeployTarget | null;
  cloudProvider: CloudProviderId | null;
  providerApiKey: string;
  providerValidated: boolean;
  region: string;
  llmProvider: LLMProvider;
  llmApiKey: string;
  llmValidated: boolean;
  channel: Channel;
  channelToken: string;
  channelValidated: boolean;
  personality: string;
  agentName: string;
  agentEmoji: string;
  dmPolicy: "pairing" | "open";
  deploying: boolean;
  serverIp: string | null;
  statusToken: string | null;
  consoleUrl: string | null;
  dashboardUrl: string | null;
  sshPublicKey: string | null;
  deployError: string | null;
  healthReady: boolean;
  pairingApproved: boolean;
}

export type WizardAction =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_DEPLOY_TARGET"; target: DeployTarget }
  | { type: "SET_CLOUD_PROVIDER"; provider: CloudProviderId }
  | { type: "SET_PROVIDER_API_KEY"; key: string }
  | { type: "SET_PROVIDER_VALIDATED"; validated: boolean }
  | { type: "SET_REGION"; region: string }
  | { type: "SET_LLM_PROVIDER"; provider: LLMProvider }
  | { type: "SET_LLM_API_KEY"; key: string }
  | { type: "SET_LLM_VALIDATED"; validated: boolean }
  | { type: "SET_CHANNEL"; channel: Channel }
  | { type: "SET_CHANNEL_TOKEN"; token: string }
  | { type: "SET_CHANNEL_VALIDATED"; validated: boolean }
  | { type: "SET_PERSONALITY"; text: string }
  | { type: "SET_AGENT_NAME"; name: string }
  | { type: "SET_AGENT_EMOJI"; emoji: string }
  | { type: "SET_DM_POLICY"; policy: "pairing" | "open" }
  | { type: "SET_DEPLOYING"; deploying: boolean }
  | { type: "SET_SERVER_IP"; ip: string | null }
  | { type: "SET_STATUS_TOKEN"; token: string | null }
  | { type: "SET_CONSOLE_URL"; url: string | null }
  | { type: "SET_DASHBOARD_URL"; url: string | null }
  | { type: "SET_SSH_PUBLIC_KEY"; key: string | null }
  | { type: "SET_DEPLOY_ERROR"; error: string | null }
  | { type: "SET_HEALTH_READY"; ready: boolean }
  | { type: "SET_PAIRING_APPROVED"; approved: boolean }
  | { type: "RESET" };

const initialState: WizardState = {
  step: 1,
  deployTarget: null,
  cloudProvider: null,
  providerApiKey: "",
  providerValidated: false,
  region: "",
  llmProvider: "anthropic",
  llmApiKey: "",
  llmValidated: false,
  channel: "telegram",
  channelToken: "",
  channelValidated: false,
  personality: "",
  agentName: "",
  agentEmoji: "",
  dmPolicy: "pairing",
  deploying: false,
  serverIp: null,
  statusToken: null,
  consoleUrl: null,
  dashboardUrl: null,
  sshPublicKey: null,
  deployError: null,
  healthReady: false,
  pairingApproved: false,
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_DEPLOY_TARGET":
      return { ...state, deployTarget: action.target };
    case "SET_CLOUD_PROVIDER":
      return { ...state, cloudProvider: action.provider };
    case "SET_PROVIDER_API_KEY":
      return { ...state, providerApiKey: action.key, providerValidated: false };
    case "SET_PROVIDER_VALIDATED":
      return { ...state, providerValidated: action.validated };
    case "SET_REGION":
      return { ...state, region: action.region };
    case "SET_LLM_PROVIDER":
      return { ...state, llmProvider: action.provider, llmValidated: false };
    case "SET_LLM_API_KEY":
      return { ...state, llmApiKey: action.key, llmValidated: false };
    case "SET_LLM_VALIDATED":
      return { ...state, llmValidated: action.validated };
    case "SET_CHANNEL":
      return { ...state, channel: action.channel, channelValidated: false };
    case "SET_CHANNEL_TOKEN":
      return { ...state, channelToken: action.token, channelValidated: false };
    case "SET_CHANNEL_VALIDATED":
      return { ...state, channelValidated: action.validated };
    case "SET_PERSONALITY":
      return { ...state, personality: action.text };
    case "SET_AGENT_NAME":
      return { ...state, agentName: action.name };
    case "SET_AGENT_EMOJI":
      return { ...state, agentEmoji: action.emoji };
    case "SET_DM_POLICY":
      return { ...state, dmPolicy: action.policy };
    case "SET_DEPLOYING":
      return { ...state, deploying: action.deploying };
    case "SET_SERVER_IP":
      return { ...state, serverIp: action.ip };
    case "SET_STATUS_TOKEN":
      return { ...state, statusToken: action.token };
    case "SET_CONSOLE_URL":
      return { ...state, consoleUrl: action.url };
    case "SET_DASHBOARD_URL":
      return { ...state, dashboardUrl: action.url };
    case "SET_SSH_PUBLIC_KEY":
      return { ...state, sshPublicKey: action.key };
    case "SET_DEPLOY_ERROR":
      return { ...state, deployError: action.error };
    case "SET_HEALTH_READY":
      return { ...state, healthReady: action.ready };
    case "SET_PAIRING_APPROVED":
      return { ...state, pairingApproved: action.approved };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export { initialState };
