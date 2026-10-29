// Game: decode pit talk (§5.4.6.1). Bids are "price for quantity", offers "quantity at price"; only the last
// digit of the price is spoken; sellers push the palm away, buyers pull it in; mismatched reports are out-trades.
// The rules are the book's (p. 108); the prices, sizes and names are ours.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { spring, EASE_OUT } from "../../../motion/tokens.ts";
import "./u54c.css";

type Round =
  | { kind: "shout"; text: string; options: string[]; answer: number; why: string }
  | { kind: "hand"; side: "sell" | "buy"; options: string[]; answer: number; why: string }
  | { kind: "digit"; handle: string; text: string; options: string[]; answer: number; why: string }
  | { kind: "report"; buyer: string; seller: string; options: string[]; answer: number; why: string };

const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)];

function shoutRound(bid: boolean): Round {
  // keep price and size distinct so "buy 30 at 5" and "buy 5 at 30" are different answers
  const price = pick([2, 3, 4, 5, 6, 7, 8, 9]);
  const size = pick([10, 15, 20, 25, 30, 40, 50]);
  const text = bid ? `“${price} for ${size}”` : `“${size} at ${price}”`;
  const opts = [`Buy ${size} at ${price}`, `Sell ${size} at ${price}`, `Buy ${price} at ${size}`, `Sell ${price} at ${size}`];
  const order = shuffle([0, 1, 2, 3]);
  return {
    kind: "shout",
    text,
    options: order.map((i) => opts[i]),
    answer: order.indexOf(bid ? 0 : 1),
    why: bid ? `Price, then “for”, then size: a bid to pay ${price} for ${size}.` : `Size, then “at”, then price: an offer to sell ${size} at ${price}.`,
  };
}

function handRound(side: "sell" | "buy"): Round {
  return {
    kind: "hand",
    side,
    options: ["Seller", "Buyer"],
    answer: side === "sell" ? 0 : 1,
    why: side === "sell" ? "Palm away pushes the item away: a seller." : "Palms inward pull the item in: a buyer.",
  };
}

function digitRound(): Round {
  const base = pick([97.4, 112.3, 54.8, 86.1]);
  const whole = Math.floor(base);
  const tenth = Math.round((base - whole) * 10);
  // the spoken digit differs from the tenths digit, so the four options are all different
  const d = pick([2, 3, 6, 7, 8, 9].filter((x) => x !== tenth));
  const bid = Math.random() < 0.5;
  const size = pick([10, 20, 30]);
  const right = `${whole}.${tenth}${d}`;
  const opts = shuffle([right, `${whole}.${d}${tenth}`, `${whole}.${d}0`, `${whole}.0${d}`]);
  return {
    kind: "digit",
    handle: `${whole}.${tenth}0`,
    text: bid ? `“${d} for ${size}”` : `“${size} at ${d}”`,
    options: opts,
    answer: opts.indexOf(right),
    why: `Only the last digit is spoken; everyone knows the rest. ${d} means ${right}.`,
  };
}

function reportRound(kind: "match" | "price" | "size"): Round {
  const size = pick([10, 20, 25, 40]);
  const p = pick(["97.46", "54.82", "112.37"]);
  const other = (Number(p) + 0.01).toFixed(2);
  const sSize = kind === "size" ? size + 5 : size;
  const sPrice = kind === "price" ? other : p;
  const opts = ["They match", "Out-trade: price", "Out-trade: size"];
  return {
    kind: "report",
    buyer: `Bought ${size} at ${p} from Kay`,
    seller: `Sold ${sSize} at ${sPrice} to Bo`,
    options: opts,
    answer: kind === "match" ? 0 : kind === "price" ? 1 : 2,
    why:
      kind === "match"
        ? "Same size, same price, each names the other: the trade clears."
        : kind === "price"
          ? `One says ${p}, the other ${other}: the reports don't match.`
          : `One says ${size}, the other ${sSize}: the reports don't match.`,
  };
}

function makeRounds(): Round[] {
  const sides = shuffle(["sell", "buy"] as const);
  const reports = shuffle(["match", "price", "size"] as const);
  return [
    shoutRound(true),
    shoutRound(false),
    handRound(sides[0]),
    digitRound(),
    shoutRound(Math.random() < 0.5),
    reportRound(reports[0]),
    handRound(sides[1]),
    shoutRound(Math.random() < 0.5),
    digitRound(),
    reportRound(reports[1]),
  ];
}

const PROMPT: Record<Round["kind"], string> = {
  shout: "What does this trader want?",
  hand: "Is this trader buying or selling?",
  digit: "What price is this trader quoting?",
  report: "Do the two reports match?",
};

export function PitTalk({ onDone }: GameProps) {
  const rounds = useMemo(makeRounds, []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; pick: number } | null>(null);
  const finished = useRef(false);
  const done = i >= rounds.length;
  const r = rounds[Math.min(i, rounds.length - 1)];

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: rounds.length }), 500);
    return () => clearTimeout(id);
  }, [done, score, rounds.length, onDone]);

  const next = () => {
    setFb(null);
    setI((x) => x + 1);
  };

  const choose = (k: number) => {
    if (fb || done || k >= r.options.length) return;
    const ok = k === r.answer;
    if (ok) setScore((s) => s + 1);
    setFb({ ok, pick: k });
    if (ok) setTimeout(next, 750);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        choose(Number(e.key) - 1);
      } else if (e.key === "Enter" && fb && !fb.ok) {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  return (
    <div className="ptk">
      <div className="ptk-top">
        <span className="ptk-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="ptk-dots" aria-hidden>
          {rounds.map((_, k) => (
            <span key={k} className={`ptk-dot ${k < i ? "past" : k === i ? "now" : ""}`} />
          ))}
        </div>
        <span className="ptk-count">
          {Math.min(i + 1, rounds.length)}/{rounds.length}
        </span>
      </div>

      <div className="ptk-stage">
        <AnimatePresence mode="popLayout" initial={false}>
          {!done ? (
            <motion.div
              key={i}
              className={`ptk-card ${fb ? (fb.ok ? "ok" : "ko") : ""}`}
              initial={{ opacity: 0, y: 14 }}
              animate={fb && !fb.ok ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.16, ease: EASE_OUT } }}
              transition={{ ...spring.soft, x: { duration: 0.32 } }}
            >
              <Scene r={r} />
              <p className="ptk-q">{PROMPT[r.kind]}</p>
            </motion.div>
          ) : (
            <motion.div key="end" className="ptk-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="ptk-end">
                {score} / {rounds.length} decoded
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!done && (
        <div className={`ptk-opts n${r.options.length}`}>
          {r.options.map((o, k) => {
            const st = fb ? (k === r.answer ? "right" : k === fb.pick ? "wrong" : "") : "";
            return (
              <button key={`${i}-${o}`} type="button" className={`ptk-opt ${st}`} onClick={() => choose(k)} disabled={!!fb}>
                <Kbd>{k + 1}</Kbd>
                <span>{o}</span>
                {st === "right" && <Check size={16} strokeWidth={3} />}
                {st === "wrong" && <X size={16} strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence initial={false}>
        {fb && !fb.ok && !done && (
          <motion.div className="ptk-why" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring.soft}>
            <span>{r.why}</span>
            <button type="button" className="ptk-next" onClick={next}>
              Next <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Scene({ r }: { r: Round }) {
  switch (r.kind) {
    case "shout":
      return (
        <div className="ptk-scene">
          <span className="ptk-tag">in the pit</span>
          <span className="ptk-bubble">{r.text}</span>
        </div>
      );
    case "digit":
      return (
        <div className="ptk-scene">
          <span className="ptk-tag">the contract trades around {r.handle}</span>
          <span className="ptk-bubble">{r.text}</span>
        </div>
      );
    case "hand":
      return (
        <div className="ptk-scene">
          <span className="ptk-tag">across the pit</span>
          <Palm side={r.side} />
          <span className="ptk-caption">{r.side === "sell" ? "palm turned away from the body" : "palms turned inward, toward the body"}</span>
        </div>
      );
    case "report":
      return (
        <div className="ptk-reports">
          <div className="ptk-rep bid">
            <span className="ptk-rep-h">Bo's report</span>
            {r.buyer}
          </div>
          <div className="ptk-rep ask">
            <span className="ptk-rep-h">Kay's report</span>
            {r.seller}
          </div>
        </div>
      );
  }
}

/** A trader seen from above, the open palm at arm's length, and the way the hand moves the item. */
function Palm({ side }: { side: "sell" | "buy" }) {
  const away = side === "sell";
  return (
    <svg className="ptk-palm" viewBox="0 0 220 70" role="img" aria-label={away ? "Palm away from the body" : "Palms inward"}>
      <circle cx={34} cy={35} r={22} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.5} />
      <circle cx={34} cy={29} r={6} fill="var(--ink-3)" />
      <path d="M22,47 Q34,36 46,47" fill="none" stroke="var(--ink-3)" strokeWidth={3} strokeLinecap="round" />
      <line x1={56} x2={96} y1={35} y2={35} stroke="var(--ink-2)" strokeWidth={4} strokeLinecap="round" />
      <rect x={96} y={18} width={10} height={34} rx={5} fill="var(--surface-2)" stroke="var(--ink-2)" strokeWidth={2.5} />
      {/* the palm's face: a bar on the side it faces */}
      <rect x={away ? 104 : 96} y={20} width={3} height={30} rx={1.5} fill="var(--ink)" />
      <rect x={140} y={24} width={36} height={22} rx={6} fill="var(--surface-2)" stroke="var(--line-strong)" strokeWidth={1.5} />
      <text x={158} y={39} textAnchor="middle" style={{ fontSize: 11, fontWeight: 800, fontFamily: "var(--font)" }} fill="var(--ink-2)">
        item
      </text>
      <path
        d={away ? "M182,35 L210,35 M203,28 L210,35 L203,42" : "M136,35 L114,35 M121,28 L114,35 L121,42"}
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
