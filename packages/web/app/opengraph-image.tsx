import { ImageResponse } from "next/og";

export const alt = "HoldMyClaw — Deploy OpenClaw in 5 Minutes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#F59E0B",
              border: "3px solid #111",
            }}
          />
          <span style={{ fontSize: 48, fontWeight: 800, color: "#111" }}>HoldMyClaw</span>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 800, color: "#111", margin: 0, textAlign: "center" }}>
          Deploy OpenClaw in 5 Minutes
        </h1>
        <p style={{ fontSize: 28, color: "#6B7280", marginTop: 16, textAlign: "center" }}>
          Your server, your data, completely free.
        </p>
        <p style={{ fontSize: 20, color: "#6B7280", marginTop: 8 }}>
          Free setup wizard · Hetzner, DigitalOcean, or local Docker
        </p>
      </div>
    ),
    { ...size }
  );
}
