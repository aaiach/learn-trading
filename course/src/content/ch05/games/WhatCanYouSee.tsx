// Game: you trade in a market from Table 5-7 (p. 102). What can you see right now: which quotes, which trades?
// Every answer is a row of the table.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u54b.css";

const QUOTES = ["Best bid & offer only", "All dealer quotes", "Size at 5 best prices", "Size at every price", "Every order", "Broker or vendor", "Not reported"];
const TRADES = ["At once", "Big ones delayed or missing", "Via brokers only", "None"];
const TKEYS = ["a", "b", "c", "d"];

type Mkt = { name: string; sub?: string; q: number; t: number; qWhy: string; tWhy: string };

// Table 5-7, row by row (the London row is split into its two kinds of stocks).
const MARKETS: Mkt[] = [
  { name: "U.S. stock and option exchanges", q: 0, t: 0, qWhy: "the best bid and offer, immediately; no other prices or sizes", tWhy: "all trades, immediately, within 90 seconds" },
  { name: "Nasdaq", q: 1, t: 0, qWhy: "all dealer quotes, immediately", tWhy: "all trades, immediately, within 90 seconds" },
  { name: "U.S. futures pits", q: 5, t: 0, qWhy: "only from your broker’s representative on the floor", tWhy: "every price change, immediately" },
  { name: "U.S. corporate and municipal bonds", sub: "over the counter", q: 6, t: 2, qWhy: "generally not reported", tWhy: "only through some bond brokers" },
  { name: "U.S. government bonds", q: 5, t: 2, qWhy: "provided by interdealer bond brokers", tWhy: "provided by interdealer bond brokers" },
  { name: "Foreign exchange", q: 5, t: 3, qWhy: "provided by data vendors", tWhy: "none" },
  { name: "Toronto Stock Exchange", q: 2, t: 0, qWhy: "total size of all orders at the five best prices, both sides", tWhy: "all trades, immediately" },
  { name: "Deutsche Börse", sub: "Xetra, continuous trading", q: 3, t: 1, qWhy: "all displayed size, added up by price", tWhy: "Xetra trades at once; very large private trades may never be reported" },
  { name: "Euronext Paris", q: 4, t: 0, qWhy: "all orders", tWhy: "all trades, immediately" },
  { name: "London Stock Exchange", sub: "SEAQ stocks (dealer market)", q: 1, t: 1, qWhy: "all dealer quotes", tWhy: "small trades at once; larger trade reports are delayed" },
  { name: "London Stock Exchange", sub: "SETS stocks (electronic order book)", q: 0, t: 1, qWhy: "the best bid and offer", tWhy: "small trades at once; larger trade reports are delayed" },
];

const N = 8;

export function WhatCanYouSee({ onDone }: GameProps) {
  const deck = useMemo(() => shuffle(MARKETS).slice(0, N), []);
  const [i, setI] = useState(0);
  const [q, setQ] = useState<number | null>(null);
  const [t, setT] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const finished = useRef(false);
  const done = i >= deck.length;
  const m = deck[Math.min(i, deck.length - 1)];
  const qOk = q === m.q;
  const tOk = t === m.t;

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: deck.length * 2 }), 600);
    return () => clearTimeout(id);
  }, [done, score, deck.length, onDone]);

  const check = () => {
    if (checked || q === null || t === null) return;
    setChecked(true);
    setScore((s) => s + (q === m.q ? 1 : 0) + (t === m.t ? 1 : 0));
  };
  const next = () => {
    if (!checked) return;
    setChecked(false);
    setQ(null);
    setT(null);
    setI((x) => x + 1);
  };

  useEffect(() => {
    if (done) return;
    const on = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      let hit = true;
      if (/^[1-7]$/.test(k) && !checked) setQ(Number(k) - 1);
      else if (TKEYS.includes(k) && !checked) setT(TKEYS.indexOf(k));
      else if (k === "enter") {
        if (checked) next();
        else check();
      } else hit = false;
      if (hit) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const state = (row: "q" | "t", k: number) => {
    const pick = row === "q" ? q : t;
    const right = row === "q" ? m.q : m.t;
    if (!checked) return pick === k ? "picked" : "";
    if (k === right) return pick === k ? "right" : "missed";
    return pick === k ? "wrong" : "";
  };

  return (
    <div className="wcs">
      <div className="wcs-top">
        <span className="wcs-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <span className="wcs-count">
          Market {Math.min(i + 1, deck.length)} of {deck.length}
        </span>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {!done ? (
          <motion.div
            key={i}
            className="wcs-mkt"
            initial={{ opacity: 0, y: 12 }}
            animate={checked && !(qOk && tOk) ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.16, ease: EASE_OUT } }}
            transition={{ ...spring.soft, x: { duration: 0.32 } }}
          >
            <span className="wcs-you">You trade in</span>
            <strong>{m.name}</strong>
            {m.sub && <span className="wcs-sub">{m.sub}</span>}
          </motion.div>
        ) : (
          <motion.div key="end" className="wcs-mkt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <strong>
              Done: {score} / {deck.length * 2}
            </strong>
          </motion.div>
        )}
      </AnimatePresence>

      {!done && (
        <>
          <section className="wcs-row" aria-label="Current quotes">
            <h3>
              Current quotes: what do you see? <Kbd>1–7</Kbd>
            </h3>
            <div className="wcs-chips">
              {QUOTES.map((label, k) => (
                <button key={label} type="button" className={`wcs-chip ${state("q", k)}`} onClick={() => !checked && setQ(k)} disabled={checked}>
                  {label}
                </button>
              ))}
            </div>
          </section>
          <section className="wcs-row" aria-label="Trade reports">
            <h3>
              Trade reports? <Kbd>A–D</Kbd>
            </h3>
            <div className="wcs-chips">
              {TRADES.map((label, k) => (
                <button key={label} type="button" className={`wcs-chip ${state("t", k)}`} onClick={() => !checked && setT(k)} disabled={checked}>
                  {label}
                </button>
              ))}
            </div>
          </section>

          <AnimatePresence initial={false}>
            {checked && (
              <motion.div className="wcs-why" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring.soft}>
                <p className={qOk ? "ok" : "ko"}>
                  {qOk ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}
                  <span>
                    <b>Quotes:</b> {m.qWhy}.
                  </span>
                </p>
                <p className={tOk ? "ok" : "ko"}>
                  {tOk ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}
                  <span>
                    <b>Trades:</b> {m.tWhy}.
                  </span>
                </p>
                <small>Table 5-7, p. 102</small>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="button" className="wcs-go" onClick={checked ? next : check} disabled={!checked && (q === null || t === null)}>
            {checked ? (i + 1 < deck.length ? "Next market" : "Finish") : "Check"} <Kbd>Enter</Kbd>
          </button>
        </>
      )}
    </div>
  );
}
