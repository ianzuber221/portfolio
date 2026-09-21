import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const skills = profile.skillGroups.flatMap((g) => g.items).slice(0, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #0b1020 45%, #040712 100%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #818cf8, #4338ca)",
              color: "#fff",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: "26px", color: "#94a3b8" }}>
            {`${profile.location} · ${profile.availability}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "40px", color: "#cbd5e1" }}>
            {`Hi, I'm ${profile.name}.`}
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: "8px",
              background: "linear-gradient(90deg, #a5b4fc, #6366f1)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              fontSize: "30px",
              color: "#94a3b8",
              marginTop: "20px",
              maxWidth: "900px",
            }}
          >
            Angular web apps · AI agents · skills · workflows · MCP servers
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {skills.map((s) => (
            <div
              key={s}
              style={{
                fontSize: "24px",
                color: "#c7d2fe",
                border: "1px solid rgba(199,210,254,0.3)",
                borderRadius: "999px",
                padding: "6px 18px",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
