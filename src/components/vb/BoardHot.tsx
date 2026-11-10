"use client";

import { useState } from "react";
import BoardLayers from "./BoardLayers";
import "./opamp.css";

export type BoardPart = { ref: string; x: number; y: number; value: string; text: string };

// A board image with clickable part markers. x,y are board mm; vb is the image's SVG viewBox.
export default function BoardHot({
  src,
  alt,
  vb,
  parts,
  initial,
  layers,
}: {
  src: string;
  alt: string;
  vb: [number, number, number, number];
  parts: BoardPart[];
  initial: string;
  layers?: string; // file prefix in /public/boards for the exploded layer view
}) {
  const [sel, setSel] = useState(initial);
  const part = parts.find((p) => p.ref === sel) ?? parts[0];
  return (
    <div className="pbo-board">
      {layers && <BoardLayers name={layers} ratio={vb[2] / vb[3]} />}
      <h5 className="pbo-h">
        THE BOARD <span className="pbo-hint">Click a number</span>
      </h5>
      <div className="pbo-board-row">
        <div className="pbo-img" style={{ aspectRatio: `${vb[2]} / ${vb[3]}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
          {parts.map((p, i) => (
            <button
              key={p.ref}
              type="button"
              className="pbo-hot"
              aria-pressed={p.ref === sel}
              aria-label={`${p.ref}, ${p.value}`}
              style={{ left: `${((p.x - vb[0]) / vb[2]) * 100}%`, top: `${((p.y - vb[1]) / vb[3]) * 100}%` }}
              onClick={() => setSel(p.ref)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="pbo-info" aria-live="polite">
          <span className="pb-label pb-gold">
            {parts.indexOf(part) + 1} · {part.ref}
          </span>
          <b className="pbo-val">{part.value}</b>
          <p>{part.text}</p>
        </div>
      </div>
    </div>
  );
}
