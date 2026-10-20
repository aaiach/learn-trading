// Game: name, then place, limit orders relative to the market (§4.4.1, Table 4-1 and Figure 4-2).
// Every order also shows what it does to the book: marketable orders trade at once, the others stand.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Flame, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { spring } from "../../../motion/tokens.ts";
import "./u44a.css";

export type Side = "buy" | "sell";
export type Term = "Marketable" | "In the market" | "At the market" | "Behind the market";
export const TERMS: Term[] = ["Marketable", "In the market", "At the market", "Behind the market"];

/** Table 4-1: the name of a limit price, for a buy or a sell, given the best bid and best offer. */
export function placement(side: Side, p: number, bb: number, bo: number): Term {
  if (side === "buy") return p >= bo ? "Marketable" : p > bb ? "In the market" : p === bb ? "At the market" : "Behind the market";
  return p <= bb ? "Marketable" : p < bo ? "In the market" : p === bo ? "At the market" : "Behind the market";
}

/** Table 4-1's left column. */
export function where(p: number, bb: number, bo: number): string {
  return p > bo ? "above the best offer" : p === bo ? "at the best offer" : p > bb ? "between the best bid and best offer" : p === bb ? "at the best bid" : "below the best bid";
}

type Round = { kind: "name"; side: Side; p: number; bb: number; bo: number } | { kind: "place"; side: Side; want: Term; bb: number; bo: number };

const ROUNDS: Round[] = [
  { kind: "name", side: "buy", p: 29, bb: 26, bo: 28 },
  { kind: "name", side: "sell", p: 27, bb: 26, bo: 28 },
  { kind: "name", side: "buy", p: 26, bb: 26, bo: 28 },
  { kind: "name", side: "sell", p: 30, bb: 26, bo: 28 },
  { kind: "name", side: "sell", p: 25, bb: 25, bo: 28 },
  { kind: "name", side: "sell", p: 28, bb: 25, bo: 28 },
  { kind: "place", side: "buy", want: "In the market", bb: 25, bo: 28 },
  { kind: "place", side: "buy", want: "Marketable", bb: 26, bo: 28 },
  { kind: "place", side: "sell", want: "Behind the market", bb: 25, bo: 27 },
  { kind: "place", side: "sell", want: "At the market", bb: 24, bo: 27 },
];

const ORDER = 200;
const LIMIT_MS = 10000;
const ROWS = 7;
const MAX = 1000;
const SIZES = [400, 300, 600, 500, 700, 300, 800]; // our numbers
const sizeAt = (p: number, s: "bid" | "ask") => SIZES[(p * 3 + (s === "bid" ? 2 : 0)) % SIZES.length];

type Book = Record<number, { bid: number; ask: number }>;
const rowsOf = (bo: number) => Array.from({ length: ROWS }, (_, i) => bo + 2 - i);
function bookFor(bb: number, bo: number): Book {
  const b: Book = {};
  for (const p of rowsOf(bo)) b[p] = { bid: p <= bb ? sizeAt(p, "bid") : 0, ask: p >= bo ? sizeAt(p, "ask") : 0 };
  return b;
}

/** What the order does to the book once it arrives. */
function arrive(book: Book, side: Side, p: number, bb: number, bo: number): { book: Book; note: string; bb: number; bo: number } {
  const t = placement(side, p, bb, bo);
  const nb: Book = Object.fromEntries(Object.entries(book).map(([k, v]) => [k, { ...v }]));
  if (t === "Marketable") {
    const at = side === "buy" ? bo : bb;
    const key = side === "buy" ? "ask" : "bid";
    nb[at][key] = Math.max(100, nb[at][key] - ORDER);
    const better = p !== at ? `, a better price than its ${p} limit` : "";
    return { book: nb, note: `It trades at once at ${at}, the best ${side === "buy" ? "offer" : "bid"}${better}.`, bb, bo };
  }
  const key = side === "buy" ? "bid" : "ask";
  nb[p][key] += ORDER;
  if (t === "In the market")
    return side === "buy"
      ? { book: nb, note: `It makes a new market: ${p} bid, offered at ${bo}.`, bb: p, bo }
      : { book: nb, note: `It makes a new market: ${bb} bid, offered at ${p}.`, bb, bo: p };
  if (t === "At the market") return { book: nb, note: `It joins the orders at the best ${side === "buy" ? "bid" : "offer"}: it makes the market with them.`, bb, bo };
  return { book: nb, note: "It waits behind the market, behind better-priced orders.", bb, bo };
}

const list = (xs: number[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} or ${xs[xs.length - 1]}`);
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export function PlaceIt({ onDone }: GameProps) {
  const [r, setR] = useState(0);
  const round = ROUNDS[r];
  const [book, setBook] = useState<Book>(() => bookFor(ROUNDS[0].bb, ROUNDS[0].bo));
  const [quote, setQuote] = useState({ bb: ROUNDS[0].bb, bo: ROUNDS[0].bo });
  const [ok, setOk] = useState<boolean | null>(null);
  const [pick, setPick] = useState<{ term: Term | null; p: number } | null>(null);
  const [chip, setChip] = useState<{ p: number; cell: "bid" | "ask" } | null>(() => {
    const f = ROUNDS[0];
    return f.kind === "name" ? { p: f.p, cell: f.side === "buy" ? "bid" : "ask" } : null;
  });
  const [note, setNote] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [left, setLeft] = useState(LIMIT_MS);
  const [cursor, setCursor] = useState(3);
  // the row cursor is for keyboard players only; on touch it would read as a hint
  const [kbdNav, setKbdNav] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const fb = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rows = rowsOf(round.bo);
  const own: "bid" | "ask" = round.side === "buy" ? "bid" : "ask";
  const last = r + 1 >= ROUNDS.length;

  const resolve = (term: Term | null, placed?: number) => {
    if (ok !== null) return;
    const p = round.kind === "name" ? round.p : (placed ?? rows[0]);
    const actual = placement(round.side, p, round.bb, round.bo);
    const good = round.kind === "name" ? term === actual : actual === round.want;
    setOk(good);
    setPick({ term, p });
    if (good) setScore((s) => s + 1);
    setStreak((s) => (good ? s + 1 : 0));
    // a marketable order travels to the order it trades with; the others stay where they were placed
    setChip(actual === "Marketable" ? { p: round.side === "buy" ? round.bo : round.bb, cell: own === "bid" ? "ask" : "bid" } : { p, cell: own });
    const res = arrive(book, round.side, p, round.bb, round.bo);
    setNote(res.note);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setBook(res.book);
      setQuote({ bb: res.bb, bo: res.bo });
      setChip(null);
    }, 700);
  };

  const next = () => {
    if (ok === null) return;
    if (last) {
      onDone({ score, max: ROUNDS.length });
      return;
    }
    const n = ROUNDS[r + 1];
    window.clearTimeout(timer.current);
    setR(r + 1);
    setBook(bookFor(n.bb, n.bo));
    setQuote({ bb: n.bb, bo: n.bo });
    setOk(null);
    setPick(null);
    setNote("");
    setChip(n.kind === "name" ? { p: n.p, cell: n.side === "buy" ? "bid" : "ask" } : null);
    setLeft(LIMIT_MS);
    setCursor(3);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // bring the feedback (and its Next button) above the lesson footer
  useEffect(() => {
    if (ok === null) return;
    const id = window.setTimeout(() => fb.current?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }), 260);
    return () => window.clearTimeout(id);
  }, [ok, reduce]);

  // the clock only runs while a "name it" order waits for an answer
  useEffect(() => {
    if (round.kind !== "name" || ok !== null) return;
    const id = window.setInterval(() => setLeft((l) => l - 100), 100);
    return () => window.clearInterval(id);
  }, [r, ok, round.kind]);
  useEffect(() => {
    if (left <= 0 && ok === null && round.kind === "name") resolve(null);
  });

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      let used = true;
      if (ok !== null) {
        if (e.key === "Enter") next();
        else used = false;
      } else if (round.kind === "name") {
        const i = ["1", "2", "3", "4"].indexOf(e.key);
        if (i >= 0) resolve(TERMS[i]);
        else used = false;
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        if (kbdNav) setCursor((c) => Math.max(0, Math.min(ROWS - 1, c + (e.key === "ArrowUp" ? -1 : 1))));
        setKbdNav(true);
      } else if (e.key === "Enter" && kbdNav) resolve(null, rows[cursor]);
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

  const actual = pick ? placement(round.side, pick.p, round.bb, round.bo) : null;
  const targets = round.kind === "place" ? rows.filter((p) => placement(round.side, p, round.bb, round.bo) === round.want) : [];
  const verb = round.side === "buy" ? "Buy" : "Sell";

  let explain = "";
  if (pick && actual) {
    const at = `${pick.p} is ${where(pick.p, round.bb, round.bo)}`;
    if (round.kind === "name") explain = `${cap(at)}: for a ${round.side} order that is ${actual.toLowerCase()}${!ok && pick.term ? `, not ${pick.term.toLowerCase()}` : ""}.`;
    else if (ok) explain = `${cap(at)}: for a ${round.side} order that is ${actual.toLowerCase()}.`;
    else explain = `${cap(at)}, so that ${round.side} is ${actual.toLowerCase()}. ${round.want} here: ${list(targets)}.`;
  }

  return (
    <div className="pi">
      <div className="pi-top">
        <span>
          Order {r + 1}/{ROUNDS.length} · {round.kind === "name" ? "Name it" : "Place it"}
        </span>
        <span className="pi-score">
          {streak >= 2 && (
            <span className="pi-streak" title={`${streak} right in a row`}>
              <Flame size={14} /> {streak}
            </span>
          )}
          <Check size={14} strokeWidth={3} /> {score}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={r} className="pi-prompt" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
          {round.kind === "name" ? (
            <>
              New order: <strong className={round.side}>{verb} 200 at {round.p}</strong>. What do traders call it?
            </>
          ) : (
            <>
              Place a <strong className={round.side}>{round.side}</strong> order that is <strong>{round.want.toLowerCase()}</strong>.
            </>
          )}
        </motion.p>
      </AnimatePresence>
      {round.kind === "name" && (
        <div className="pi-clock" aria-hidden>
          <div style={{ width: `${Math.max(0, (left / LIMIT_MS) * 100)}%` }} className={left < 3000 ? "low" : ""} />
        </div>
      )}

      <div className="pi-book" role={round.kind === "place" && ok === null ? "listbox" : undefined} aria-label="Order book">
        <div className="pi-head" aria-hidden>
          <span className="b">Bids</span>
          <span>Price</span>
          <span className="a">Offers</span>
        </div>
        {rows.map((p, i) => {
          const lv = book[p] ?? { bid: 0, ask: 0 };
          const inside = p > quote.bb && p < quote.bo;
          const isPick = pick?.p === p;
          const cls = [
            "pi-row",
            inside ? "inside" : "",
            round.kind === "name" && p === round.p && ok === null ? "order" : "",
            isPick && ok !== null ? (ok ? "ok" : "ko") : "",
            ok === false && round.kind === "place" && targets.includes(p) ? "target" : "",
            round.kind === "place" && ok === null && kbdNav && cursor === i ? "cursor" : "",
          ].join(" ");
          const cells = (
            <>
              <span className="pi-cell pi-bid">
                <motion.span className="pi-bar" initial={false} animate={{ width: `${(lv.bid / MAX) * 45}%` }} transition={spring.fill} />
                {chip?.p === p && chip.cell === "bid" && <Chip k={r} side={round.side} />}
              </span>
              <span className={`pi-price${p === quote.bb ? " bb" : ""}${p === quote.bo ? " bo" : ""}`}>{p}</span>
              <span className="pi-cell pi-ask">
                <motion.span className="pi-bar" initial={false} animate={{ width: `${(lv.ask / MAX) * 45}%` }} transition={spring.fill} />
                {chip?.p === p && chip.cell === "ask" && <Chip k={r} side={round.side} />}
              </span>
            </>
          );
          return round.kind === "place" && ok === null ? (
            <button key={p} type="button" className={cls} onClick={() => resolve(null, p)} onPointerEnter={() => kbdNav && setCursor(i)} aria-label={`${verb} at ${p}`}>
              {cells}
            </button>
          ) : (
            <div key={p} className={cls}>
              {cells}
            </div>
          );
        })}
      </div>
      <p className="pi-quote">
        Market: <strong>{quote.bb} bid, offered at {quote.bo}</strong>
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {ok === null ? (
          round.kind === "name" ? (
            <motion.div key={`t${r}`} className="pi-terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {TERMS.map((t, i) => (
                <button key={t} type="button" className="pi-term" onClick={() => resolve(t)}>
                  {t} <Kbd>{i + 1}</Kbd>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.p key={`h${r}`} className="pi-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              Tap a price on the book<span className="kbd-hint"> (or use ↑ ↓ and Enter)</span>.
            </motion.p>
          )
        ) : (
          <motion.div key={`f${r}`} ref={fb} className={`pi-fb ${ok ? "ok" : "ko"}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <p>
              <span className="pi-fb-icon">{ok ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}</span>
              <strong>{ok ? "Right." : round.kind === "name" && !pick?.term ? "Time's up." : "Not quite."}</strong> {explain}
            </p>
            <p className="pi-note">{note}</p>
            <button type="button" className="pi-next" onClick={next} autoFocus>
              {last ? "Finish" : "Next order"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ k, side }: { k: number; side: Side }) {
  return (
    <motion.span
      layoutId={`pi-chip-${k}`}
      className={`pi-chip ${side}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={spring.soft}
    >
      {side === "buy" ? "BUY" : "SELL"} 200
    </motion.span>
  );
}
