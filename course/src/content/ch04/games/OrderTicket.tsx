// Game: turn a trader's plain-words intent into an order ticket, one field at a time (§4.1).
// Every trader and every number comes from the book's examples (pp. 69, 70, 71, 78, 79).
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight, Check, UserRound, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { spring, EASE_OUT } from "../../../motion/tokens.ts";
import "./u41.css";

type Field = { key: string; label: string; options: string[]; answer: number; why: string };
type Round = { who: string; page: number; intent: string; instrument: string; fields: Field[]; ticket: string };

const SIDE = (answer: 0 | 1, why: string): Field => ({ key: "side", label: "Side", options: ["Buy", "Sell"], answer, why });

const ROUNDS: Round[] = [
  {
    who: "Harry",
    page: 69,
    intent: "Harry wants to sell 7,600 shares of Exxon Mobil at no less than $41.05 a share, but only during the current trading session, and only if he can trade the entire quantity at once.",
    instrument: "XOM",
    fields: [
      SIDE(1, "He wants to sell."),
      { key: "qty", label: "Quantity", options: ["760", "7,600", "76,000"], answer: 1, why: "7,600 shares." },
      { key: "price", label: "Price", options: ["Market", "Limit 41.05", "Stop 41.05"], answer: 1, why: "“No less than $41.05” is a limit price." },
      { key: "valid", label: "Valid", options: ["Day", "Until canceled"], answer: 0, why: "“Only during the current session” makes it a day order." },
      { key: "fill", label: "Fill", options: ["Partial fills okay", "All-or-nothing"], answer: 1, why: "“The entire quantity at once” means all-or-nothing." },
    ],
    ticket: "Sell 7,600 XOM, limit 41.05, day, all-or-nothing",
  },
  {
    who: "Joe",
    page: 70,
    intent: "Joe will buy 100 shares of IBM for no more than $100 a share, from the first person to contact him before trading closes today.",
    instrument: "IBM",
    fields: [
      SIDE(0, "He wants to buy."),
      { key: "qty", label: "Quantity", options: ["10", "100", "1,000"], answer: 1, why: "100 shares." },
      { key: "price", label: "Price", options: ["Market", "Stop 100", "Limit 100"], answer: 2, why: "“No more than $100” is a limit price." },
      { key: "valid", label: "Valid", options: ["Day", "Until canceled"], answer: 0, why: "Valid only until trading closes today: a day order." },
    ],
    ticket: "Buy 100 IBM, limit 100, day",
  },
  {
    who: "Bill",
    page: 71,
    intent: "AstroPower is quoted 36.80 bid, 36.85 offered. Bill wants 200 shares right now, at the best price available.",
    instrument: "APWR",
    fields: [
      SIDE(0, "He wants to buy."),
      { key: "qty", label: "Quantity", options: ["200", "400", "500"], answer: 0, why: "200 shares. 400 and 500 are the quote sizes." },
      { key: "price", label: "Price", options: ["Limit 36.80", "Market", "Stop 36.85"], answer: 1, why: "“Right now, at the best price available” is a market order." },
    ],
    ticket: "Buy 200 APWR at market",
  },
  {
    who: "Sandy",
    page: 78,
    intent: "Sandy wants to buy five July sugar futures contracts if their price drops to 10 cents a pound. Her broker will watch the market for her.",
    instrument: "July sugar",
    fields: [
      SIDE(0, "She wants to buy."),
      { key: "qty", label: "Quantity", options: ["5", "50", "500"], answer: 0, why: "Five contracts." },
      { key: "price", label: "Price", options: ["Market", "Limit 10¢", "Stop 10¢"], answer: 1, why: "Buying only if the price drops to 10¢ is a limit buy. A buy stop waits for a rise." },
    ],
    ticket: "Buy 5 July sugar, limit 10¢",
  },
  {
    who: "You",
    page: 79,
    intent: "You would buy 100 shares of Ashton Technology Group only if its price rises to $10, and then only if you can buy it for less than $10.37.",
    instrument: "ASTN",
    fields: [
      SIDE(0, "You want to buy."),
      { key: "qty", label: "Quantity", options: ["10", "100", "1,037"], answer: 1, why: "100 shares." },
      { key: "price", label: "Price", options: ["Limit 10.37", "Stop 10", "10 stop, 10.37 limit", "Market"], answer: 2, why: "Two prices: the stop (10) says when, the limit (10.37) says the terms." },
    ],
    ticket: "Buy 100 ASTN, 10 stop, 10.37 limit",
  },
];

const MAX = ROUNDS.reduce((n, r) => n + r.fields.length, 0);

export function OrderTicket({ onDone }: GameProps) {
  const [r, setR] = useState(0);
  const [f, setF] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const lock = useRef(false);
  const round = ROUNDS[r];
  const done = f >= round.fields.length;
  const field = round.fields[Math.min(f, round.fields.length - 1)];

  const pick = (k: number) => {
    if (done || lock.current || k >= field.options.length) return;
    lock.current = true;
    const ok = k === field.answer;
    if (ok) setScore((s) => s + 1);
    else setWrong(k);
    // a wrong pick shows the right chip for a moment, then the right value fills the row
    setTimeout(
      () => {
        setPicked((p) => [...p, field.options[field.answer]]);
        setWrong(null);
        setF((x) => x + 1);
        lock.current = false;
      },
      ok ? 260 : 1500,
    );
  };

  const next = () => {
    if (!done) return;
    if (r + 1 >= ROUNDS.length) {
      onDone({ score, max: MAX });
      return;
    }
    setR(r + 1);
    setF(0);
    setPicked([]);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        pick(Number(e.key) - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    // capture phase, so the lesson player's Enter doesn't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  return (
    <div className="otk">
      <div className="otk-top">
        <span className="otk-round">
          Trader {r + 1}/{ROUNDS.length}
        </span>
        <span className="otk-score">
          <Check size={14} strokeWidth={3} /> {score}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={r}
          className="otk-body"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.15, ease: EASE_OUT } }}
          transition={spring.soft}
        >
          <figure className="otk-intent">
            <span className="otk-who">
              <UserRound size={15} /> {round.who} <small>· p. {round.page}</small>
            </span>
            <blockquote>{round.intent}</blockquote>
          </figure>

          <LayoutGroup id={`otk-${r}`}>
            <div className={`otk-ticket${done ? " done" : ""}`}>
              <div className="otk-ticket-head">ORDER TICKET</div>
              <Row label="Instrument" value={round.instrument} state="given" />
              {round.fields.map((fl, i) => (
                <Row
                  key={fl.key}
                  label={fl.label}
                  value={i < f ? picked[i] : undefined}
                  state={i < f ? "filled" : i === f ? "current" : "empty"}
                  layoutId={`${r}-${fl.key}`}
                />
              ))}
              <AnimatePresence>
                {done && (
                  <motion.div
                    className="otk-stamp"
                    initial={{ opacity: 0, scale: 1.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: -4 }}
                    transition={spring.soft}
                  >
                    READY
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="otk-pick">
              <AnimatePresence mode="wait" initial={false}>
                {!done ? (
                  <motion.div
                    key={f}
                    className="otk-chips"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={spring.soft}
                  >
                    <p className="otk-ask">{field.label}?</p>
                    <div className={`otk-chip-row n${field.options.length}`}>
                      {field.options.map((o, k) => {
                        const st = wrong !== null ? (k === field.answer ? "right" : k === wrong ? "wrong" : "") : "";
                        return (
                          <motion.button
                            key={o}
                            type="button"
                            className={`otk-chip ${st}`}
                            onClick={() => pick(k)}
                            animate={st === "wrong" ? { x: [0, -6, 6, -3, 0] } : { x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Kbd>{k + 1}</Kbd>
                            {/* the right value travels from its chip into the ticket row */}
                            {k === field.answer && wrong === null ? (
                              <motion.span layoutId={`${r}-${field.key}`} className="otk-val">
                                {o}
                              </motion.span>
                            ) : (
                              <span className="otk-val">{o}</span>
                            )}
                            {st === "wrong" && <X size={14} strokeWidth={3} />}
                          </motion.button>
                        );
                      })}
                    </div>
                    {wrong !== null && (
                      <motion.p className="otk-why" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {field.why}
                      </motion.p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="done" className="otk-done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring.soft, delay: 0.25 }}>
                    <p className="otk-line">“{round.ticket}”</p>
                    <button type="button" className="otk-next" onClick={next} autoFocus>
                      {r + 1 >= ROUNDS.length ? "Finish" : "Next trader"} <ArrowRight size={16} /> <Kbd>Enter</Kbd>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value, state, layoutId }: { label: string; value?: string; state: "given" | "filled" | "current" | "empty"; layoutId?: string }) {
  return (
    <div className={`otk-row ${state}`}>
      <span className="otk-k">{label}</span>
      {value !== undefined ? (
        <motion.span layoutId={state === "filled" ? layoutId : undefined} className="otk-v" transition={spring.soft}>
          {value}
        </motion.span>
      ) : (
        <span className="otk-v otk-blank">{state === "current" ? "choose ↓" : "—"}</span>
      )}
    </div>
  );
}
