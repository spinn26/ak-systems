import { ImageResponse } from "next/og";

export const alt =
  "AK Systems — Инженерные системы для бизнеса, который перерос таблицы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0B",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #1e1e24 1px, transparent 1px), linear-gradient(to bottom, #1e1e24 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.4,
            display: "flex",
          }}
        />
        {/* glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 10%, rgba(79,70,229,0.35), transparent 55%)",
            display: "flex",
          }}
        />

        {/* logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              background: "#16161A",
              border: "1px solid #26262C",
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#E8E8EC",
                letterSpacing: -1,
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
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#E8E8EC",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            AK Systems
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            position: "relative",
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#E8E8EC",
              letterSpacing: -2,
              lineHeight: 1.04,
              display: "flex",
            }}
          >
            Инженерные системы
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#8B8B93",
              letterSpacing: -2,
              lineHeight: 1.04,
              display: "flex",
            }}
          >
            для бизнеса, который
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#8B8B93",
              letterSpacing: -2,
              lineHeight: 1.04,
              display: "flex",
            }}
          >
            перерос таблицы
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 18,
              letterSpacing: 4,
              color: "#8B8B93",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            БИТРИКС24 · ПЛАТФОРМЫ · АУДИТЫ · ФИКСИРОВАННАЯ ЦЕНА
          </div>
        </div>
      </div>
    ),
    size,
  );
}
