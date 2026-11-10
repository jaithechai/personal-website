"use client";

import { useId, useState } from "react";
import BoardHot from "./BoardHot";
import "./opamp.css";

// Board hotspots. x,y in board mm (SVG viewBox "99 99 56 52"). Tune positions here.
const PARTS = [
  { ref: "J1", x: 106.7, y: 125, value: "Coaxial connector", text: "Signal input. Carries SIG_IN into the board." },
  { ref: "R1", x: 120, y: 135, value: "1k", text: "1k input resistor from SIG_IN to the inverting input (V-)." },
  { ref: "RV1", x: 120.2, y: 111.5, value: "5k potentiometer", text: "Wired as a variable resistor from SIG_IN to V-, in parallel with R1. Lowering it raises the gain." },
  { ref: "R2", x: 130.2, y: 130.9, value: "5k", text: "5k feedback resistor from the inverting input to the output. Sets the gain together with R1 and RV1." },
  { ref: "U1", x: 137.2, y: 124.7, value: "TLV2372", text: "Dual op-amp, one half used. Inverting amplifier with the non-inverting input tied to the reference (GND net)." },
  { ref: "C1", x: 136.4, y: 118.4, value: "1u", text: "Supply decoupling capacitor across VDD and GND." },
  { ref: "J2", x: 132.7, y: 107.5, value: "Screw terminal", text: "Power input for VDD and GND." },
  { ref: "TP1", x: 114.9, y: 143, value: "Test point", text: "Probe point on SIG_IN, the input signal." },
  { ref: "TP2", x: 125, y: 143, value: "Test point", text: "Probe point on V-, the inverting input node." },
  { ref: "TP3", x: 135.2, y: 143, value: "Test point", text: "Probe point on VOUT, the amplifier output." },
];

const GBW = 3e6;
const R1 = 1000;
const R2 = 5000;
const RAIL = 2;
const VIN = 0.1;

const fmtF = (f: number) => {
  const p = (x: number) => String(Number(x.toPrecision(3)));
  return f < 1e3 ? `${p(f)} Hz` : f < 1e6 ? `${p(f / 1e3)} kHz` : `${p(f / 1e6)} MHz`;
};
const fmtR = (r: number) => (r >= 1000 ? `${Number((r / 1000).toFixed(2))}k` : `${r}`) + " ohm";
const fmtT = (s: number) => {
  const p = (x: number) => String(Number(x.toPrecision(2)));
  return s < 1e-6 ? `${p(s * 1e9)} ns` : s < 1e-3 ? `${p(s * 1e6)} us` : `${p(s * 1e3)} ms`;
};

// scope plot box
const SX0 = 40, SX1 = 580, SY0 = 10, SY1 = 230, SYC = 120, SPV = 50; // px per volt
// bode plot box
const BX0 = 50, BX1 = 580, BY0 = 20, BY1 = 210;
const LOGSPAN = Math.log10(30000);
const bx = (f: number) => BX0 + ((BX1 - BX0) * Math.log10(f / 100)) / LOGSPAN;
const by = (db: number) => BY1 - (Math.min(30, Math.max(0, db)) / 30) * (BY1 - BY0);

export default function OpAmpDemo() {
  const id = useId();
  const [rv, setRv] = useState(5000);
  const [t, setT] = useState(300);

  const rin = (R1 * rv) / (R1 + rv);
  const g0 = R2 / rin;
  const fc = GBW / (1 + g0);
  const f = 100 * Math.pow(30000, t / 1000);
  const gainAt = (x: number) => g0 / Math.sqrt(1 + (x / fc) ** 2);
  const g = gainAt(f);
  const db = 20 * Math.log10(g);
  const lag = Math.atan(f / fc);
  const peakOut = VIN * g;
  const clipping = peakOut > RAIL;

  // scope traces: two cycles across the screen
  const N = 240;
  let vin = "";
  let vout = "";
  for (let i = 0; i <= N; i++) {
    const th = (4 * Math.PI * i) / N;
    const x = SX0 + ((SX1 - SX0) * i) / N;
    const a = VIN * Math.sin(th);
    const o = Math.max(-RAIL, Math.min(RAIL, -peakOut * Math.sin(th - lag)));
    vin += `${i ? "L" : "M"}${x.toFixed(1)} ${(SYC - a * SPV).toFixed(1)} `;
    vout += `${i ? "L" : "M"}${x.toFixed(1)} ${(SYC - o * SPV).toFixed(1)} `;
  }
  const tdiv = 0.2 / f;

  // bode curve
  let curve = "";
  for (let i = 0; i <= 120; i++) {
    const ff = 100 * Math.pow(30000, i / 120);
    curve += `${i ? "L" : "M"}${bx(ff).toFixed(1)} ${by(20 * Math.log10(gainAt(ff))).toFixed(1)} `;
  }
  const fcx = bx(fc);

  const gainTxt = `${g0.toFixed(1)}`;

  return (
    <div className="pb-demo pb-dark pbo">
      <div className="pb-demo-head">
        <h4 className="pb-demo-title">OP-AMP BENCH</h4>
        <output htmlFor={`${id}-rv`} className="pb-demo-out">
          Gain <b>-{gainTxt}</b> V/V
        </output>
      </div>

      <div className="pb-demo-ctl">
        <label htmlFor={`${id}-rv`} className="pb-label">RV1</label>
        <input
          id={`${id}-rv`}
          type="range"
          min={250}
          max={5000}
          step={10}
          value={rv}
          onChange={(e) => setRv(Number(e.target.value))}
          aria-valuetext={`${fmtR(rv)}, gain minus ${gainTxt} volts per volt`}
          className="pb-range"
        />
        <output htmlFor={`${id}-rv`} className="pb-label pb-gold">{fmtR(rv)}</output>
      </div>

      <div className="pb-demo-ctl">
        <label htmlFor={`${id}-f`} className="pb-label">Frequency</label>
        <input
          id={`${id}-f`}
          type="range"
          min={0}
          max={1000}
          step={1}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          aria-valuetext={`${fmtF(f)}, gain ${g.toFixed(2)} volts per volt, ${db.toFixed(1)} decibels`}
          className="pb-range"
        />
        <output htmlFor={`${id}-f`} className="pb-label pb-gold">
          {fmtF(f)} · {g.toFixed(2)} V/V · {db.toFixed(1)} dB
        </output>
      </div>

      <div className="pbo-panels">
        <svg
          viewBox="0 0 600 240"
          className="pb-scope"
          role="img"
          aria-label={`Scope, ${fmtT(tdiv)} per division. Input 100 millivolts peak. Output peak ${peakOut.toFixed(2)} volts unclipped, inverted, lagging ${((lag * 180) / Math.PI).toFixed(0)} degrees.${clipping ? " Output is clipping at the rails." : ""}`}
        >
          <g className="pb-scope-grid">
            {Array.from({ length: 11 }, (_, i) => (
              <line key={"v" + i} x1={SX0 + (i * (SX1 - SX0)) / 10} y1={SY0} x2={SX0 + (i * (SX1 - SX0)) / 10} y2={SY1} />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line key={"h" + i} x1={SX0} y1={SY0 + (i * (SY1 - SY0)) / 8} x2={SX1} y2={SY0 + (i * (SY1 - SY0)) / 8} />
            ))}
          </g>
          <line x1={SX0} x2={SX1} y1={SYC - RAIL * SPV} y2={SYC - RAIL * SPV} className="pb-wave-vout" />
          <line x1={SX0} x2={SX1} y1={SYC + RAIL * SPV} y2={SYC + RAIL * SPV} className="pb-wave-vout" />
          <text x="4" y={SYC - RAIL * SPV + 4} className="pb-svg-label pb-copper-text">+rail</text>
          <text x="4" y={SYC + RAIL * SPV + 4} className="pb-svg-label pb-copper-text">-rail</text>
          <path d={vin} className="pb-wave pb-wave-il" />
          <path d={vout} className="pb-wave pb-wave-sw" />
          <text x={SX1 - 4} y="26" textAnchor="end" className="pb-svg-label">{fmtT(tdiv)}/div</text>
          {clipping && (
            <text x={SX1 - 4} y="44" textAnchor="end" className="pb-svg-label pb-copper-text">CLIPPING</text>
          )}
          <text x={SX0 + 4} y="238" className="pb-svg-label">IN cream, OUT gold</text>
        </svg>

        <svg
          viewBox="0 0 600 240"
          className="pb-scope"
          role="img"
          aria-label={`Closed-loop gain versus frequency. DC gain ${((20 * Math.log10(g0))).toFixed(1)} decibels, cutoff ${fmtF(fc)}. Current point ${fmtF(f)}, ${db.toFixed(1)} decibels.`}
        >
          <g className="pb-scope-grid">
            {[100, 1e3, 1e4, 1e5, 1e6].map((d) => (
              <line key={d} x1={bx(d)} y1={BY0} x2={bx(d)} y2={BY1} />
            ))}
            {[0, 10, 20, 30].map((d) => (
              <line key={d} x1={BX0} y1={by(d)} x2={BX1} y2={by(d)} />
            ))}
          </g>
          {[["100", 100], ["1k", 1e3], ["10k", 1e4], ["100k", 1e5], ["1M", 1e6]].map(([l, d]) => (
            <text key={l} x={bx(d as number)} y="230" textAnchor="middle" className="pb-svg-label">{l}</text>
          ))}
          {[0, 10, 20, 30].map((d) => (
            <text key={d} x="4" y={by(d) + 4} className="pb-svg-label">{d} dB</text>
          ))}
          <path d={curve} className="pb-wave pb-wave-sw" />
          <line x1={fcx} x2={fcx} y1={BY0} y2={BY1} className="pb-wave-vout" />
          <text x={fcx - 5} y={BY0 + 12} textAnchor="end" className="pb-svg-label pb-copper-text">fc {fmtF(fc)}</text>
          <circle cx={bx(f)} cy={by(db)} r="6" fill="#f3f1e7" stroke="#04120d" strokeWidth="2" />
        </svg>
      </div>

      <BoardHot src="/board-opamp.svg" alt="Top view of the op-amp PCB layout" vb={[99, 99, 56, 52]} parts={PARTS} initial="U1" layers="opamp" />

      <p className="pb-label pb-demo-note">Ideal single-pole model: 3 MHz gain-bandwidth, rails assumed at plus and minus 2 V. Not measured data.</p>
    </div>
  );
}
