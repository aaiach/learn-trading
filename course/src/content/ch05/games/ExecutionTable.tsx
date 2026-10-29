// Game: rebuild Table 5-1 cell by cell, then a quick round from memory (§5.3.5 and 5.6 points, pp. 96, 110).
// Phase 1: a cell's book wording appears under its column question; pick the market type (row) it belongs to.
// Phase 2: the table hides; say who supplies the liquidity in a real market from the table's examples.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u53b.css";

const ROWS = ["Dealer markets", "Oral auctions", "Order-matching systems", "Brokered markets"];
const HEADS = ["Who offers liquidity?", "Who arranges trades?", "How are buyers and sellers matched?"];
const SHORT_HEADS = ["Offers liquidity", "Arranges trades", "How matched"];
// Table 5-1, in the book's words (prompts) and shortened (cells).
const BOOK: string[][] = [
  ["Dealers", "Dealers", "Clients (or their brokers) choose dealers"],
  ["Dealers and public limit order traders", "Traders", "Trading rules regulate negotiations"],
  ["Traders who issue limit orders", "Brokerages or exchanges", "Trading rules match orders"],
  ["Public traders", "Brokers", "Brokers match traders"],
];
const CELL: string[][] = [
  ["Dealers", "Dealers", "Clients choose dealers"],
  ["Dealers + public limit orders", "Traders", "Rules regulate negoti\u00adations"],
  ["Limit order traders", "Brokerages or exchanges", "Rules match orders"],
  ["Public traders", "Brokers", "Brokers match traders"],
];

// Quick round: the 5.6 point on who supplies liquidity, applied to Table 5-1's common examples.
const WHO = ["Dealers only", "Public traders and dealers", "Public traders"];
const QUICK: { text: string; a: number; why: string }[] = [
  { text: "An OTC bond market", a: 0, why: "A dealer market: dealers supply all the liquidity." },
  { text: "An OTC currency market", a: 0, why: "A dealer market: you trade with a dealer." },
  { text: "A floor-based futures pit", a: 1, why: "An oral auction: dealers and public limit order traders." },
  { text: "An electronic stock exchange", a: 1, why: "Order-driven: public traders and dealers both post orders." },
  { text: "A block trade a broker arranges", a: 2, why: "Brokered: the broker finds public traders on the other side." },
  { text: "The sale of a going business", a: 2, why: "Brokered: public traders, found by a broker." },
];

type Q1 = { r: number; c: number };

export function ExecutionTable({ onDone }: GameProps) {
  const deck = useMemo<Q1[]>(() => shuffle(ROWS.flatMap((_, r) => HEADS.map((__, c) => ({ r, c })))), []);
  const quick = useMemo(() => shuffle(QUICK), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [filled, setFilled] = useState<Record<string, "ok" | "ko">>({});
  const [fb, setFb] = useState<{ ok: boolean; pick: number } | null>(null);
  const finished = useRef(false);
  const n1 = deck.length;
  const total = n1 + quick.length;
  const phase = i < n1 ? 1 : 2;
  const done = i >= total;

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: total }), 700);
    return () => clearTimeout(id);
  }, [done, score, total, onDone]);

  const answerOf = (k: number) => (k < n1 ? deck[k].r : quick[k - n1].a);

  const pick = (p: number) => {
    if (fb || done) return;
    const ok = p === answerOf(i);
    if (ok) setScore((s) => s + 1);
    if (i < n1) {
      const q = deck[i];
      setFilled((f) => ({ ...f, [`${q.r}-${q.c}`]: ok ? "ok" : "ko" }));
    }
    setFb({ ok, pick: p });
    setTimeout(
      () => {
        setFb(null);
        setI((x) => x + 1);
      },
      ok ? 750 : 1900,
    );
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const k = Number(e.key);
      const n = phase === 1 ? ROWS.length : WHO.length;
      if (Number.isInteger(k) && k >= 1 && k <= n) {
        e.preventDefault();
        e.stopPropagation();
        pick(k - 1);
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const q = i < n1 ? deck[i] : null;
  const qq = i >= n1 && !done ? quick[i - n1] : null;
  const options = phase === 1 ? ROWS : WHO;
  const right = done ? -1 : answerOf(i);

  return (
    <div className="xt">
      <div className="xt-top">
        <span className="xt-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <span className="xt-phase">{phase === 1 ? "Part 1 · fill the table" : "Part 2 · from memory"}</span>
        <span className="xt-count">
          {done ? total : i + 1}/{total}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {phase === 1 && (
          <motion.div
            key="table"
            className="xt-table"
            role="table"
            aria-label="Table 5-1"
            initial={false}
            exit={{ opacity: 0, height: 0, marginBottom: -12, transition: { duration: 0.3, ease: EASE_OUT } }}
          >
            <div className="xt-row xt-head" role="row">
              <span className="xt-cell xt-corner" role="columnheader">
                Market
              </span>
              {SHORT_HEADS.map((h, c) => (
                <span key={h} className={`xt-cell xt-colhead ${q && q.c === c ? "now" : ""}`} role="columnheader">
                  {h}
                </span>
              ))}
            </div>
            {ROWS.map((r, ri) => (
              <div key={r} className="xt-row" role="row">
                <span className="xt-cell xt-rowhead" role="rowheader">
                  {r.replace(" systems", "").replace(" markets", "")}
                </span>
                {HEADS.map((_, c) => {
                  const st = filled[`${ri}-${c}`];
                  const target = q && q.c === c;
                  return (
                    <span key={c} className={`xt-cell xt-slot ${target ? "col" : ""} ${st ?? ""}`} role="cell">
                      <AnimatePresence>
                        {st && (
                          <motion.span key="v" className="xt-val" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={spring.soft}>
                            {CELL[ri][c]}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="xt-stage">
        <AnimatePresence mode="popLayout" initial={false}>
          {!done ? (
            <motion.div
              key={i}
              className={`xt-card ${fb ? (fb.ok ? "ok" : "ko") : ""}`}
              initial={{ opacity: 0, y: 12 }}
              animate={fb && !fb.ok ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.16, ease: EASE_OUT } }}
              transition={{ ...spring.soft, x: { duration: 0.32 } }}
            >
              <span className="xt-ask">{q ? HEADS[q.c] : "Who supplies the liquidity?"}</span>
              <span className="xt-text">{q ? `“${BOOK[q.r][q.c]}”` : qq?.text}</span>
              {fb && !fb.ok && (
                <small>
                  {q ? `${ROWS[q.r]}: ${HEADS[q.c].toLowerCase().replace("?", "")} → ${BOOK[q.r][q.c].toLowerCase()}.` : qq?.why}
                </small>
              )}
            </motion.div>
          ) : (
            <motion.div key="end" className="xt-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Done!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`xt-btns n${options.length}`}>
        {options.map((o, k) => {
          const st = fb ? (k === right ? "right" : k === fb.pick ? "wrong" : "") : "";
          return (
            <button key={o} type="button" className={`xt-btn ${st}`} onClick={() => pick(k)} disabled={done}>
              <span>{o}</span>
              <Kbd>{k + 1}</Kbd>
            </button>
          );
        })}
      </div>
    </div>
  );
}
