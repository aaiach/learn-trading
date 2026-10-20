// Game: size a market buy order and watch it walk up the book (§4.3.3, Market Impact Example, p. 72).
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Minus, Plus, Send, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { clamp } from "../../../util.ts";
import { Ladder, type Lvl } from "../illus/kit.tsx";
import "./u43.css";

type Book = { asks: [number, number][]; bids: [number, number][] };
type Round = {
  title: string;
  goal: string;
  book: Book;
  /** Fixed order size; null lets the learner choose it. */
  size: number | null;
  /** Tap the price row of the last fill before sending. */
  pickRow?: number;
  /** Multiple-choice question asked once the order has filled. */
  ask?: { q: string; options: string[]; answer: number };
  /** For learner-sized rounds: is this size the right one? */
  check?: (size: number) => boolean;
  explain: string;
  note?: string;
};

// Martha's books: the fill prices and sizes are the book's (p. 72); untouched levels and bids are ours.
const FIRST: Book = {
  asks: [
    [84.25, 20],
    [84.4, 30],
    [84.7, 150],
    [84.85, 100],
    [85.0, 120],
  ],
  bids: [
    [84.2, 40],
    [84.1, 60],
  ],
};
const SECOND: Book = {
  asks: [
    [84.6, 5],
    [84.8, 75],
    [85.0, 45],
    [85.15, 75],
    [85.3, 60],
  ],
  bids: [
    [84.55, 30],
    [84.45, 50],
  ],
};
const DEEP: Book = {
  asks: [
    [84.25, 500],
    [84.3, 400],
    [84.4, 300],
  ],
  bids: [
    [84.2, 450],
    [84.15, 300],
  ],
};

const ROUNDS: Round[] = [
  {
    title: "Martha's first broker",
    goal: "Send Martha's market order to buy **200** contracts. Then read its average price.",
    book: FIRST,
    size: 200,
    ask: { q: "What average price did the 200 contracts cost?", options: ["84.61¢", "84.25¢", "84.70¢", "84.45¢"], answer: 0 },
    explain: "(20 × 84.25 + 30 × 84.40 + 150 × 84.70) ÷ 200 = 84.61¢, well above the 84.25¢ offer.",
  },
  {
    title: "Predict the last fill",
    goal: "A market buy for **60** contracts. Tap the price where its **last** contract fills, then send it.",
    book: FIRST,
    size: 60,
    pickRow: 84.7,
    explain: "20 at 84.25 and 30 at 84.40 make 50. The last 10 come from 84.70.",
  },
  {
    title: "Keep the average at 84.50¢",
    goal: "Buy as **many** contracts as you can while keeping the **average** price at or below **84.50¢**.",
    book: FIRST,
    size: null,
    check: (s) => s === 90,
    explain: "90 contracts: (20 × 84.25 + 30 × 84.40 + 40 × 84.70) ÷ 90 = 84.50¢. At 100 the average is 84.52¢.",
  },
  {
    title: "Martha's second broker",
    goal: "Later the market is 84.55 bid, 84.60 offered. Buy the remaining **200** contracts at market.",
    book: SECOND,
    size: 200,
    ask: { q: "How far above the 84.60¢ offer was the last fill?", options: ["0.55¢", "0.20¢", "0.90¢", "0.40¢"], answer: 0 },
    explain: "Last fill 85.15¢, 0.55¢ above the offer. Over both orders the price rose 0.90¢, from 84.25¢ to 85.15¢.",
  },
  {
    title: "A deep market",
    goal: "Same **200** contracts, but this market is large and liquid. Send it.",
    book: DEEP,
    size: 200,
    ask: { q: "How much did this order move the price?", options: ["Not at all: all 200 at 84.25¢", "0.45¢", "0.90¢", "0.05¢"], answer: 0 },
    explain: "With plenty of size at the best offer, the same order has no market impact.",
    note: "Our numbers",
  },
];

type Fill = { p: number; q: number };

function walk(book: Book, size: number): Fill[] {
  const out: Fill[] = [];
  let left = size;
  for (const [p, q] of book.asks) {
    if (left <= 0) break;
    const t = Math.min(q, left);
    out.push({ p, q: t });
    left -= t;
  }
  return out;
}

const avgOf = (fills: Fill[]) => {
  const q = fills.reduce((s, f) => s + f.q, 0);
  return q ? fills.reduce((s, f) => s + f.p * f.q, 0) / q : 0;
};
const c2 = (v: number) => `${v.toFixed(2)}¢`;

// ladder geometry (kept in step with the Ladder props below)
const LX = 214;
const LY = 44;
const ROW = 25;
const PW = 60;
const BAR = 92;

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((t, i) => (i % 2 ? <strong key={i}>{t}</strong> : <span key={i}>{t}</span>))}
    </>
  );
}

export function WalkTheBook({ onDone }: GameProps) {
  const reduce = useReducedMotion();
  const [r, setR] = useState(0);
  const round = ROUNDS[r];
  const [size, setSize] = useState(round.size ?? 0);
  const [phase, setPhase] = useState<"set" | "fill" | "ask" | "fb">("set");
  const [shown, setShown] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const timers = useRef<number[]>([]);

  const fills = useMemo(() => walk(round.book, size), [round, size]);
  const done = fills.slice(0, shown);
  const startOffer = round.book.asks[0][0];
  const max = Math.max(...round.book.asks.map((a) => a[1]), ...round.book.bids.map((b) => b[1]));
  const scale = max / 0.55;
  const total = round.book.asks.reduce((s, a) => s + a[1], 0);

  // the book as the Ladder sees it, with the fills shown so far taken out
  const levels: Lvl[] = useMemo(() => {
    const taken = new Map(done.map((f) => [f.p, f.q]));
    const asks = [...round.book.asks].reverse().map(([p, q]) => ({ p, ask: q - (taken.get(p) ?? 0) }));
    const bids = round.book.bids.map(([p, q]) => ({ p, bid: q }));
    return [...asks, ...bids];
  }, [round, done]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = () => {
    if (phase !== "set" || size <= 0) return;
    if (round.pickRow !== undefined && picked === null) return;
    setPhase("fill");
    const step = reduce ? 0 : 620;
    fills.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setShown(i + 1), step * (i + 1) - (reduce ? 0 : 300)));
    });
    timers.current.push(
      window.setTimeout(() => {
        if (round.ask) setPhase("ask");
        else {
          const good = round.pickRow !== undefined ? picked === round.pickRow : !!round.check?.(size);
          setOk(good);
          if (good) setScore((s) => s + 1);
          setPhase("fb");
        }
      }, step * fills.length + (reduce ? 0 : 250)),
    );
  };

  const answer = (i: number) => {
    if (phase !== "ask" || !round.ask) return;
    setPicked(i);
    const good = i === round.ask.answer;
    setOk(good);
    if (good) setScore((s) => s + 1);
    setPhase("fb");
  };

  const next = () => {
    if (phase !== "fb") return;
    if (r + 1 >= ROUNDS.length) {
      onDone({ score, max: ROUNDS.length });
      return;
    }
    const nr = ROUNDS[r + 1];
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setR(r + 1);
    setSize(nr.size ?? 0);
    setShown(0);
    setPicked(null);
    setOk(null);
    setPhase("set");
  };

  const free = round.size === null;
  const bump = (d: number) => free && phase === "set" && setSize((s) => clamp(s + d, 0, 300));

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      let used = true;
      if ((e.key === "ArrowUp" || e.key === "ArrowRight") && free) bump(10);
      else if ((e.key === "ArrowDown" || e.key === "ArrowLeft") && free) bump(-10);
      else if (e.key === "Enter") {
        if (phase === "set") send();
        else if (phase === "fb") next();
      } else if (phase === "ask" && ["1", "2", "3", "4"].includes(e.key)) answer(Number(e.key) - 1);
      else used = false;
      if (used) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    // capture phase, so the lesson player's arrow and Enter keys don't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  // planned consumption per ask level, drawn as a dashed ghost over the bar's far end
  const plan = phase === "set" ? walk(round.book, size) : [];
  const right = LX + PW / 2;
  const rowY = (p: number) => LY + levels.findIndex((l) => l.p === p) * ROW;
  const h = LY + levels.length * ROW + 4;
  const avg = avgOf(done);
  const last = done.length ? done[done.length - 1].p : 0;
  const filledQty = done.reduce((s, f) => s + f.q, 0);
  const canSend = phase === "set" && size > 0 && (round.pickRow === undefined || picked !== null);

  return (
    <div className="wtb">
      <div className="wtb-goal">
        <span className="wtb-round">
          Round {r + 1}/{ROUNDS.length} · {round.title}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={r} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
            <Rich text={round.goal} />
          </motion.p>
        </AnimatePresence>
      </div>

      <svg viewBox={`0 0 400 ${h}`} className="stage wtb-book" role="img" aria-label="Order book: offers above, bids below">
        <rect width={400} height={h} rx={16} fill="var(--scene-bg)" />
        <Ladder levels={levels} x={LX} y={LY} rowH={ROW} priceW={PW} barMax={BAR} maxSize={scale} hl={picked !== null && round.pickRow !== undefined ? [picked] : []} hlTone="prac" />
        {plan.map((f) => {
          const level = round.book.asks.find((a) => a[0] === f.p)!;
          const full = (level[1] / scale) * BAR;
          const part = (f.q / scale) * BAR;
          return (
            <motion.rect
              key={`g${f.p}`}
              y={rowY(f.p) - ROW / 2 + 2}
              width={Math.max(3, part)}
              height={ROW - 4}
              rx={5}
              fill="var(--scene-bg)"
              fillOpacity={0.45}
              stroke="var(--ink)"
              strokeWidth={1.75}
              strokeDasharray="4 3"
              initial={false}
              animate={{ x: right + 4 + full - part, width: Math.max(3, part) }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              style={{ pointerEvents: "none" }}
            />
          );
        })}
        {round.pickRow !== undefined &&
          phase === "set" &&
          round.book.asks.map(([p]) => (
            <rect
              key={`t${p}`}
              x={LX - PW / 2 - BAR - 8}
              y={rowY(p) - ROW / 2 + 1}
              width={PW + 2 * BAR + 16}
              rx={6}
              height={ROW}
              fill="transparent"
              className="wtb-row"
              onClick={() => setPicked(p)}
              role="button"
              aria-label={`Last fill at ${p.toFixed(2)}`}
            />
          ))}
        {done.length > 0 && (
          <motion.text
            key={`last${shown}`}
            x={LX - PW / 2 - 12}
            y={rowY(last) + 4.5}
            textAnchor="end"
            className="sc-txt"
            style={{ fontSize: 12, fontWeight: 800 }}
            fill="var(--bid)"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
          >
            bought {done[done.length - 1].q} →
          </motion.text>
        )}
        {round.note && (
          <text x={14} y={22} className="sc-txt" style={{ fontSize: 11, fontWeight: 650 }} fill="var(--ink-3)">
            {round.note}
          </text>
        )}
      </svg>

      <div className="wtb-read" aria-live="polite">
        <span>
          Filled <strong>{filledQty}</strong>/{size}
        </span>
        <span>
          Avg <strong>{avg ? c2(avg) : "–"}</strong>
        </span>
        <span>
          Impact <strong>{last ? `+${(last - startOffer).toFixed(2)}¢` : "–"}</strong>
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {phase === "set" && (
          <motion.div key="set" className="wtb-ctl" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {free ? (
              <div className="wtb-size">
                <button type="button" onClick={() => bump(-10)} aria-label="Minus 10 contracts">
                  <Minus size={16} /> 10
                </button>
                <input
                  type="range"
                  min={0}
                  max={300}
                  step={10}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  aria-label="Order size in contracts"
                />
                <button type="button" onClick={() => bump(10)} aria-label="Plus 10 contracts">
                  <Plus size={16} /> 10
                </button>
              </div>
            ) : (
              <p className="wtb-fixed">
                Market buy · <strong>{size}</strong> contracts{round.pickRow !== undefined && (picked === null ? " · tap a price first" : ` · last fill at ${picked.toFixed(2)}?`)}
              </p>
            )}
            <button type="button" className="wtb-go" onClick={send} disabled={!canSend}>
              <Send size={16} /> Buy {size} at market <Kbd>Enter</Kbd>
            </button>
            {free && <p className="wtb-hint">The dashed part shows what the order will take ({total} offered in all).</p>}
          </motion.div>
        )}
        {phase === "ask" && round.ask && (
          <motion.div key="ask" className="wtb-ask" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p>{round.ask.q}</p>
            <div className={`wtb-opts${round.ask.options.some((o) => o.length > 14) ? " wtb-opts-long" : ""}`}>
              {round.ask.options.map((o, i) => (
                <button key={o} type="button" onClick={() => answer(i)}>
                  <Kbd>{i + 1}</Kbd> {o}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {phase === "fb" && (
          <motion.div key="fb" className={`wtb-fb ${ok ? "ok" : "ko"}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span>
              {ok ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />} <strong>{ok ? "Right." : "Not quite."}</strong> {round.explain}
            </span>
            <button type="button" onClick={next} autoFocus>
              {r + 1 >= ROUNDS.length ? "Finish" : "Next round"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
