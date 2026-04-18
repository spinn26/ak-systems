import { ImageResponse } from "next/og";

export const runtime = "nodejs";

/**
 * Логотип для каталога партнёров Битрикс24.
 * Жёсткий размер 175×135 — лимит партнёрки.
 * URL: https://aksystems.pro/partner-logo
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "0 12px",
        }}
      >
        {/* Монограмма AK в скруглённом квадрате */}
        <div
          style={{
            width: 60,
            height: 60,
            background: "#0A0A0B",
            borderRadius: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#E8E8EC",
              letterSpacing: -1.5,
              lineHeight: 1,
              display: "flex",
            }}
          >
            AK
          </div>
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 10,
              width: 6,
              height: 6,
              background: "#4F46E5",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            lineHeight: 1.05,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0A0A0B",
              letterSpacing: -0.8,
              display: "flex",
            }}
          >
            AK Systems
          </div>
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: "#8B8B93",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginTop: 3,
              display: "flex",
            }}
          >
            engineering
          </div>
        </div>
      </div>
    ),
    {
      width: 175,
      height: 135,
    },
  );
}
