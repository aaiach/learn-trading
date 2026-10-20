// Game: the chapter's capstone. Client tickets arrive at the desk; pick the order that fits each goal.
// Explanations come from Table 4-4 "Order Properties" (p. 87) and the sections that define each order.
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Headset, Minus, Plus, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u411.css";

type Kind =
  | "market"
  | "limit"
  | "marketable"
  | "stop"
  | "stoplimit"
  | "mit"
  | "tick"
  | "notheld"
  | "iceberg"
  | "moc";

/** Table 4-4 rows (p. 87), plus §4.11.2 and §4.9 for the two instructions the table doesn't list. */
const PROPS: Record<Kind, { name: string; effect: string; plus: string; minus: string; src: string }> = {
  market: { name: "Market order", effect: "Demands immediacy", plus: "Fast execution", minus: "Uncertain price impact", src: "Table 4-4" },
  limit: { name: "Standing limit order", effect: "Supplies liquidity", plus: "Limited price with no price impact", minus: "May never execute", src: "Table 4-4" },
  marketable: { name: "Marketable limit order", effect: "Demands immediacy", plus: "Limited price impact", minus: "Some price impact possible", src: "Table 4-4" },
  stop: { name: "Stop market order", effect: "Demands liquidity when it is least available", plus: "Often used to stop losses when the trader is not present", minus: "Price impact can be large", src: "Table 4-4" },
  stoplimit: { name: "Stop limit order", effect: "Triggered when liquidity is least available", plus: "Limits price impact", minus: "May not execute", src: "Table 4-4" },
  mit: { name: "Market-if-touched order", effect: "Demands immediacy and supplies resiliency", plus: "Fast execution following trigger", minus: "Uncertain price impact", src: "Table 4-4" },
  tick: { name: "Tick-sensitive order", effect: "Supplies liquidity", plus: "No price impact; adjusts with the market", minus: "Uncertain execution price", src: "Table 4-4" },
  notheld: { name: "Market-not-held order", effect: "Broker decides whether to offer or take liquidity", plus: "Expert brokers may make better trading decisions with better information", minus: "Trader loses control over the broker", src: "Table 4-4" },
  iceberg: { name: "Undisclosed (iceberg) order", effect: "A standing limit order that shows only part of its size", plus: "Hides the size that could move the market away", minus: "Others can probe it with large fill-or-kill orders", src: "§4.11.2" },
  moc: { name: "Market-on-close order", effect: "A market order that fills only at the close", plus: "Aims for the closing price", minus: "Brokers won't guarantee the closing price", src: "§4.9" },
};

type Ticket = { who: string; goal: string; quote?: string; answer: Kind; others: [Kind, Kind, Kind]; why: string };

// Every scenario restates an example or a rule from chapter 4.
const TICKETS: Ticket[] = [
  { who: "Tom, sell 300 ANN", goal: "Must sell right now, whatever the price.", quote: "23.35 bid · 23.45 offered", answer: "market", others: ["limit", "stop", "moc"], why: "Immediacy first: a market order trades at once against the best bid." },
  { who: "Sandy, buy 5 July sugar", goal: "Only at 10¢ a pound or less, and there's no time to watch the market today.", answer: "limit", others: ["market", "stop", "marketable"], why: "A standing limit order waits for that price while the broker watches the market." },
  { who: "Buyer of 500 GM", goal: "Wants to trade now, but won't pay more than 48.20 if the offer jumps while the order travels.", quote: "48.15 bid · 48.20 offered", answer: "marketable", others: ["market", "limit", "stoplimit"], why: "A limit at the offer trades at once and caps what the buyer can pay." },
  { who: "Stan, long 10 cotton at 80¢", goal: "Get out if cotton falls to 70¢, even while away from the market.", answer: "stop", others: ["limit", "mit", "tick"], why: "A sell stop activates when price falls to 70¢: a stop loss order. It may fill well below 70¢." },
  { who: "Buyer of ASTN", goal: "Buy only if the price rises to 10, and then pay no more than 10.37.", answer: "stoplimit", others: ["stop", "limit", "mit"], why: "Two prices: the stop (10) activates the order, the limit (10.37) caps the price." },
  { who: "Seller at £5", goal: "Sell if the price rises to £5, and be sure to trade once it touches.", answer: "mit", others: ["limit", "stop", "market"], why: "Touched, it becomes a market order: it trades, unlike a limit order that may be skipped." },
  { who: "Patient buyer of SKI", goal: "Buy below the last price, never bid the price up, and can't keep resubmitting as prices rise.", answer: "tick", others: ["limit", "market", "mit"], why: "A buy downtick order is a limit order whose limit follows the price up, never down." },
  { who: "Pension fund, 2 million shares", goal: "Let an expert floor broker decide when to offer and when to take liquidity, with no blame for missed prices.", answer: "notheld", others: ["market", "limit", "iceberg"], why: "Not held: the broker uses discretion and isn't accountable for failing to trade." },
  { who: "Michael, sell 90,000 Alcatel", goal: "Afraid that showing the full size would push the price down.", quote: "408 francs", answer: "iceberg", others: ["market", "stop", "moc"], why: "A display instruction shows 10,000 at a time; the rest waits in reserve." },
  { who: "Mutual fund desk", goal: "The fund is valued at closing prices. Trade at the close.", answer: "moc", others: ["market", "limit", "notheld"], why: "A market-on-close order fills only at the close; no guaranteed closing price though." },
];

export function OrderDesk({ onDone }: GameProps) {
  const deck = useMemo(() => shuffle(TICKETS).map((t) => ({ ...t, opts: shuffle([t.answer, ...t.others]) })), []);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Kind | null>(null);
  const [log, setLog] = useState<boolean[]>([]);
  const t = deck[i];
  const done = pick !== null;
  const score = log.filter(Boolean).length;

  const choose = (k: Kind) => {
    if (done) return;
    setPick(k);
    setLog((l) => [...l, k === t.answer]);
  };
  const next = () => {
    if (!done) return;
    if (i + 1 >= deck.length) {
      onDone({ score, max: deck.length });
      return;
    }
    setI(i + 1);
    setPick(null);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-4]$/.test(e.key) && !done) {
        e.preventDefault();
        e.stopPropagation();
        choose(t.opts[Number(e.key) - 1]);
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    // capture phase, so the lesson player's Enter key doesn't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const p = PROPS[t.answer];
  const ok = pick === t.answer;
  return (
    <div className="desk">
      <div className="desk-top">
        <span className="desk-title">
          <Headset size={15} strokeWidth={2.4} /> Order desk
        </span>
        <span className="desk-blotter" aria-label={`${score} right of ${log.length}`}>
          {deck.map((_, k) => (
            <span key={k} className={`desk-cell ${k < log.length ? (log[k] ? "ok" : "ko") : k === i ? "now" : ""}`} />
          ))}
        </span>
        <span className="desk-count">
          {i + 1}/{deck.length}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          className="desk-ticket"
          initial={{ opacity: 0, y: 14 }}
          animate={done && !ok ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.16, ease: EASE_OUT } }}
          transition={{ ...spring.soft, x: { duration: 0.32 } }}
        >
          <span className="desk-who">{t.who}</span>
          <p className="desk-goal">{t.goal}</p>
          {t.quote && <span className="desk-quote">{t.quote}</span>}
        </motion.div>
      </AnimatePresence>

      <div className="desk-opts">
        {t.opts.map((k, n) => {
          const st = done ? (k === t.answer ? "right" : k === pick ? "wrong" : "off") : "";
          // once answered, only the right answer (and a wrong pick) stay, so the explanation fits on a phone
          if (st === "off") return null;
          return (
            <button key={`${i}${k}`} type="button" className={`desk-opt ${st}`} onClick={() => choose(k)} disabled={done}>
              <Kbd>{n + 1}</Kbd>
              <span>{PROPS[k].name}</span>
              {st === "right" && <Check size={15} strokeWidth={3} />}
              {st === "wrong" && <X size={15} strokeWidth={3} />}
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {done && (
          <motion.div key={`fb${i}`} className={`desk-fb ${ok ? "ok" : "ko"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring.soft}>
            <p className="desk-why">
              <strong>{ok ? "Right." : `It's ${/^[aeiou]/i.test(p.name) ? "an" : "a"} ${p.name.toLowerCase()}.`}</strong> {t.why}
            </p>
            <div className="desk-props" aria-label={`${p.src}: ${p.name}`}>
              <span className="desk-src">
                {p.src} · {p.name}
              </span>
              <span className="desk-row">{p.effect}</span>
              <span className="desk-row plus">
                <Plus size={13} strokeWidth={3} /> {p.plus}
              </span>
              <span className="desk-row minus">
                <Minus size={13} strokeWidth={3} /> {p.minus}
              </span>
            </div>
            <button type="button" className="desk-next" onClick={next}>
              {i + 1 >= deck.length ? "Close the desk" : "Next ticket"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
