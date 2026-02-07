/**
 * Cloud-init script generation for cloud providers.
 * See ProductPlan.md — Cloud-Init Script Template.
 * Caller provides template content (e.g. from templates/cloud-init.sh).
 */

import { substituteVars } from "./openclaw-config.js";

export interface CloudInitVars {
  SSH_PUBLIC_KEY: string;
  OPENCLAW_GATEWAY_TOKEN: string;
  OPENCLAW_CONFIG_JSON: string;
  OPENCLAW_VERSION: string;
  /** Heredoc block writing SOUL.md to workspace, or empty string. */
  SOUL_MD_BLOCK: string;
  /** Heredoc block writing IDENTITY.md to workspace, or empty string. */
  IDENTITY_MD_BLOCK: string;
}

/**
 * Generate cloud-init script from template content and variables.
 * Replaces ${VAR} placeholders. SOUL_MD_BLOCK and IDENTITY_MD_BLOCK
 * are inserted as-is (heredoc blocks or empty).
 */
export function generateCloudInitScript(
  templateContent: string,
  vars: CloudInitVars
): string {
  return substituteVars(templateContent, vars as unknown as Record<string, string>);
}

/**
 * Build SOUL.md heredoc block for cloud-init.
 * If content is empty, returns empty string (no SOUL.md written).
 */
export function buildSoulMdBlock(content: string | undefined): string {
  if (!content?.trim()) return "";
  const escaped = content.replace(/'/g, "'\\''");
  return `# --- 8. Write SOUL.md ---
echo "[8/8] Writing SOUL.md..."
cat > /opt/openclaw/workspace/SOUL.md << 'SOULEOF'
${escaped}
SOULEOF
`;
}

/**
 * Build IDENTITY.md heredoc block for cloud-init.
 * If name/emoji are empty, returns empty string.
 */
export function buildIdentityMdBlock(
  name: string | undefined,
  emoji: string | undefined
): string {
  if (!name?.trim() && !emoji?.trim()) return "";
  const lines: string[] = [];
  if (name?.trim()) lines.push(`name: ${name.trim()}`);
  if (emoji?.trim()) lines.push(`emoji: ${emoji.trim()}`);
  const content = lines.join("\n");
  const escaped = content.replace(/'/g, "'\\''");
  return `# --- 9. Write IDENTITY.md ---
cat > /opt/openclaw/workspace/IDENTITY.md << 'IDENTITYEOF'
${escaped}
IDENTITYEOF
`;
}
