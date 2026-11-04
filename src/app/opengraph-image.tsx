import { ImageResponse } from "next/og";
export const alt =
  "Jai Dilbaghi. Electrical and computer engineering at UT Austin. Schematic sheet with a yellow symbol and green wires.";
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
          justifyContent: "center",
          padding: "70px 100px",
          background: "#fff",
          color: "#14161a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 70, height: 3, background: "#009600" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "35px 45px",
              border: "3px solid #840000",
              background: "#ffffc2",
            }}
          >
            <div style={{ color: "#840000", fontSize: 20 }}>J1</div>
            <div style={{ fontSize: 76, fontWeight: 800 }}>Jai Dilbaghi</div>
          </div>
          <div style={{ width: 100, height: 3, background: "#009600" }} />
        </div>
        <div style={{ fontSize: 30, marginTop: 35 }}>
          Electrical and computer engineering at UT Austin.
        </div>
        <div style={{ fontSize: 24, marginTop: 15, color: "#41464f" }}>
          Circuits. Hardware. Race-day debugging.
        </div>
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 30,
            padding: 15,
            border: "2px solid #840000",
            fontSize: 18,
            color: "#840000",
          }}
        >
          Austin, TX · Rev 2026-11 · Sheet 1 of 4
        </div>
      </div>
    ),
    size,
  );
}
