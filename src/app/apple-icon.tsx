import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0B",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            color: "#E8E8EC",
            letterSpacing: -4,
            display: "flex",
          }}
        >
          AK
        </div>
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 34,
            width: 14,
            height: 14,
            background: "#4F46E5",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    size,
  );
}
