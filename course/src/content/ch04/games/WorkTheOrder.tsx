// Game: work a large not-held buy order over four moments without moving the price (§4.8).
// Our numbers: 8,000 shares; each price level offers 2,000. Taking more than one level leaves the
// price higher (market impact); between moments the market drifts.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { spring } from "../../../motion/tokens.ts";
import "./u48.css";

const TOTAL = 8000;
const DEPTH = 2000;
const LEVELS = 5;
const MOMENTS = 4;
const START = 2001; // best offer 20.01, in cents
const ALL_AT_ONCE = fillCost(START, TOTAL).avg; // the benchmark: sweep the book at the first moment

function fillCost(best: number, qty: number) {
  let left = qty;
  let cost = 0;
  let level = 0;
  const taken: number[] = [];
  while (left > 0) {
    const q = Math.min(DEPTH, left);
    taken.push(q);
    cost += q * (best + level);
    left -= q;
    level++;
  }
  return { cost, avg: qty ? cost / qty : 0, levels: taken.length, taken };
}

const px = (cents: number) => (cents / 100).toFixed(2);
const px3 = (cents: number) => (cents / 100).toFixed(3);

function stars(slip: number) {
  if (slip <= 0.5) return 3;
  if (slip <= 1.0) return 2;
  if (slip < ALL_AT_ONCE - START) return 1;
  return 0;
}

type Phase = "choose" | "filled" | "end";

export function WorkTheOrder({ onDone }: GameProps) {
  const drifts = useMemo(() => shuffle([1, 1, -1]), []);
  const [m, setM] = useState(0);
  const [best, setBest] = useState(START);
  const [left, setLeft] = useState(TOTAL);
  const [cost, setCost] = useState(0);
  const [phase, setPhase] = useState<Phase>("choose");
  const [last, setLast] = useState<{ qty: number; avg: number; taken: number[]; impact: number } | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const reported = useRef(false);

  const bought = TOTAL - left;
  const avg = bought ? cost / bought : 0;
  const final = m === MOMENTS - 1;
  const choices = final ? [left] : [0, 2000, 4000, 6000, left].filter((q, i, a) => q <= left && a.indexOf(q) === i);
  const slip = avg - START;
  const score = stars(slip);

  const buy = (qty: number) => {
    if (phase !== "choose") return;
    const f = fillCost(best, qty);
    setCost((c) => c + f.cost);
    setLeft((l) => l - qty);
    const impact = Math.max(0, f.levels - 1);
    setLast({ qty, avg: f.avg, taken: f.taken, impact });
    setNote(null);
    setPhase("filled");
  };

  const next = () => {
    if (phase === "end") {
      if (!reported.current) {
        reported.current = true;
        onDone({ score, max: 3 });
      }
      return;
    }
    if (phase !== "filled" || !last) return;
    if (final || left === 0) {
      setPhase("end");
      return;
    }
    const d = drifts[m];
    const nb = best + last.impact + d;
    const parts = [];
    if (last.impact) parts.push(`your buying left the price ${last.impact}¢ higher`);
    parts.push(d > 0 ? "the market drifted up 1¢" : d < 0 ? "the market drifted down 1¢" : "the market held still");
    setNote(parts.join("; ").replace(/^./, (s) => s.toUpperCase()) + ".");
    setBest(nb);
    setM(m + 1);
    setLast(null);
    setPhase("choose");
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (phase === "choose" && /^[1-5]$/.test(e.key)) {
        const q = choices[Number(e.key) - 1];
        if (q !== undefined) {
          e.preventDefault();
          e.stopPropagation();
          buy(q);
        }
      } else if (e.key === "Enter" && phase !== "choose") {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    // capture phase, so the lesson player doesn't also see the key
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  // the offers on screen: what's left at each level after this moment's fill
  const rows = Array.from({ length: LEVELS }, (_, k) => {
    const taken = phase === "filled" && last ? (last.taken[k] ?? 0) : 0;
    return { p: best + k, size: DEPTH - taken, taken };
  }).reverse();

  return (
    <div className="wo">
      <div className="wo-top">
        <div className="wo-moments" aria-label={`Moment ${m + 1} of ${MOMENTS}`}>
          {Array.from({ length: MOMENTS }, (_, k) => (
            <span key={k} className={`wo-dot${k < m || (k === m && phase !== "choose") ? " done" : ""}${k === m && phase === "choose" ? " now" : ""}`} />
          ))}
        </div>
        <span className="wo-left">
          Left to buy <strong>{left.toLocaleString("en-US")}</strong>
        </span>
      </div>

      <div className="wo-body">
        <div className="wo-book" aria-label="Offers">
          <div className="wo-book-head">
            <span>Price</span>
            <span>Offered</span>
          </div>
          {rows.map((r) => (
            <div key={r.p} className={`wo-row${r.taken ? " hit" : ""}`}>
              <span className="wo-p">{px(r.p)}</span>
              <span className="wo-bar-wrap">
                <motion.span className="wo-bar" initial={false} animate={{ width: `${(100 * r.size) / DEPTH}%` }} transition={spring.fill} />
                <span className="wo-size">{r.size.toLocaleString("en-US")}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="wo-stats">
          <span className="wo-k">Bought</span>
          <strong className="wo-v">{bought.toLocaleString("en-US")}</strong>
          <span className="wo-k">Your average</span>
          <strong className="wo-v">{bought ? px3(avg) : "—"}</strong>
          <span className="wo-k">All at once</span>
          <strong className="wo-v muted">{px3(ALL_AT_ONCE)}</strong>
        </div>
      </div>

      <div className="wo-msg">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={`${phase}${m}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            {phase === "choose" &&
              (note ? <>{note} </> : null)}
            {phase === "choose" && (final ? <strong>Last moment: buy the rest.</strong> : <strong>Moment {m + 1}: how much do you buy now?</strong>)}
            {phase === "filled" && last && (last.qty ? <>Bought <strong>{last.qty.toLocaleString("en-US")}</strong> at an average of <strong>{px3(last.avg)}</strong>{last.impact ? `, walking up ${last.taken.length} price levels.` : "."}</> : <>You waited. Nothing bought this moment.</>)}
            {phase === "end" && (
              <>
                Average <strong>{px3(avg)}</strong>: {slip <= 0 ? "at or below" : `${slip.toFixed(2)}¢ above`} the starting offer, versus {(ALL_AT_ONCE - START).toFixed(2)}¢ for buying it all at once.
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>

      {phase === "end" && (
        <div className="wo-stars" aria-label={`${score} of 3 stars`}>
          {[0, 1, 2].map((k) => (
            <motion.span key={k} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...spring.soft, delay: 0.12 * k }}>
              <Star size={28} fill={k < score ? "currentColor" : "none"} className={k < score ? "on" : ""} />
            </motion.span>
          ))}
        </div>
      )}

      {phase === "choose" ? (
        <div className="wo-btns">
          {choices.map((q, k) => (
            <button key={q} type="button" className="wo-btn" onClick={() => buy(q)}>
              {final ? `Buy the rest · ${q.toLocaleString("en-US")}` : q === 0 ? "Wait" : q === left && q !== 2000 && q !== 4000 && q !== 6000 ? `All ${q.toLocaleString("en-US")}` : q.toLocaleString("en-US")}
              <Kbd>{k + 1}</Kbd>
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className="wo-next" onClick={next}>
          {phase === "end" ? "Finish" : final || left === 0 ? "See the result" : "Next moment"} <ArrowRight size={16} />
          <Kbd>Enter</Kbd>
        </button>
      )}
    </div>
  );
}
