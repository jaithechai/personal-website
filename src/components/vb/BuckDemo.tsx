"use client";

import { useId, useState } from "react";
import BoardHot from "./BoardHot";

const VMAX = 12;
const vin = 12;
const X0 = 40;
const PER = 180;
const CYCLES = 3;

// Board hotspots. x,y in board mm (SVG viewBox "99 59 102 78"), from the Lab 7 KiCad board.
const PARTS = [
  { ref: "Vin1", x: 110.5, y: 77.5, value: "Screw terminal", text: "Input supply. Brings Vin+ and GND onto the board." },
  { ref: "PWM1", x: 110.5, y: 96.6, value: "BNC connector", text: "PWM input from the signal generator. Its duty cycle sets the output voltage." },
  { ref: "10V0", x: 110.5, y: 114.5, value: "Screw terminal", text: "10 V supply for the gate driver and the op-amp." },
  { ref: "IC1", x: 127, y: 106, value: "TPS2832D", text: "Gate driver. Takes the PWM signal and drives the high-side and low-side MOSFET gates." },
  { ref: "C6", x: 133, y: 105.3, value: "1u", text: "Bootstrap capacitor between BOOT and the switch node. Lets the driver turn the high-side MOSFET on." },
  { ref: "Q1", x: 142.5, y: 84, value: "CSD18534KCS", text: "High-side MOSFET. Connects Vin+ to the switch node while the PWM is high." },
  { ref: "Q2", x: 155.5, y: 84, value: "CSD18534KCS", text: "Low-side MOSFET. Connects the switch node to GND for the rest of the cycle." },
  { ref: "C1-C3", x: 143.8, y: 91.7, value: "3 x 10u", text: "Input capacitors from Vin+ to GND, next to the MOSFETs." },
  { ref: "R2", x: 153, y: 94.9, value: "100 ohm", text: "Gate resistor for Q2. R1 beside it does the same for Q1." },
  { ref: "L1", x: 171.5, y: 86, value: "7447231101", text: "The inductor, from the switch node to Vout+. It smooths the switched voltage into a steady output." },
  { ref: "C4", x: 182, y: 89.8, value: "1u", text: "Output capacitor across Vout+ and Vout-." },
  { ref: "Vout1", x: 189.5, y: 88.5, value: "Screw terminal", text: "Output to the load." },
  { ref: "R3", x: 171.2, y: 74, value: "0.5 ohm", text: "Current-sense resistor in the return path, between Vout- and GND." },
  { ref: "U1", x: 180, y: 110, value: "TLV2372", text: "Op-amp that amplifies the voltage across the sense resistor so the current can be read on a scope." },
  { ref: "R4, R5", x: 188.3, y: 118.1, value: "5k and 20k", text: "Set the sense amplifier gain: 1 + 20k / 5k = 5." },
];

export default function BuckDemo() {
  const id = useId();
  const [pct, setPct] = useState(50);
  const D = pct / 100;
  const vout = D * vin;

  const yv = (v: number) => 130 - (v / VMAX) * 105;
  let sw = "";
  for (let c = 0; c < CYCLES; c++) {
    const a = X0 + c * PER;
    sw += `${c ? "L" : "M"}${a} ${yv(0)} L${a} ${yv(vin)} L${a + D * PER} ${yv(vin)} L${a + D * PER} ${yv(0)} L${a + PER} ${yv(0)} `;
  }
  const mean = 232;
  const amp = 4 + 28 * 4 * D * (1 - D) * (vin / VMAX);
  let il = "";
  for (let c = 0; c < CYCLES; c++) {
    const a = X0 + c * PER;
    il += `${c ? "L" : "M"}${a} ${mean + amp} L${a + D * PER} ${mean - amp} L${a + PER} ${mean + amp} `;
  }
  const W = X0 + CYCLES * PER + 110;

  return (
    <div className="pb-demo pb-dark">
      <div className="pb-demo-head">
        <h4 className="pb-demo-title">IDEAL BUCK CONVERTER</h4>
        <output htmlFor={`${id}-d`} className="pb-demo-out">
          Vout = D x Vin = {D.toFixed(2)} x {vin} V = <b>{vout.toFixed(2)} V</b>
        </output>
      </div>
      <div className="pb-demo-ctl">
        <label htmlFor={`${id}-d`} className="pb-label">
          DUTY CYCLE D
        </label>
        <input
          id={`${id}-d`}
          type="range"
          min={10}
          max={90}
          step={1}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-valuetext={`${pct} percent, Vout ${vout.toFixed(2)} volts`}
          className="pb-range"
        />
        <span className="pb-label pb-gold">{pct}%</span>
      </div>
      <svg
        viewBox={`0 0 ${W} 290`}
        className="pb-scope"
        role="img"
        aria-label={`Vin steady at ${vin} volts. Switch node square wave from 0 to ${vin} volts at ${pct} percent duty, inductor current ripple below, dashed line at Vout ${vout.toFixed(1)} volts`}
      >
        <g className="pb-scope-grid">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={"v" + i} x1={X0 + (i * (CYCLES * PER)) / 10} y1="10" x2={X0 + (i * (CYCLES * PER)) / 10} y2="280" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={"h" + i} x1={X0} y1={10 + i * 45} x2={X0 + CYCLES * PER} y2={10 + i * 45} />
          ))}
        </g>
        <text x="4" y={yv(vin) + 4} className="pb-svg-label">{vin} V</text>
        <text x="4" y={yv(0) + 4} className="pb-svg-label">0 V</text>
        <text x={X0} y="150" className="pb-svg-label">SWITCH NODE</text>
        <path d={sw} className="pb-wave pb-wave-sw" />
        <line x1={X0} x2={X0 + CYCLES * PER} y1={yv(vin)} y2={yv(vin)} stroke="#f3f1e7" strokeWidth="2" strokeDasharray="2 6" />
        <text x={X0 + CYCLES * PER + 6} y={yv(vin) - 4} className="pb-svg-label">Vin {vin} V</text>
        <line x1={X0} x2={X0 + CYCLES * PER} y1={yv(vout)} y2={yv(vout)} className="pb-wave-vout" />
        <text x={X0 + CYCLES * PER + 6} y={yv(vout) + 14} className="pb-svg-label pb-copper-text">Vout {vout.toFixed(1)} V</text>
        <text x={X0} y="196" className="pb-svg-label">INDUCTOR CURRENT, SHAPE ONLY</text>
        <path d={il} className="pb-wave pb-wave-il" />
      </svg>
      <BoardHot src="/board-buck.svg" alt="Top view of the buck converter PCB layout" vb={[99, 59, 102, 78]} parts={PARTS} initial="L1" layers="buck" />
      <p className="pb-label pb-demo-note">Ideal model: Vout = D x Vin. Losses ignored. Not measured data.</p>
    </div>
  );
}
