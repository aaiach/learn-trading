// Game: read and write OPRA equity option symbols with Tables 5-4 and 5-5 at hand (pp. 99–100):
// root + one letter for type and expiration month + one letter for the strike price.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd, Rich } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u54a.css";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CALLS = "ABCDEFGHIJKL".split("");
const PUTS = "MNOPQRSTUVWX".split("");
const STRIKES = "ABCDEFGHIJKLMNOPQRST".split(""); // 5, 10, … 100 (also +100 and +200)
const HALVES = [
  ["U", "7.5"],
  ["V", "12.5"],
  ["W", "17.5"],
  ["X", "22.5"],
  ["Y", "27.5"],
];

/** Strike code for a strike that is a multiple of 5 (Table 5-5). */
const strikeCode = (v: number) => STRIKES[(v % 100 || 100) / 5 - 1];
const typeCode = (type: "call" | "put", m: number) => (type === "call" ? CALLS[m] : PUTS[m]);

type Und = { root: string; name: string; near: number; strikes: number[] };
const IBM: Und = { root: "IBM", name: "IBM", near: 100, strikes: [90, 95, 100, 105, 110] };
const MSQ: Und = { root: "MSQ", name: "Microsoft", near: 50, strikes: [40, 45, 50, 55, 60] };

type Round = { prompt: string; sym?: string; options: string[]; answer: number; why: string };

const ordered = (right: string, wrong: string[]) => {
  const options = shuffle([right, ...wrong]);
  return { options, answer: options.indexOf(right) };
};
const rnd = (n: number) => Math.floor(Math.random() * n);
const flip = (t: "call" | "put") => (t === "call" ? "put" : "call");
const whyOf = (u: Und, m: number, t: "call" | "put", v: number) =>
  `${u.root} = ${u.name}; ${typeCode(t, m)} = ${MONTHS[m]} ${t} (${t === "call" ? "calls A–L" : "puts M–X"}); ${strikeCode(v)} = ${v} (A–T count up by 5; ${u.name} trades near ${u.near}).`;

function decode(u: Und): Round {
  const m = rnd(12);
  const t = Math.random() < 0.5 ? "call" : "put";
  const k = 1 + rnd(3);
  const v = u.strikes[k];
  const say = (mm: number, tt: "call" | "put", vv: number) => `${u.name} ${MONTHS[mm]} ${vv} ${tt}`;
  return {
    prompt: `Root **${u.root}** is ${u.name}, trading near ${u.near}. What is this option?`,
    sym: u.root + typeCode(t, m) + strikeCode(v),
    ...ordered(say(m, t, v), [say(m, flip(t), v), say((m + 1) % 12, t, v), say(m, t, u.strikes[k + (Math.random() < 0.5 ? 1 : -1)])]),
    why: whyOf(u, m, t, v),
  };
}

function encode(u: Und): Round {
  const m = rnd(12);
  const t = Math.random() < 0.5 ? "call" : "put";
  const k = 1 + rnd(3);
  const v = u.strikes[k];
  const sym = (mm: number, tt: "call" | "put", vv: number) => u.root + typeCode(tt, mm) + strikeCode(vv);
  return {
    prompt: `Write the symbol for the **${u.name} ${MONTHS[m]} ${v} ${t}** (root ${u.root}).`,
    ...ordered(sym(m, t, v), [sym(m, flip(t), v), sym((m + 11) % 12, t, v), sym(m, t, u.strikes[k + 1])]),
    why: whyOf(u, m, t, v),
  };
}

// Three rounds are the book's own examples (box "Some Equity Option Ticker Symbol Examples", p. 99).
function makeRounds(): Round[] {
  return [
    {
      prompt: "Root **MSQ** is Microsoft, trading near 50. What is this option?",
      sym: "MSQVJ",
      ...ordered("Microsoft October 50 put", ["Microsoft October 50 call", "Microsoft September 50 put", "Microsoft October 45 put"]),
      why: "MSQ = Microsoft; V = October put (puts M–X); J = 50. One of the book's examples.",
    },
    decode(IBM),
    {
      prompt: "Root **T** is AT&T, trading near 17.5. What is this option?",
      sym: "TJW",
      ...ordered("AT&T October 17.5 call", ["AT&T October 17.5 put", "AT&T November 17.5 call", "AT&T October 12.5 call"]),
      why: "T = AT&T; J = October call (calls A–L); W = 17.5 (U–Y hold the half strikes). One of the book's examples.",
    },
    encode(MSQ),
    decode(MSQ),
    {
      prompt: "Microsoft has several roots. With root **MQF**, write the **April 45 call**.",
      ...ordered("MQFDI", ["MQFPI", "MQFEI", "MQFDH"]),
      why: "MQF + D (April call) + I (45) = MQFDI. One of the book's examples.",
    },
    decode(IBM),
    encode(IBM),
  ];
}

function Reference() {
  return (
    <div className="oc-ref" aria-label="Tables 5-4 and 5-5">
      <div className="oc-months">
        <span className="oc-h oc-wide">Table 5-4 · type and month</span>
        <span />
        {MONTHS.map((m, i) => (
          <span key={i} className="oc-mh">
            {m[0]}
          </span>
        ))}
        <span className="oc-h">calls</span>
        {CALLS.map((c) => (
          <span key={c} className="oc-c">
            {c}
          </span>
        ))}
        <span className="oc-h">puts</span>
        {PUTS.map((c) => (
          <span key={c} className="oc-c">
            {c}
          </span>
        ))}
      </div>
      <div className="oc-strikes">
        <span className="oc-h oc-wide">Table 5-5 · strike</span>
        {STRIKES.map((c, i) => (
          <span key={c} className="oc-s">
            <b>{c}</b>
            {(i + 1) * 5}
          </span>
        ))}
        {HALVES.map(([c, v]) => (
          <span key={c} className="oc-s">
            <b>{c}</b>
            {v}
          </span>
        ))}
      </div>
      <p className="oc-note">A letter also means +100 or +200 (A = 5, 105 or 205): pick the strike near the stock's price.</p>
    </div>
  );
}

export function OptionCode({ onDone }: GameProps) {
  const rounds = useMemo(makeRounds, []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const finished = useRef(false);
  const done = i >= rounds.length;
  const r = rounds[Math.min(i, rounds.length - 1)];

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: rounds.length }), 500);
    return () => clearTimeout(id);
  }, [done, score, rounds.length, onDone]);

  const choose = (k: number) => {
    if (pick !== null || done) return;
    const ok = k === r.answer;
    setPick(k);
    if (ok) setScore((s) => s + 1);
    setTimeout(
      () => {
        setPick(null);
        setI((x) => x + 1);
      },
      ok ? 900 : 3000,
    );
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        choose(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const wrong = pick !== null && pick !== r.answer;
  return (
    <div className="g54">
      <div className="g54-top">
        <span className="g54-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <span className="g54-count">
          {Math.min(i + 1, rounds.length)}/{rounds.length}
        </span>
      </div>
      <Reference />
      <AnimatePresence mode="popLayout" initial={false}>
        {!done ? (
          <motion.div
            key={i}
            className="g54-card"
            initial={{ opacity: 0, y: 12 }}
            animate={wrong ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.16, ease: EASE_OUT } }}
            transition={{ ...spring.soft, x: { duration: 0.32 } }}
          >
            {r.sym && (
              <div className="g54-sym" aria-label={`Symbol ${r.sym}`}>
                {r.sym.split("").map((ch, k) => (
                  <span key={k}>{ch}</span>
                ))}
              </div>
            )}
            <p className="g54-q">
              <Rich text={r.prompt} />
            </p>
            <div className="g54-opts">
              {r.options.map((o, k) => {
                const st = pick === null ? "" : k === r.answer ? "right" : k === pick ? "wrong" : "off";
                return (
                  <button key={o} type="button" className={`g54-opt ${st} ${r.sym ? "" : "mono"}`} onClick={() => choose(k)} disabled={pick !== null}>
                    <Kbd>{String(k + 1)}</Kbd>
                    <span>{o}</span>
                  </button>
                );
              })}
            </div>
            {wrong && <p className="g54-why">{r.why}</p>}
          </motion.div>
        ) : (
          <motion.div key="end" className="g54-card g54-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Done!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
