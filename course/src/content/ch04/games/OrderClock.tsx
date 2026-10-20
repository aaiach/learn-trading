// Game: pick the validity instruction each trader needs, then watch its life on the week (Table 4-3, §4.9).
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd, Rich } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u49.css";

type Id = "ioc" | "day" | "gtw" | "gtm" | "until" | "gtc" | "after" | "moo" | "moc";

// Labels, usage and the Good / Expires columns come from Table 4-3 (p. 84).
const INS: { id: Id; label: string; full: string; usage: string; good: string; expires: string }[] = [
  { id: "ioc", label: "IOC", full: "Immediate-or-cancel", usage: "Occasional", good: "When submitted", expires: "Immediately following submission" },
  { id: "day", label: "Day", full: "Day order", usage: "Common", good: "When submitted", expires: "End of day" },
  { id: "gtw", label: "GTW", full: "Good-this-week", usage: "Rare", good: "When submitted", expires: "End of week" },
  { id: "gtm", label: "GTM", full: "Good-this-month", usage: "Rare", good: "When submitted", expires: "End of month" },
  { id: "until", label: "Good-until", full: "Good-until", usage: "Rare", good: "When submitted", expires: "On specified date" },
  { id: "gtc", label: "GTC", full: "Good-till-cancel", usage: "Common", good: "When submitted", expires: "Never" },
  { id: "after", label: "Good-after", full: "Good-after", usage: "Rare", good: "After specified date", expires: "Not specified" },
  { id: "moo", label: "On open", full: "Market-on-open", usage: "Occasional", good: "At open", expires: "After open" },
  { id: "moc", label: "On close", full: "Market-on-close", usage: "Occasional", good: "At close", expires: "After close" },
];
const byId = (id: Id) => INS.find((x) => x.id === id)!;

type Scenario = { ask: string; ans: Id[]; date?: number; note?: string };

// Every order is sent on Tuesday at 11:00. Our scenarios; the rules are the book's.
const SCENARIOS: Scenario[] = [
  { ask: "Fill what you can **right now** and cancel the rest. I don't want to leave a free trading option in the book.", ans: ["ioc"] },
  { ask: "Buy 300 at $40 if it dips **today**. If it doesn't, forget it.", ans: ["day"] },
  { ask: "“Sell 500 at $52.” The client said **nothing** about how long the order is valid.", ans: ["day"], note: "Most brokers assume a day order." },
  { ask: "Keep my bid at $30 working **until I cancel it**, however long that takes.", ans: ["gtc"] },
  { ask: "Keep it working through **this Friday's close**, then drop it.", ans: ["gtw", "until"], note: "GTW is a special case of good-until." },
  { ask: "Keep it working until the **end of the month**, then drop it.", ans: ["gtm", "until"], note: "GTM is a special case of good-until." },
  { ask: "Keep it working until **Thursday's close**, then drop it.", ans: ["until"], date: 3 },
  { ask: "It must not trade before **Thursday**. From then on, keep it working.", ans: ["after"], date: 3 },
  { ask: "Buy 1,000 at **tomorrow's opening auction**, at whatever the opening price is.", ans: ["moo"] },
  { ask: "Our mutual fund values its shares with **closing prices**. Buy at today's close.", ans: ["moc"] },
];
const ROUNDS = 8;

// ── The week strip ──────────────────────────────────────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const X0 = 26;
const DW = 62;
const LATER = X0 + 5 * DW; // 336
const END = 392;
const MONTH_END = 366;
const openX = (d: number) => X0 + d * DW + 5;
const closeX = (d: number) => X0 + d * DW + DW - 5;
const NOW = openX(1) + 0.23 * (DW - 10); // Tuesday 11:00

type Shape = { bar?: [number, number]; pre?: [number, number]; arrow?: boolean; dot?: number; flash?: number; end?: string };

function shapeOf(id: Id, date = 3): Shape {
  switch (id) {
    case "ioc":
      return { flash: NOW, end: "now only" };
    case "day":
      return { bar: [NOW, closeX(1)], end: "Tue close" };
    case "gtw":
      return { bar: [NOW, closeX(4)], end: "Fri close" };
    case "gtm":
      return { bar: [NOW, MONTH_END], end: "month end" };
    case "until":
      return { bar: [NOW, closeX(date)], end: `${DAYS[date]} close` };
    case "gtc":
      return { bar: [NOW, END], arrow: true, end: "never" };
    case "after":
      return { pre: [NOW, openX(date)], bar: [openX(date), END], arrow: true, end: `from ${DAYS[date]}` };
    case "moo":
      return { dot: openX(2), end: "Wed open" };
    case "moc":
      return { dot: closeX(1), end: "Tue close" };
  }
}

function Window({ s, y, tone, label }: { s: Shape; y: number; tone: "good" | "bad"; label: string }) {
  const c = `var(--${tone})`;
  return (
    <g>
      <text x={4} y={y + 4} className="oc-row-label" fill={c}>
        {label}
      </text>
      {s.pre && <line x1={s.pre[0]} x2={s.pre[1]} y1={y} y2={y} stroke="var(--ink-3)" strokeWidth={2} strokeDasharray="4 4" />}
      {s.bar && (
        <motion.rect
          x={s.bar[0]}
          y={y - 6}
          height={12}
          rx={6}
          fill={c}
          initial={{ width: 0 }}
          animate={{ width: s.bar[1] - s.bar[0] }}
          transition={{ ...spring.fill, delay: 0.1 }}
        />
      )}
      {s.arrow && s.bar && (
        <motion.path
          d={`M${END - 2},${y - 9} L${END + 6},${y} L${END - 2},${y + 9}`}
          fill={c}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        />
      )}
      {s.dot !== undefined && (
        <motion.circle cx={s.dot} cy={y} fill={c} initial={{ r: 0 }} animate={{ r: 7 }} transition={{ ...spring.ui, delay: 0.15 }} />
      )}
      {s.flash !== undefined && (
        <>
          <motion.circle cx={s.flash} cy={y} fill={c} initial={{ r: 0 }} animate={{ r: 6 }} transition={{ ...spring.ui, delay: 0.1 }} />
          <motion.circle
            cx={s.flash}
            cy={y}
            fill="none"
            stroke={c}
            strokeWidth={2}
            initial={{ r: 6, opacity: 0.9 }}
            animate={{ r: 18, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          />
        </>
      )}
    </g>
  );
}

function Strip({ right, pick }: { right?: Shape; pick?: Shape }) {
  return (
    <svg className="oc-strip" viewBox="0 0 400 112" role="img" aria-label="The trading week, with the order's life drawn on it">
      {DAYS.map((d, i) => (
        <g key={d}>
          <rect x={X0 + i * DW + 1} y={22} width={DW - 2} height={78} rx={8} className="oc-day" />
          <text x={X0 + i * DW + DW / 2} y={15} textAnchor="middle" className="oc-day-label">
            {d}
          </text>
        </g>
      ))}
      <text x={(LATER + END) / 2} y={15} textAnchor="middle" className="oc-day-label">
        later
      </text>
      <line x1={MONTH_END} x2={MONTH_END} y1={24} y2={98} className="oc-month" />
      <text x={MONTH_END} y={108} textAnchor="middle" className="oc-tiny">
        month end
      </text>
      <line x1={NOW} x2={NOW} y1={20} y2={100} className="oc-now" />
      <text x={NOW} y={108} textAnchor="middle" className="oc-tiny oc-now-label">
        sent Tue 11:00
      </text>
      {right && <Window s={right} y={pick ? 46 : 60} tone="good" label="✓" />}
      {pick && <Window s={pick} y={78} tone="bad" label="✗" />}
    </svg>
  );
}

export function OrderClock({ onDone }: GameProps) {
  const deck = useMemo(() => shuffle(SCENARIOS).slice(0, ROUNDS), []);
  const [r, setR] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState<Id | null>(null);
  const sc = deck[r];
  const ok = pick !== null && sc.ans.includes(pick);

  const next = () => {
    if (r + 1 >= deck.length) {
      onDone({ score, max: deck.length });
      return;
    }
    setR((x) => x + 1);
    setPick(null);
  };

  const choose = (id: Id) => {
    if (pick !== null) return;
    setPick(id);
    if (sc.ans.includes(id)) setScore((s) => s + 1);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-9]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        choose(INS[Number(e.key) - 1].id);
      } else if (e.key === "Enter" && pick !== null) {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    // capture phase, so the lesson player's Enter doesn't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const want = byId(sc.ans[0]);
  const got = pick ? byId(pick) : null;
  const rightShape = pick !== null ? shapeOf(sc.ans[0], sc.date) : undefined;
  const pickShape = pick !== null && !ok ? shapeOf(pick, sc.date) : undefined;
  const shown = ok && got ? got : want;

  return (
    <div className="oc">
      <div className="oc-top">
        <span className="oc-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <span className="oc-round">
          Order {r + 1}/{deck.length}
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={r}
          className="oc-ask"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <Rich text={sc.ask} />
        </motion.p>
      </AnimatePresence>
      <Strip key={`${r}-${pick ?? ""}`} right={rightShape} pick={pickShape} />
      <div className="oc-btns">
        {INS.map((x, k) => {
          const st = pick === null ? "" : sc.ans.includes(x.id) ? "right" : x.id === pick ? "wrong" : "off";
          return (
            <button key={x.id} type="button" className={`oc-btn ${st}`} onClick={() => choose(x.id)} disabled={pick !== null}>
              <Kbd>{k + 1}</Kbd>
              {x.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {pick !== null && (
          <motion.div
            key={`fb${r}`}
            className={`oc-fb ${ok ? "ok" : "ko"}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring.soft}
          >
            <p className="oc-fb-head">
              {ok ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
              {ok ? "Right: " : `Not ${got?.label}. They need: `}
              <strong>{shown.full}</strong>
            </p>
            <p className="oc-fb-row">
              Good: <strong>{shown.good}</strong> · Expires: <strong>{shown.expires}</strong>
            </p>
            <p className="oc-fb-row">
              Usage (Table 4-3): {shown.usage.toLowerCase()}.{sc.note ? ` ${sc.note}` : ""}
            </p>
            <button type="button" className="oc-next" onClick={next} autoFocus>
              {r + 1 >= deck.length ? "Finish" : "Next order"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
