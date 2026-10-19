// Game: you are the clearing agent (§3.2.2.1). Compare the buyer's and seller's records:
// clear the trade if every term matches, flag a DK if anything differs.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { shuffle } from "../../../util.ts";
import "./u32.css";

const ROUNDS = 8;
const SECONDS = 80;
const SYMBOLS = ["XYZ", "ABC", "QRS", "MNO", "DEF", "TUV"];
const FIRMS = ["Dealer D", "Broker B", "Dealer K", "Broker M"];

type Field = "sym" | "qty" | "px" | "cpty";
type Rec = { sym: string; qty: string; px: string; cpty: string };
type Round = { buyer: Rec; seller: Rec; bad: Field | null; bName: string; sName: string };

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

function makeRounds(): Round[] {
  const flags = shuffle([true, true, true, true, false, false, false, false]);
  return flags.map((bad) => {
    const sym = pick(SYMBOLS);
    const qty = (Math.floor(Math.random() * 9) + 1) * 500;
    const px = 20 + Math.floor(Math.random() * 400) / 100;
    const [bFirm, sFirm] = shuffle(FIRMS).slice(0, 2);
    const buyer: Rec = { sym, qty: qty.toLocaleString("en-US"), px: `$${px.toFixed(2)}`, cpty: sFirm };
    const seller: Rec = { sym, qty: buyer.qty, px: buyer.px, cpty: bFirm };
    let field: Field | null = null;
    if (bad) {
      field = pick<Field>(["sym", "qty", "px", "px", "cpty"]);
      if (field === "sym") seller.sym = pick(SYMBOLS.filter((s) => s !== sym));
      if (field === "qty") seller.qty = (qty + (Math.random() < 0.5 ? 100 : -100)).toLocaleString("en-US");
      if (field === "px") {
        // transposed digits: the classic recording error
        const t = px.toFixed(2);
        const sw = `${t.slice(0, -2)}${t.slice(-1)}${t.slice(-2, -1)}`;
        seller.px = `$${sw === t ? (px + 0.1).toFixed(2) : sw}`;
      }
      if (field === "cpty") seller.cpty = pick(FIRMS.filter((f) => f !== bFirm && f !== sFirm));
    }
    return { buyer, seller, bad: field, bName: bFirm, sName: sFirm };
  });
}

const LABELS: Record<Field, [string, string]> = {
  sym: ["Bought", "Sold"],
  qty: ["Shares", "Shares"],
  px: ["Price", "Price"],
  cpty: ["From", "To"],
};

export function ClearingDesk({ onDone }: GameProps) {
  const rounds = useMemo(makeRounds, []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [verdict, setVerdict] = useState<{ ok: boolean; said: "clear" | "dk" } | null>(null);
  const [left, setLeft] = useState(SECONDS);
  const end = useRef(Date.now() + SECONDS * 1000);
  const finished = useRef(false);
  const r = rounds[Math.min(i, ROUNDS - 1)];

  const finish = (s: number) => {
    if (finished.current) return;
    finished.current = true;
    setTimeout(() => onDone({ score: s, max: ROUNDS }), 500);
  };

  const answer = (said: "clear" | "dk") => {
    if (verdict || finished.current) return;
    const ok = (said === "clear") === (r.bad === null);
    const s = score + (ok ? 1 : 0);
    setScore(s);
    setVerdict({ ok, said });
    setTimeout(
      () => {
        setVerdict(null);
        if (i + 1 >= ROUNDS) finish(s);
        else setI(i + 1);
      },
      ok ? 900 : 1900,
    );
  };

  useEffect(() => {
    const t = setInterval(() => {
      const s = Math.max(0, Math.ceil((end.current - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) finish(score);
    }, 250);
    return () => clearInterval(t);
  });

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "1") answer("clear");
      if (e.key === "2") answer("dk");
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  const showBad = verdict !== null && r.bad !== null;
  const row = (f: Field, rec: Rec, side: 0 | 1) => (
    <div key={f} className={`cd-row ${showBad && r.bad === f ? "bad" : ""}`}>
      <span>{LABELS[f][side]}</span>
      <strong>{rec[f]}</strong>
    </div>
  );

  return (
    <div className="cd">
      <div className="cd-top">
        <span className="cd-round">
          Trade {Math.min(i + 1, ROUNDS)} / {ROUNDS}
        </span>
        <span className="cd-score">
          <Check size={15} /> {score}
        </span>
        <div className="cd-time" aria-label={`${left} seconds left`}>
          <motion.div className="cd-time-fill" initial={false} animate={{ width: `${(100 * left) / SECONDS}%` }} transition={{ duration: 0.25, ease: "linear" }} />
        </div>
      </div>
      <div className="cd-stage">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={i}
            className="cd-pair"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40, transition: { duration: 0.18, ease: EASE_OUT } }}
            transition={spring.soft}
          >
            <div className="cd-ticket">
              <p className="cd-title">
                {r.bName}'s record <em>buyer</em>
              </p>
              {(["sym", "qty", "px", "cpty"] as Field[]).map((f) => row(f, r.buyer, 0))}
            </div>
            <div className="cd-ticket">
              <p className="cd-title">
                {r.sName}'s record <em>seller</em>
              </p>
              {(["sym", "qty", "px", "cpty"] as Field[]).map((f) => row(f, r.seller, 1))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="cd-msg" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {verdict ? (
            <motion.p key={`v${i}`} className={verdict.ok ? "ok" : "ko"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {verdict.ok ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
              {r.bad === null
                ? verdict.ok
                  ? " Every term matches: it clears."
                  : " Every term matched, so it clears."
                : verdict.ok
                  ? " Right: the records disagree, so it's a DK."
                  : " The records disagree (in red): that's a DK."}
            </motion.p>
          ) : (
            <motion.p key="hint" className="hint-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Same security, size and price, and does each name the other?
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="cd-btns">
        <button type="button" className="cd-btn clear" onClick={() => answer("clear")} disabled={!!verdict}>
          <Check size={18} /> Clears <Kbd>1</Kbd>
        </button>
        <button type="button" className="cd-btn dk" onClick={() => answer("dk")} disabled={!!verdict}>
          <X size={18} /> DK <Kbd>2</Kbd>
        </button>
      </div>
    </div>
  );
}
