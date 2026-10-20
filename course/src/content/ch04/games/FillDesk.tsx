// Game: you are the broker. For each incoming offer, may you trade it under the client's ticket?
// Practises price limits, validity (§4.9) and quantity instructions (§4.10) together. Our numbers,
// except ticket 2, which is Harry's order from the box "An Order Example" (p. 69).
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { spring } from "../../../motion/tokens.ts";
import "./u410.css";

type Offer = { time: string; side: "Offer" | "Bid"; qty: number; px: string; take: number; why: string };
type Ticket = { side: "BUY" | "SELL"; qty: number; sym: string; limit: string; tags: string[]; end: string; offers: Offer[] };

const TICKETS: Ticket[] = [
  {
    side: "BUY",
    qty: 2000,
    sym: "ABC",
    limit: "30.00",
    tags: ["Day", "Minimum 500"],
    end: "Expired at the close",
    offers: [
      { time: "10:05", side: "Offer", qty: 300, px: "29.98", take: 0, why: "Under the 500-share minimum." },
      { time: "11:20", side: "Offer", qty: 800, px: "30.02", take: 0, why: "Above the 30.00 limit." },
      { time: "13:45", side: "Offer", qty: 900, px: "29.99", take: 900, why: "At or under 30.00, and at least 500 shares." },
      { time: "16:10", side: "Offer", qty: 1100, px: "29.95", take: 0, why: "After the close: the day order has expired." },
    ],
  },
  {
    side: "SELL",
    qty: 7600,
    sym: "XOM",
    limit: "41.05",
    tags: ["Day", "All-or-nothing"],
    end: "Filled",
    offers: [
      { time: "10:00", side: "Bid", qty: 5000, px: "41.10", take: 0, why: "All-or-nothing: 5,000 can't fill 7,600 at once." },
      { time: "12:30", side: "Bid", qty: 10000, px: "41.00", take: 0, why: "Below Harry's 41.05 limit." },
      { time: "14:50", side: "Bid", qty: 8000, px: "41.06", take: 7600, why: "All 7,600 at once, at 41.05 or better." },
      { time: "15:30", side: "Bid", qty: 2000, px: "41.20", take: 0, why: "Already filled: nothing left to sell." },
    ],
  },
  {
    side: "BUY",
    qty: 1000,
    sym: "KO",
    limit: "56.10",
    tags: ["Immediate-or-cancel", "sent 11:00:00"],
    end: "Rest canceled",
    offers: [
      { time: "11:00:00", side: "Offer", qty: 400, px: "56.08", take: 400, why: "Available the instant it arrives, within the limit." },
      { time: "11:00:00", side: "Offer", qty: 300, px: "56.12", take: 0, why: "Above the 56.10 limit." },
      { time: "11:00:00", side: "Offer", qty: 200, px: "56.10", take: 200, why: "At the limit, in the same instant." },
      { time: "11:00:01", side: "Offer", qty: 600, px: "56.05", take: 0, why: "Too late: the unfilled 400 were canceled at once." },
    ],
  },
];
const TOTAL = TICKETS.reduce((n, t) => n + t.offers.length, 0);
const fmt = (n: number) => n.toLocaleString("en-US");

export function FillDesk({ onDone }: GameProps) {
  const [ti, setTi] = useState(0);
  const [oi, setOi] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null); // the learner's choice: true = trade
  const t = TICKETS[ti];
  const o = t.offers[oi];
  const right = answer !== null && answer === o.take > 0;
  const filled = t.offers.slice(0, oi + (answer !== null ? 1 : 0)).reduce((n, x) => n + x.take, 0);
  const lastOfTicket = oi + 1 >= t.offers.length;
  const status = answer !== null && lastOfTicket ? t.end : filled >= t.qty ? "Filled" : "Working";

  const decide = (trade: boolean) => {
    if (answer !== null) return;
    setAnswer(trade);
    if (trade === o.take > 0) setScore((s) => s + 1);
  };
  const next = () => {
    if (answer === null) return;
    setAnswer(null);
    if (!lastOfTicket) setOi(oi + 1);
    else if (ti + 1 < TICKETS.length) {
      setTi(ti + 1);
      setOi(0);
    } else onDone({ score, max: TOTAL });
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((k === "t" || k === "1") && answer === null) {
        e.preventDefault();
        e.stopPropagation();
        decide(true);
      } else if ((k === "p" || k === "2") && answer === null) {
        e.preventDefault();
        e.stopPropagation();
        decide(false);
      } else if (e.key === "Enter" && answer !== null) {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    // capture phase, so the lesson player's Enter doesn't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const done = ti * 4 + oi + (answer !== null ? 1 : 0);
  return (
    <div className="fd">
      <div className="fd-top">
        <span className="fd-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="fd-prog" aria-label={`${done} of ${TOTAL} decisions`}>
          <motion.div className="fd-prog-fill" animate={{ width: `${(100 * done) / TOTAL}%` }} transition={spring.fill} />
        </div>
        <span className="fd-count">
          Ticket {ti + 1}/{TICKETS.length}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={ti} className="fd-ticket" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
          <div className="fd-ticket-main">
            <span className={`fd-side ${t.side === "BUY" ? "buy" : "sell"}`}>{t.side}</span>
            <strong>
              {fmt(t.qty)} {t.sym}
            </strong>
            <span className="fd-limit">limit {t.limit}</span>
          </div>
          <div className="fd-tags">
            {t.tags.map((g) => (
              <span key={g} className="fd-tag">
                {g}
              </span>
            ))}
          </div>
          <div className="fd-fill">
            <div className="fd-bar">
              <motion.div className="fd-bar-fill" animate={{ width: `${(100 * filled) / t.qty}%` }} transition={spring.fill} />
            </div>
            <span className="fd-filled">
              {fmt(filled)} / {fmt(t.qty)} · <em>{status}</em>
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${ti}-${oi}`}
          className={`fd-offer ${answer === null ? "" : right ? "ok" : "ko"}`}
          initial={{ opacity: 0, x: 24 }}
          animate={answer !== null && !right ? { opacity: 1, x: [0, -7, 7, -4, 0] } : { opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24, transition: { duration: 0.15 } }}
          transition={{ ...spring.soft, x: { duration: 0.32 } }}
        >
          <span className="fd-time">{o.time}</span>
          <span className={`fd-what ${o.side === "Offer" ? "ask" : "bid"}`}>
            {o.side} {fmt(o.qty)} @ {o.px}
          </span>
          <span className="fd-q">May you trade it for the client?</span>
        </motion.div>
      </AnimatePresence>

      <div className="fd-btns">
        <button type="button" className={`fd-btn ${answer === null ? "" : o.take > 0 ? "right" : answer ? "wrong" : "off"}`} onClick={() => decide(true)} disabled={answer !== null}>
          <Kbd>T</Kbd> Trade
        </button>
        <button type="button" className={`fd-btn ${answer === null ? "" : o.take === 0 ? "right" : !answer ? "wrong" : "off"}`} onClick={() => decide(false)} disabled={answer !== null}>
          <Kbd>P</Kbd> Pass
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {answer !== null && (
          <motion.div key={`fb${ti}-${oi}`} className={`fd-fb ${right ? "ok" : "ko"}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring.soft}>
            <p>
              {right ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
              <strong>{o.take > 0 ? `Trade ${fmt(o.take)}.` : "Pass."}</strong> {o.why}
            </p>
            <button type="button" className="fd-next" onClick={next} autoFocus>
              {lastOfTicket && ti + 1 >= TICKETS.length ? "Finish" : lastOfTicket ? "Next ticket" : "Next"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
