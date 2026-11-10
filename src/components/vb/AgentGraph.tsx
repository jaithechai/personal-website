"use client";

import { useEffect, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import "./agents.css";

type Pt = { x: number; y: number };
const C: Pt = { x: 380, y: 320 };
const R1 = 150; // centre to a main node
const STEP_MS = 1300; // time on each task step
const TRAVEL = 0.5; // seconds the dot takes per step
const BAD_FROM = 5; // first failing step of FAIL_STEPS

const ORCH = {
  title: "Orchestrator",
  text: "The main Claude Code session. It plans the work, writes a brief for each piece, and checks what comes back. It does not redo the work.",
};

const NODES = [
  {
    id: "brain",
    label: "BRAIN",
    angle: -90,
    title: "Brain",
    text: "A plain Markdown wiki in git. Every agent reads it before acting on anything personal, so no session starts from zero.",
    kids: [
      { label: "Core card", text: "A short card loaded into every session." },
      { label: "Hubs and notes", text: "One hub per topic, pointing to small dated notes." },
      { label: "Nightly filing", text: "Agents leave one-line captures. A nightly agent files them into notes." },
    ],
  },
  {
    id: "lanes",
    label: "MODEL LANES",
    angle: -18,
    title: "Model lanes",
    text: "Other coding models, each reached through its own official CLI. Each job goes to the model that fits it.",
    kids: [
      { label: "Codex", text: "Builds features and fixes from a written brief." },
      { label: "Cursor", text: "Code search and second-opinion reviews." },
      { label: "Grok", text: "Docs and web research, read-only." },
    ],
  },
  {
    id: "hub",
    label: "HUB",
    angle: 54,
    title: "Hub",
    text: "A plugin that decides whether a lane may start, and which one.",
    kids: [
      { label: "Quota meters", text: "Reads how much of each plan is left and when it resets." },
      { label: "Gates", text: "Refuses a run on battery, on low memory, or when the stop switch is set." },
      { label: "Scheduler", text: "Ranks what to run next. Advisory: it logs the choice and starts nothing itself." },
    ],
  },
  {
    id: "heal",
    label: "SELF-HEAL",
    angle: 126,
    title: "Self-heal loop",
    text: "Turns failures and my corrections into fixes to the setup itself.",
    kids: [
      { label: "Signal log", text: "Every failure and correction is logged as it happens." },
      { label: "Locked checks", text: "A fix counts only if checks it cannot edit pass." },
      { label: "Judge", text: "A separate agent decides: apply, reject, or ask me." },
    ],
  },
  {
    id: "sched",
    label: "SCHEDULED",
    angle: 198,
    title: "Scheduled agents",
    text: "Agents that run on a timer, mostly overnight while the laptop is plugged in.",
    kids: [
      { label: "Opportunity scout", text: "Finds and tracks internship and research openings." },
      { label: "Brain upkeep", text: "Nightly filing and a weekly tidy of the wiki." },
      { label: "Morning digest", text: "One page each morning on what ran and what needs me." },
    ],
  },
];

const OK_STEPS: [string, string][] = [
  ["orch", "A task arrives."],
  ["brain", "The orchestrator reads the brain for preferences and past decisions."],
  ["orch", "It writes a brief: the goal, the files, the limits, what done means."],
  ["hub", "The hub picks a model with quota left and checks its gates."],
  ["lanes", "That model builds the change in its own lane."],
  ["orch", "The orchestrator reads the diff and runs the checks. They pass. Done."],
];
const FAIL_STEPS: [string, string][] = [
  ...OK_STEPS.slice(0, 5),
  ["orch", "The orchestrator runs the checks. One fails, so the work is not called done."],
  ["heal", "The failure is logged. The nightly loop proposes a fix and must prove it with locked checks."],
];

const rad = (d: number) => (d * Math.PI) / 180;
const polar = (r: number, deg: number): Pt => ({ x: C.x + r * Math.cos(rad(deg)), y: C.y + r * Math.sin(rad(deg)) });
// PCB-style corner: leave a at 45 degrees, then run straight into b.
function elbow(a: Pt, b: Pt): Pt {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.min(Math.abs(dx), Math.abs(dy));
  return { x: a.x + Math.sign(dx) * d, y: a.y + Math.sign(dy) * d };
}
const trace = (a: Pt, b: Pt) => {
  const e = elbow(a, b);
  return `M${a.x} ${a.y} L${e.x} ${e.y} L${b.x} ${b.y}`;
};
const posOf = (id: string): Pt => (id === "orch" ? C : polar(R1, NODES.find((n) => n.id === id)!.angle));
// Points the task dot passes through, always along the drawn traces.
function route(from: string, to: string): Pt[] {
  if (from === to) return [posOf(to), posOf(to)];
  const a = posOf(from);
  const b = posOf(to);
  const out = from === "orch" ? [C] : [a, elbow(C, a), C];
  return to === "orch" ? out : [...out, elbow(C, b), b];
}

function press(fn: () => void) {
  return {
    onClick: fn,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fn();
      }
    },
  };
}

export default function AgentGraph() {
  const reduce = !!useReducedMotion();
  // The map stays closed until the orchestrator (or a task button) is pressed.
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [sel, setSel] = useState("orch");
  const [run, setRun] = useState<{ steps: [string, string][]; i: number } | null>(null);

  // A phone gets a tighter crop so the nodes are big enough to see.
  useEffect(() => {
    const m = window.matchMedia("(max-width: 560px)");
    const set = () => setNarrow(m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!run || run.i >= run.steps.length - 1) return;
    const t = setTimeout(() => setRun({ steps: run.steps, i: run.i + 1 }), STEP_MS);
    return () => clearTimeout(t);
  }, [run]);

  const pick = (id: string) => {
    setRun(null);
    setSel(id);
    setOpen(true);
  };
  const start = (steps: [string, string][]) => {
    setOpen(true);
    setSel("orch");
    setRun({ steps, i: 0 });
  };

  const at = run ? run.steps[run.i][0] : sel;
  const node = NODES.find((n) => n.id === sel);
  const info = node ?? ORCH;
  const from = run && run.i ? run.steps[run.i - 1][0] : "orch";
  const dot = run ? route(from, at) : null;
  const seen = run ? new Set(run.steps.slice(0, run.i + 1).map((s) => s[0])) : null;
  const bad = !!run && run.steps === FAIL_STEPS && run.i >= BAD_FROM;
  const done = !!run && run.steps === OK_STEPS && run.i === run.steps.length - 1;
  const ringR = at === "orch" ? 56 : 26;
  const state = (id: string) => (at === id ? " pbg-on" : seen?.has(id) ? " pbg-seen" : "");

  return (
    <MotionConfig reducedMotion="user">
      <div className={`pb-demo pb-dark pbg${bad ? " pbg-bad" : ""}`}>
        <div className="pb-demo-head">
          <h4 className="pb-demo-title">HOW IT FITS TOGETHER</h4>
          <span className="pb-demo-out">Tap the orchestrator, or send a task through it.</span>
        </div>
        <div className="pbg-btns">
          <button type="button" className="pbg-btn" onClick={() => start(OK_STEPS)}>
            Send a task
          </button>
          <button type="button" className="pbg-btn pbg-btn-alt" onClick={() => start(FAIL_STEPS)}>
            Send one that fails
          </button>
        </div>
        <div className="pbg-row">
          <div className="pbg-stage">
            <svg viewBox={narrow ? "112 56 536 540" : "0 44 760 552"} className="pbg-svg" role="group" aria-label="Map of the system: an orchestrator in the middle, joined to five parts.">
              {NODES.map((n, i) => (
                <motion.path
                  key={n.id}
                  d={trace(C, polar(R1, n.angle))}
                  className={`pbg-trace${at === n.id ? " pbg-on" : ""}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: open ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : i * 0.07 }}
                />
              ))}

              {dot && !reduce && (
                <motion.path
                  key={"f" + run!.i}
                  d={"M" + dot.map((p) => `${p.x} ${p.y}`).join(" L")}
                  className="pbg-flow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: STEP_MS / 1000, times: [0, 0.1, 0.6, 1] }}
                />
              )}

              {NODES.map((n, i) => {
                const p = polar(R1, n.angle);
                return (
                  <motion.g
                    key={n.id}
                    className={`pbg-node${state(n.id)}`}
                    role="button"
                    tabIndex={open ? 0 : -1}
                    aria-pressed={sel === n.id && !run}
                    aria-label={n.title}
                    style={{ pointerEvents: open ? "auto" : "none" }}
                    initial={{ x: C.x, y: C.y, opacity: 0 }}
                    animate={open ? { x: p.x, y: p.y, opacity: 1 } : { x: C.x, y: C.y, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 17, delay: i * 0.07 }}
                    {...press(() => pick(n.id))}
                  >
                    <circle r="34" className="pbg-hit" />
                    <circle r="24" className="pbg-pad" />
                    <circle r="7" className="pbg-hole" />
                    <text y="48" textAnchor="middle" className="pbg-label">
                      {n.label}
                    </text>
                  </motion.g>
                );
              })}

              <g
                className={`pbg-core${at === "orch" ? " pbg-on" : ""}${open ? "" : " pbg-closed"}`}
                role="button"
                tabIndex={0}
                aria-pressed={sel === "orch" && !run}
                aria-label={open ? "Orchestrator" : "Orchestrator. Open the map."}
                transform={`translate(${C.x} ${C.y})`}
                {...press(() => pick("orch"))}
              >
                <circle r="54" className="pbg-ping" />
                <circle r="54" className="pbg-core-pad" />
                <text y="4" textAnchor="middle" className="pbg-core-label">
                  ORCHESTRATOR
                </text>
                {!open && (
                  <text y="84" textAnchor="middle" className="pbg-label">
                    TAP TO OPEN
                  </text>
                )}
              </g>

              {dot &&
                !reduce &&
                Array.from({ length: done ? 3 : 1 }, (_, k) => (
                  <motion.circle
                    key={`r${run!.i}-${k}`}
                    cx={dot[dot.length - 1].x}
                    cy={dot[dot.length - 1].y}
                    className="pbg-ring"
                    initial={{ r: ringR, opacity: 0 }}
                    animate={{ r: [ringR, ringR + 60], opacity: [0.9, 0] }}
                    transition={{ duration: 0.7, delay: (from === at ? 0 : TRAVEL) + k * 0.18, ease: "easeOut" }}
                  />
                ))}

              {/* Two fading copies trail the dot by a few frames. */}
              {dot &&
                (reduce ? [0] : [0.12, 0.06, 0]).map((lag, k, all) => (
                  <motion.circle
                    key={`${run!.i}-${k}`}
                    r={k === all.length - 1 ? 11 : 6 + k * 2}
                    className="pbg-dot"
                    style={{ opacity: k === all.length - 1 ? 1 : 0.3 + k * 0.25 }}
                    initial={{ cx: dot[0].x, cy: dot[0].y }}
                    animate={{ cx: dot.map((p) => p.x), cy: dot.map((p) => p.y) }}
                    transition={{ duration: reduce ? 0 : TRAVEL, delay: lag, ease: "linear" }}
                  />
                ))}
            </svg>
          </div>

          <div className="pbg-info" aria-live="polite">
            {run ? (
              <>
                <p className="pb-label pb-gold">
                  STEP {run.i + 1} / {run.steps.length}
                </p>
                <p className="pbg-step">{run.steps[run.i][1]}</p>
                <div className="pbg-pips" aria-hidden="true">
                  {run.steps.map((_, k) => (
                    <i key={k} className={k <= run.i ? "pbg-pip-on" : ""} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="pb-label pb-gold">{info.title}</p>
                <p className="pbg-step">{info.text}</p>
                {node && (
                  <dl className="pbg-kids">
                    {node.kids.map((k) => (
                      <div key={k.label}>
                        <dt>{k.label}</dt>
                        <dd>{k.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
