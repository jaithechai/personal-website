"use client";

import { useRef, type PointerEvent } from "react";
import { awards } from "@/lib/content";

export default function Awards() {
  const row = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, left: 0 });

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !row.current) return;
    drag.current = { on: true, x: e.clientX, left: row.current.scrollLeft };
    row.current.classList.add("is-drag");
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on || !row.current) return;
    row.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const up = () => {
    drag.current.on = false;
    row.current?.classList.remove("is-drag");
  };

  return (
    <section id="awards" className="pa-awards" aria-labelledby="pa-awards-h">
      <div className="pa-awards-head">
        <h2 id="pa-awards-h" className="pa-mono pa-label">
          Awards
        </h2>
      </div>
      <div
        ref={row}
        className="pa-tickets"
        tabIndex={0}
        role="region"
        aria-label="Awards, scrollable"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
      >
        {awards.map((a, i) => (
          <article key={a.name + i} className="pa-ticket">
            <div className="pa-ticket-top pa-mono">
              <span>[{String(i + 1).padStart(2, "0")}]</span>
              {a.year && <span>{a.year}</span>}
            </div>
            <h3 className="pa-display pa-ticket-name">{a.name}</h3>
            <div className="pa-ticket-perf" aria-hidden="true" />
            <p className="pa-ticket-detail">{a.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
