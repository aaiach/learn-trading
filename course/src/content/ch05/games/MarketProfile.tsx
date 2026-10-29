// Game: set the dials of real markets from Chapter 5, as the book describes them in 2003 (§5.5).
// Every answer comes from the chapter: sessions (§5.2), forums (§5.1) and execution systems (§5.3).
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { spring, EASE_OUT } from "../../../motion/tokens.ts";
import "./u54c.css";

type DialId = "session" | "forum" | "exec";
const DIALS: Record<DialId, { label: string; opts: string[] }> = {
  session: { label: "When does it trade?", opts: ["Only when called", "Whenever open"] },
  forum: { label: "Where do traders meet?", opts: ["On a floor", "From their offices"] },
  exec: { label: "Who arranges the trades?", opts: ["Dealers", "Order rules", "Brokers"] },
};
const ORDER: DialId[] = ["session", "forum", "exec"];

type Card = { name: string; sub: string; set: Partial<Record<DialId, { a: number; why: string }>> };

const POOL: Card[] = [
  {
    name: "Corn futures at the CBOT",
    sub: "open outcry in the corn pit",
    set: {
      session: { a: 1, why: "Open-outcry futures exchanges trade continuously from the open (p. 91)." },
      forum: { a: 0, why: "Corn futures must be traded in the pit on the CBOT floor (p. 90)." },
      exec: { a: 1, why: "Oral auctions are order-driven: trading rules regulate the negotiations (Table 5-1)." },
    },
  },
  {
    name: "New U.S. Treasury bills",
    sub: "sold by the government",
    set: {
      session: { a: 0, why: "Most governments sell their bonds, notes and bills in call market auctions (p. 91)." },
      exec: { a: 1, why: "Governments issue new debt in order-driven market calls (p. 95)." },
    },
  },
  {
    name: "A Nasdaq stock",
    sub: "in 2003",
    set: {
      session: { a: 1, why: "Almost all major stock markets have continuous sessions (p. 90)." },
      forum: { a: 1, why: "Nasdaq dealers trade through electronic systems and phones, not on a floor (p. 93)." },
      exec: { a: 0, why: "Nasdaq is essentially a quote-driven dealer market (p. 96)." },
    },
  },
  {
    name: "A large block of stock",
    sub: "too big for the usual market",
    set: {
      exec: { a: 2, why: "Brokers must find suitable counterparts for most large blocks (p. 96)." },
    },
  },
  {
    name: "An office building",
    sub: "a real estate sale",
    set: {
      exec: { a: 2, why: "Real estate markets are brokered: items are unique and dealers won't hold them (p. 96)." },
    },
  },
  {
    name: "Euros for dollars",
    sub: "between banks, by phone",
    set: {
      session: { a: 1, why: "Almost all major foreign exchange markets trade continuously (p. 90)." },
      forum: { a: 1, why: "Most dealer markets are informal telephone networks of dealers (p. 93)." },
      exec: { a: 0, why: "Almost all currency markets are quote-driven dealer markets (p. 93)." },
    },
  },
  {
    name: "An eBay auction",
    sub: "highest bidder wins at the close",
    set: {
      session: { a: 0, why: "Most of eBay's auctions are call market auctions (p. 95)." },
      exec: { a: 1, why: "eBay runs pure order-driven auctions (p. 95)." },
    },
  },
  {
    name: "A NYSE stock",
    sub: "in 2003",
    set: {
      session: { a: 1, why: "It trades continuously after an opening call (p. 91)." },
      forum: { a: 0, why: "Physically convened stock markets trade at posts on the floor (p. 90)." },
      exec: { a: 1, why: "The NYSE is essentially an order-driven market (p. 96)." },
    },
  },
  {
    name: "A corporate bond",
    sub: "over the counter",
    set: {
      session: { a: 1, why: "Almost all major bond markets trade continuously (p. 90)." },
      forum: { a: 1, why: "Dealers deal with clients and each other by telephone (p. 93)." },
      exec: { a: 0, why: "Almost all bond markets are quote-driven dealer markets (p. 93)." },
    },
  },
  {
    name: "A rarely traded stock",
    sub: "at Euronext Paris",
    set: {
      session: { a: 0, why: "Some stock markets use calls for their least active securities (p. 91)." },
      exec: { a: 1, why: "Call markets usually arrange trades with order-driven systems (p. 91)." },
    },
  },
];

const N = 7;

export function MarketProfile({ onDone }: GameProps) {
  const deck = useMemo(() => shuffle(POOL).slice(0, N), []);
  const max = useMemo(() => deck.reduce((n, c) => n + Object.keys(c.set).length, 0), [deck]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState<Partial<Record<DialId, number>>>({});
  const [checked, setChecked] = useState(false);
  const finished = useRef(false);
  const done = i >= deck.length;
  const card = deck[Math.min(i, deck.length - 1)];
  const dials = ORDER.filter((d) => card.set[d]);
  const complete = dials.every((d) => picks[d] !== undefined);
  const allRight = dials.every((d) => picks[d] === card.set[d]!.a);

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max }), 500);
    return () => clearTimeout(id);
  }, [done, score, max, onDone]);

  const set = (d: DialId, k: number) => {
    if (checked || done) return;
    setPicks((p) => ({ ...p, [d]: k }));
  };

  const check = () => {
    if (checked || !complete || done) return;
    setScore((s) => s + dials.filter((d) => picks[d] === card.set[d]!.a).length);
    setChecked(true);
  };

  const next = () => {
    setChecked(false);
    setPicks({});
    setI((x) => x + 1);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (done) return;
      if (/^[1-3]$/.test(e.key) && !checked) {
        // number keys set the first dial still unset (or the last one, to change it)
        const d = dials.find((x) => picks[x] === undefined) ?? dials[dials.length - 1];
        const k = Number(e.key) - 1;
        if (k < DIALS[d].opts.length) {
          e.preventDefault();
          e.stopPropagation();
          set(d, k);
        }
      } else if (e.key === "Enter") {
        if (!checked && complete) {
          e.preventDefault();
          e.stopPropagation();
          check();
        } else if (checked) {
          e.preventDefault();
          e.stopPropagation();
          next();
        }
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  return (
    <div className="mpf">
      <div className="mpf-top">
        <span className="mpf-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="ptk-dots" aria-hidden>
          {deck.map((_, k) => (
            <span key={k} className={`ptk-dot ${k < i ? "past" : k === i ? "now" : ""}`} />
          ))}
        </div>
        <span className="mpf-count">
          {Math.min(i + 1, deck.length)}/{deck.length}
        </span>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {!done ? (
          <motion.div
            key={i}
            className="mpf-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.16, ease: EASE_OUT } }}
            transition={spring.soft}
          >
            <div className="mpf-head">
              <strong>{card.name}</strong>
              <span>{card.sub}</span>
            </div>
            {dials.map((d) => {
              const want = card.set[d]!;
              const got = picks[d];
              const ok = checked && got === want.a;
              return (
                <motion.div
                  key={d}
                  className={`mpf-dial ${checked ? (ok ? "ok" : "ko") : ""}`}
                  animate={checked && !ok ? { x: [0, -6, 6, -3, 0] } : { x: 0 }}
                  transition={{ duration: 0.32 }}
                >
                  <span className="mpf-label">{DIALS[d].label}</span>
                  <div className={`mpf-seg n${DIALS[d].opts.length}`} role="radiogroup" aria-label={DIALS[d].label}>
                    {DIALS[d].opts.map((o, k) => {
                      const st = checked ? (k === want.a ? "right" : k === got ? "wrong" : "") : got === k ? "on" : "";
                      return (
                        <button key={o} type="button" role="radio" aria-checked={got === k} className={`mpf-opt ${st}`} onClick={() => set(d, k)} disabled={checked}>
                          {o}
                          {st === "right" && <Check size={14} strokeWidth={3} />}
                          {st === "wrong" && <X size={14} strokeWidth={3} />}
                        </button>
                      );
                    })}
                  </div>
                  {checked && <small className="mpf-why">{want.why}</small>}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div key="end" className="mpf-card mpf-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {score} / {max} dials set right
          </motion.div>
        )}
      </AnimatePresence>

      {!done && (
        <button type="button" className={`mpf-go ${checked ? (allRight ? "good" : "bad") : ""}`} onClick={checked ? next : check} disabled={!checked && !complete}>
          {checked ? (allRight ? "All right! Next" : "Next market") : "Check"} <Kbd>Enter</Kbd>
        </button>
      )}
    </div>
  );
}
