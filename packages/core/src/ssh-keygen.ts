/**
 * SSH key pair generation (Node.js path).
 * Browser path is in packages/web (Web Crypto API).
 * See ProductPlan.md — SSH Key Generation: Client-Side.
 */

import { createPublicKey, generateKeyPairSync } from "crypto";

/** Ed25519 key pair (raw bytes). */
export interface KeyPair {
  /** OpenSSH format (e.g. "ssh-ed25519 AAAA...") */
  publicKey: string;
  /** PEM PKCS8 private key */
  privateKeyPem: string;
}

/** Encode Ed25519 public key (32 bytes) as OpenSSH "ssh-ed25519 AAAA..." string. */
function toOpenSshPublicKey(publicKeyDer: Buffer): string {
  // Ed25519 SPKI: last 32 bytes are the raw public key
  const rawKey = publicKeyDer.subarray(-32);
  const keyType = Buffer.from("ssh-ed25519", "utf8");
  const blob = Buffer.concat([
    Buffer.from([0, keyType.length]),
    keyType,
    Buffer.from([0, 32]),
    rawKey,
  ]);
  return `ssh-ed25519 ${blob.toString("base64")}`;
}

/**
 * Generate Ed25519 key pair for Node.js (crypto module).
 * For browser, use Web Crypto in packages/web/lib/ssh-keygen-browser.ts
 */
export function generateEd25519KeyPair(): KeyPair {
  const { publicKey: publicPem, privateKey } = generateKeyPairSync("ed25519", {
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const pubObj = createPublicKey(publicPem);
  const der = pubObj.export({ type: "spki", format: "der" }) as Buffer;
  const openSshPublic = toOpenSshPublicKey(Buffer.isBuffer(der) ? der : Buffer.from(der));

  return {
    publicKey: openSshPublic,
    privateKeyPem: privateKey,
  };
}
