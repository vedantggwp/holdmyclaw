/**
 * Client-side SSH key generation (Web Crypto API).
 * See ProductPlan.md — SSH Key Generation: Client-Side.
 * Private key is never sent to server; trigger .pem download immediately.
 */

export interface BrowserKeyPair {
  publicKey: string;
  privateKeyPem: string;
}

/**
 * Encode raw 32-byte Ed25519 public key as OpenSSH "ssh-ed25519 AAAA..." string.
 */
function toOpenSshPublicKey(rawKey: ArrayBuffer): string {
  const keyType = new TextEncoder().encode("ssh-ed25519");
  const raw = new Uint8Array(rawKey);
  const total = 4 + keyType.length + 4 + raw.length;
  const out = new Uint8Array(total);
  const dv = new DataView(out.buffer);
  let off = 0;
  dv.setUint32(off, keyType.length, false);
  off += 4;
  out.set(keyType, off);
  off += keyType.length;
  dv.setUint32(off, 32, false);
  off += 4;
  out.set(raw, off);
  const binary = Array.from(out)
    .map((b) => String.fromCharCode(b))
    .join("");
  return `ssh-ed25519 ${btoa(binary)}`;
}

/**
 * Build PEM PKCS#8 from raw key bytes (binary DER).
 */
function toPemPrivateKey(der: ArrayBuffer, label: string): string {
  const b64 = btoa(String.fromCharCode(...new Uint8Array(der)));
  const lines = b64.match(/.{1,64}/g) ?? [];
  return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----`;
}

/**
 * Generate Ed25519 key pair in browser using Web Crypto API.
 * Returns public key (OpenSSH format) and private key (PEM PKCS#8).
 */
export async function generateKeyPairBrowser(): Promise<BrowserKeyPair> {
  const keyPair = await crypto.subtle.generateKey(
    { name: "Ed25519" },
    true,
    ["sign", "verify"]
  );

  const publicRaw = await crypto.subtle.exportKey("raw", keyPair.publicKey);
  const publicKey = await toOpenSshPublicKey(publicRaw);

  const privatePkcs8 = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  const privateKeyPem = toPemPrivateKey(privatePkcs8, "PRIVATE KEY");

  return { publicKey, privateKeyPem };
}

/**
 * Trigger download of private key as .pem file.
 */
export function downloadPrivateKeyPem(privateKeyPem: string, filename: string): void {
  const blob = new Blob([privateKeyPem], { type: "application/x-pem-file" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".pem") ? filename : `${filename}.pem`;
  a.click();
  URL.revokeObjectURL(url);
}
