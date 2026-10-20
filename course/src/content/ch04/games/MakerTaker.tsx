// Game: does this order offer liquidity or take it? Against the clock, with a live book (§4.2).
// Offers add a standing order to the book; takers remove one from the other side.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { spring, EASE_OUT } from "../../../motion/tokens.ts";
import "./u42.css";

type Item = { text: string; kind: "offer" | "take"; who: "buyer" | "seller"; why: string };

// Situations from §4.2 and the chapter's examples (Joe and Sue p. 70, APWR p. 71, Sandy p. 78).
const POOL: Item[] = [
  { text: "Joe bids $100 for 100 IBM, good until the close.", kind: "offer", who: "buyer", why: "His standing bid gives others a chance to sell." },
  { text: "Sue sells 100 IBM to Joe's standing bid.", kind: "take", who: "seller", why: "She accepts an offer another trader made." },
  { text: "Bill sends a market order to buy 200 APWR now.", kind: "take", who: "buyer", why: "He trades at once, at the offer a dealer made." },
  { text: "A seller posts an offer at 28 and waits.", kind: "offer", who: "seller", why: "A standing offer gives others a chance to buy." },
  { text: "A buyer accepts the best offer to trade right away.", kind: "take", who: "buyer", why: "Accepting someone's offer takes liquidity." },
  { text: "A dealer quotes 36.80 bid for 500 shares.", kind: "offer", who: "buyer", why: "Dealers sell liquidity: a quote is an offer to trade." },
  { text: "A dealer quotes 36.85 offered for 400 shares.", kind: "offer", who: "seller", why: "Dealers sell liquidity: a quote is an offer to trade." },
  { text: "An impatient seller sells to the best bid at once.", kind: "take", who: "seller", why: "Trading immediately against a bid takes liquidity." },
  { text: "Sandy's limit buy at 10¢ waits with her broker.", kind: "offer", who: "buyer", why: "A standing order is an open offer to trade." },
  { text: "A trader who demands immediacy buys from a quote.", kind: "take", who: "buyer", why: "Demanding immediacy means taking liquidity." },
  { text: "A sell limit order stands above the best bid, waiting.", kind: "offer", who: "seller", why: "Standing orders offer liquidity." },
  { text: "Someone buys from a standing limit order to sell.", kind: "take", who: "buyer", why: "Accepting a standing limit order takes liquidity." },
  { text: "A buyer's bid gives others an opportunity to sell.", kind: "offer", who: "buyer", why: "That is the definition of offering liquidity." },
  { text: "A trader sells right away into a dealer's bid.", kind: "take", who: "seller", why: "Trading at once against a quote takes liquidity." },
];

const N = 12;
const SECONDS = 50;
let uid = 100;
const widths = [62, 84, 48, 74, 92, 56, 70, 80, 44, 66];

export function MakerTaker({ onDone }: GameProps) {
  const deck = useMemo(() => shuffle(POOL).slice(0, N), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; pick: "offer" | "take" } | null>(null);
  const [left, setLeft] = useState(SECONDS);
  const [bids, setBids] = useState([1, 2, 3, 4]);
  const [asks, setAsks] = useState([5, 6, 7, 8]);
  const [flash, setFlash] = useState<{ k: number; side: "bid" | "ask"; kind: "offer" | "take" } | null>(null);
  const deadline = useRef(Date.now() + SECONDS * 1000);
  const finished = useRef(false);
  const done = i >= deck.length || left <= 0;

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setLeft(Math.max(0, (deadline.current - Date.now()) / 1000)), 100);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: deck.length }), 600);
    return () => clearTimeout(id);
  }, [done, score, deck.length, onDone]);

  const pick = (k: "offer" | "take") => {
    if (fb || done) return;
    const it = deck[i];
    const ok = k === it.kind;
    if (ok) {
      setScore((s) => s + 1);
      if (it.kind === "offer") {
        const side = it.who === "buyer" ? "bid" : "ask";
        const id = ++uid;
        if (side === "bid") setBids((b) => [id, ...b].slice(0, 9));
        else setAsks((a) => [id, ...a].slice(0, 9));
        setFlash({ k: id, side, kind: "offer" });
      } else {
        // a buyer takes an offer; a seller takes a bid
        const side = it.who === "buyer" ? "ask" : "bid";
        if (side === "bid") setBids((b) => (b.length > 1 ? b.slice(1) : [++uid]));
        else setAsks((a) => (a.length > 1 ? a.slice(1) : [++uid]));
        setFlash({ k: ++uid, side, kind: "take" });
      }
    }
    setFb({ ok, pick: k });
    setTimeout(
      () => {
        setFb(null);
        setI((x) => x + 1);
      },
      ok ? 650 : 1700,
    );
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "1") {
        e.preventDefault();
        e.stopPropagation();
        pick("offer");
      } else if (e.key === "ArrowRight" || e.key === "2") {
        e.preventDefault();
        e.stopPropagation();
        pick("take");
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const item = deck[Math.min(i, deck.length - 1)];
  return (
    <div className="mkt">
      <div className="mkt-top">
        <span className="mkt-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="mkt-time" aria-label={`${Math.ceil(left)} seconds left`}>
          <motion.div className="mkt-time-fill" animate={{ width: `${(100 * left) / SECONDS}%` }} transition={{ duration: 0.1, ease: "linear" }} />
        </div>
        <span className="mkt-count">
          {Math.min(i + 1, deck.length)}/{deck.length}
        </span>
      </div>

      <div className="mkt-book" aria-hidden>
        <Stack side="bid" ids={bids} flash={flash} />
        <div className="mkt-mid">
          <AnimatePresence>
            {flash?.kind === "take" && (
              <motion.span
                key={flash.k}
                className="mkt-trade"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
                transition={{ duration: 0.9, times: [0, 0.15, 0.7, 1] }}
              >
                trade
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <Stack side="ask" ids={asks} flash={flash} />
      </div>

      <div className="mkt-stage">
        <AnimatePresence mode="popLayout" initial={false}>
          {!done ? (
            <motion.div
              key={i}
              className={`mkt-card ${fb ? (fb.ok ? "ok" : "ko") : ""}`}
              initial={{ opacity: 0, y: 14 }}
              animate={fb && !fb.ok ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.16, ease: EASE_OUT } }}
              transition={{ ...spring.soft, x: { duration: 0.32 } }}
            >
              <span className={`mkt-who ${item.who}`}>{item.who === "buyer" ? "buyer" : "seller"}</span>
              {item.text}
              {fb && !fb.ok && (
                <small>
                  {item.kind === "offer" ? "Offers liquidity" : "Takes liquidity"}: {item.why}
                </small>
              )}
            </motion.div>
          ) : (
            <motion.div key="end" className="mkt-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {left <= 0 && i < deck.length ? "Time!" : "Done!"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mkt-btns">
        {(["offer", "take"] as const).map((k) => {
          const st = fb ? (k === item.kind ? "right" : k === fb.pick ? "wrong" : "") : "";
          return (
            <button key={k} type="button" className={`mkt-btn ${k} ${st}`} onClick={() => pick(k)} disabled={done}>
              {k === "offer" ? <ArrowLeft size={16} /> : null}
              {k === "offer" ? "Offers liquidity" : "Takes liquidity"}
              {k === "take" ? <ArrowRight size={16} /> : null}
              <Kbd>{k === "offer" ? "1" : "2"}</Kbd>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Stack({ side, ids, flash }: { side: "bid" | "ask"; ids: number[]; flash: { k: number; side: "bid" | "ask"; kind: "offer" | "take" } | null }) {
  return (
    <div className={`mkt-col ${side}`}>
      <span className="mkt-h">{side === "bid" ? "BIDS" : "OFFERS"}</span>
      <div className="mkt-stack">
        <AnimatePresence initial={false}>
          {ids.map((id) => (
            <motion.span
              key={id}
              layout
              className={`mkt-blk ${side}${flash?.kind === "offer" && flash.k === id ? " new" : ""}`}
              style={{ width: `${widths[id % widths.length]}%` }}
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, x: side === "bid" ? 40 : -40, transition: { duration: 0.35 } }}
              transition={spring.soft}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
