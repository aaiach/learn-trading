// Game: prices live on a grid set by the minimum price increment, and orders cluster on round numbers (§5.1, box
// "Price Clustering" p. 91). Three kinds of rounds: is this price allowed? where do you step ahead of the crowd?
// which price will traders use most (or least)? Every answer is computed from the book's rules; prices are ours.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { spring, EASE_OUT } from "../../../motion/tokens.ts";
import "./u51.css";

type Grid = { kind: "grid"; tick: number; price: number; on: boolean };
type Crowd = { kind: "crowd"; side: "buy" | "sell"; round: number; sizes: number[] };
type Cluster = { kind: "cluster"; prompt: string; options: string[]; answer: number; why: string };
type Round = Grid | Crowd | Cluster;

const cents = (v: number) => Math.round(v * 100);
const f2 = (v: number) => v.toFixed(2);
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)];
const NUDGE = { x: [0, -7, 7, -4, 0] };

function gridRound(wantOn: boolean): Grid {
  const tick = pick([0.05, 0.1, 0.25, 0.5]);
  const t = cents(tick);
  const base = 12 + Math.floor(Math.random() * 48);
  let c: number;
  if (wantOn) c = t * Math.floor(Math.random() * (100 / t));
  else if (t === 5) {
    do c = 1 + Math.floor(Math.random() * 98);
    while (c % 5 === 0);
  } else {
    // a tempting price: a multiple of a smaller increment, but not of this one
    do c = 5 * (1 + Math.floor(Math.random() * 19));
    while (c % t === 0);
  }
  return { kind: "grid", tick, price: base + c / 100, on: c % t === 0 };
}

function crowdRound(side: "buy" | "sell", round: number): Crowd {
  const big = 6 + Math.floor(Math.random() * 3);
  // rows from the highest price (round + 0.03) down to the lowest (round − 0.03)
  const sizes = side === "buy" ? [0, 0, 0, big, 1, 2, 1] : [1, 2, 1, big, 0, 0, 0];
  return { kind: "crowd", side, round, sizes };
}

function decimalCluster(): Cluster {
  const base = pick([20, 35, 48, 62, 17.5, 41.5]);
  const odd = shuffle([0.03, -0.07, 0.11, -0.13, 0.17, -0.02]).slice(0, 3);
  const opts = shuffle([base, ...odd.map((d) => base + d)]);
  return {
    kind: "cluster",
    prompt: "Which of these prices will **most** traders use?",
    options: opts.map(f2),
    answer: opts.indexOf(base),
    why: `${f2(base)} is a multiple of ${Number.isInteger(base) ? "1.00" : "0.50"}. The others aren't even multiples of 0.05.`,
  };
}

function fractionCluster(): Cluster {
  const w = pick([20, 31, 47]);
  const opts = shuffle([`${w}`, `${w} ½`, `${w} ¾`, `${w} 5⁄16`]);
  return {
    kind: "cluster",
    prompt: "Prices in fractions. Which price will traders use **least**?",
    options: opts,
    answer: opts.indexOf(`${w} 5⁄16`),
    why: "Whole numbers beat halves, halves beat odd quarters, quarters beat odd eighths, eighths beat odd sixteenths.",
  };
}

function makeDeck(): Round[] {
  const rounds = shuffle([20, 25, 40, 50, 32.5, 75]);
  const on = shuffle([true, true, false, false]);
  return [
    gridRound(on[0]),
    crowdRound("buy", rounds[0]),
    gridRound(on[1]),
    decimalCluster(),
    crowdRound("sell", rounds[1]),
    gridRound(on[2]),
    crowdRound("buy", rounds[2]),
    fractionCluster(),
    gridRound(on[3]),
    crowdRound("sell", rounds[3]),
  ];
}

// The right answer for a round, as an index: grid 0 = on / 1 = off; crowd = row; cluster = option.
function rightOf(r: Round): number {
  if (r.kind === "grid") return r.on ? 0 : 1;
  if (r.kind === "crowd") return r.side === "buy" ? 2 : 4;
  return r.answer;
}

function rowPrice(r: Crowd, row: number) {
  return r.round + (3 - row) / 100;
}

function explain(r: Round, picked: number): string {
  if (r.kind === "grid") {
    const t = cents(r.tick);
    const c = cents(r.price);
    if (r.on) return `${f2(r.price)} = ${c / t} × ${f2(r.tick)}: on the grid.`;
    const lo = (Math.floor(c / t) * t) / 100;
    return `${f2(r.price)} ÷ ${f2(r.tick)} = ${(c / t).toFixed(1)}: not a whole multiple. Nearest allowed: ${f2(lo)} and ${f2(lo + r.tick)}.`;
  }
  if (r.kind === "crowd") {
    const right = rightOf(r);
    const best = f2(rowPrice(r, right));
    const crowd = f2(r.round);
    if (picked === right)
      return r.side === "buy"
        ? `${best}: a seller who arrives sells to you before anyone at ${crowd}, and you pay only one cent more.`
        : `${best}: a buyer who arrives buys from you before anyone at ${crowd}, and you give up only one cent.`;
    if (picked === 3) return `At ${crowd} you join the back of the line, behind the whole crowd. ${r.side === "buy" ? "Bid" : "Offer"} ${best} instead.`;
    const ahead = r.side === "buy" ? picked < 3 : picked > 3;
    if (ahead) return `That gets ahead of the crowd too, but ${best} is enough: one cent past the round number, not more.`;
    return `On that side of the crowd, every order at ${crowd} trades before yours. Use ${best}, just ${r.side === "buy" ? "above" : "below"} it.`;
  }
  return picked === r.answer ? r.why : `It's ${r.options[r.answer]}. ${r.why}`;
}

export function TickGrid({ onDone }: GameProps) {
  const deck = useMemo(makeDeck, []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const finished = useRef(false);
  const done = i >= deck.length;
  const r = deck[Math.min(i, deck.length - 1)];
  const right = rightOf(r);
  const ok = picked === right;

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: deck.length }), 500);
    return () => clearTimeout(id);
  }, [done, score, deck.length, onDone]);

  const answer = (k: number) => {
    if (picked !== null || done) return;
    setPicked(k);
    if (k === rightOf(r)) setScore((s) => s + 1);
  };
  const next = () => {
    if (picked === null) return;
    setPicked(null);
    setI((x) => x + 1);
  };

  useEffect(() => {
    if (done) return;
    const on = (e: KeyboardEvent) => {
      const n = r.kind === "grid" ? 2 : r.kind === "crowd" ? 7 : r.options.length;
      if (picked === null && /^[1-9]$/.test(e.key) && Number(e.key) <= n) {
        e.preventDefault();
        e.stopPropagation();
        answer(Number(e.key) - 1);
      } else if (picked !== null && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  if (done)
    return (
      <div className="tg">
        <motion.div className="tg-end" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring.soft}>
          <strong>
            {score} / {deck.length}
          </strong>
          <span>{score >= 8 ? "You price like a pro." : score >= 5 ? "Good. Watch the round numbers." : "Try again: grid first, then the crowd."}</span>
        </motion.div>
      </div>
    );

  return (
    <div className="tg">
      <div className="tg-top">
        <span className="tg-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="tg-dots" aria-hidden>
          {deck.map((_, k) => (
            <span key={k} className={`tg-dot ${k < i ? "past" : k === i ? "now" : ""}`} />
          ))}
        </div>
        <span className="tg-count">
          {i + 1}/{deck.length}
        </span>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={i}
          className="tg-round"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.15, ease: EASE_OUT } }}
          transition={spring.soft}
        >
          {r.kind === "grid" && <GridRound r={r} picked={picked} onPick={answer} />}
          {r.kind === "crowd" && <CrowdRound r={r} picked={picked} onPick={answer} />}
          {r.kind === "cluster" && <ClusterRound r={r} picked={picked} onPick={answer} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {picked !== null && (
          <motion.div
            key={`fb${i}`}
            className={`tg-fb ${ok ? "ok" : "ko"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={spring.soft}
          >
            <span className="tg-fb-icon">{ok ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}</span>
            <p>{explain(r, picked)}</p>
            <button type="button" className="tg-next" onClick={next} autoFocus>
              Next <ArrowRight size={15} /> <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, k) => (k % 2 ? <strong key={k}>{part}</strong> : <span key={k}>{part}</span>))}
    </>
  );
}

type RoundProps<T> = { r: T; picked: number | null; onPick: (k: number) => void };

function optState(k: number, right: number, picked: number | null) {
  if (picked === null) return "";
  if (k === right) return "right";
  return k === picked ? "wrong" : "faded";
}

function GridRound({ r, picked, onPick }: RoundProps<Grid>) {
  const right = rightOf(r);
  const t = cents(r.tick);
  const c = cents(r.price);
  const lo = Math.floor(c / t) * t;
  // allowed prices around the asked one, and where it falls between them
  const ticks = [-2, -1, 0, 1, 2, 3].map((k) => lo + k * t);
  const span = ticks[ticks.length - 1] - ticks[0];
  const pos = (v: number) => `${(100 * (v - ticks[0])) / span}%`;
  return (
    <>
      <p className="tg-q">Is this price allowed?</p>
      <div className="tg-grid-card">
        <span className="tg-tick">
          increment <strong>{f2(r.tick)}</strong>
        </span>
        <motion.span className="tg-price" animate={picked !== null && picked !== right ? NUDGE : { x: 0 }} transition={{ duration: 0.32 }}>
          {f2(r.price)}
        </motion.span>
      </div>
      <div className={`tg-line ${picked === null ? "" : "shown"}`} aria-hidden>
        <span className="tg-line-bar" />
        {ticks.map((v) => (
          <span key={v} className="tg-line-tick" style={{ left: pos(v) }}>
            <i />
            <small>{f2(v / 100)}</small>
          </span>
        ))}
        <motion.span
          className={`tg-line-mark ${r.on ? "on" : "off"}`}
          initial={false}
          animate={{ opacity: picked === null ? 0 : 1, y: picked === null ? -8 : 0 }}
          transition={spring.soft}
          style={{ left: pos(c) }}
        />
      </div>
      <div className="tg-opts two">
        {["On the grid", "Off the grid"].map((label, k) => (
          <button key={label} type="button" className={`tg-opt ${optState(k, right, picked)}`} onClick={() => onPick(k)} disabled={picked !== null}>
            {label}
            <Kbd>{String(k + 1)}</Kbd>
          </button>
        ))}
      </div>
    </>
  );
}

function CrowdRound({ r, picked, onPick }: RoundProps<Crowd>) {
  const right = rightOf(r);
  const max = Math.max(...r.sizes);
  const crowdSide = r.side === "buy" ? "bid" : "ask";
  return (
    <>
      <p className="tg-q">
        {r.side === "buy" ? (
          <>
            A crowd of buyers bids <strong>{f2(r.round)}</strong>. You want to <strong className="bid">buy</strong> and trade first when a seller comes. Tap your price.
          </>
        ) : (
          <>
            A crowd of sellers offers at <strong>{f2(r.round)}</strong>. You want to <strong className="ask">sell</strong> and trade first when a buyer comes. Tap your price.
          </>
        )}
      </p>
      <div className="tg-book">
        <div className="tg-book-head">
          <span>PRICE</span>
          <span className={crowdSide}>{r.side === "buy" ? "BUY ORDERS" : "SELL ORDERS"}</span>
          <span className="tg-inc">increment 0.01</span>
        </div>
        {r.sizes.map((n, row) => {
          const st = optState(row, right, picked);
          const p = rowPrice(r, row);
          return (
            <motion.button
              key={row}
              type="button"
              className={`tg-row ${st} ${p === r.round ? "round" : ""}`}
              onClick={() => onPick(row)}
              disabled={picked !== null}
              animate={st === "wrong" ? NUDGE : { x: 0 }}
              transition={{ duration: 0.32 }}
            >
              <span className="tg-row-p">{f2(p)}</span>
              <span className="tg-row-bar">
                <motion.span
                  className={`tg-bar ${crowdSide}`}
                  initial={false}
                  animate={{ width: n ? `${Math.max(8, (78 * n) / max)}%` : "0%" }}
                  transition={spring.fill}
                />
                {n > 0 && <em>{n}</em>}
                <AnimatePresence>
                  {picked === row && (
                    <motion.span className="tg-you" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={spring.soft}>
                      you
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <Kbd>{String(row + 1)}</Kbd>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}

function ClusterRound({ r, picked, onPick }: RoundProps<Cluster>) {
  return (
    <>
      <p className="tg-q">
        <Bold text={r.prompt} />
      </p>
      <div className="tg-opts four">
        {r.options.map((o, k) => {
          const st = optState(k, r.answer, picked);
          return (
            <motion.button
              key={o}
              type="button"
              className={`tg-opt big ${st}`}
              onClick={() => onPick(k)}
              disabled={picked !== null}
              animate={st === "wrong" ? NUDGE : { x: 0 }}
              transition={{ duration: 0.32 }}
            >
              {o}
              <Kbd>{String(k + 1)}</Kbd>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
