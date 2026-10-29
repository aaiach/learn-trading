// Game: read a clock in New York, Chicago or San Francisco and say where the NYSE's day is (§5.2.4).
// Everything is computed from the book's facts: the NYSE trades 9:30 a.m.–4 p.m. Eastern; the Chicago Stock
// Exchange's 8:30 a.m. Central and the Pacific Exchange's 6:30 a.m. Pacific opens fall at that same moment.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Check } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_IN_OUT, EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u52.css";

type City = { name: string; zone: string; off: number };
const NY: City = { name: "New York", zone: "ET", off: 0 };
const CHI: City = { name: "Chicago", zone: "CT", off: -60 };
const SF: City = { name: "San Francisco", zone: "PT", off: -180 };

const OPEN = 9 * 60 + 30;
const CLOSE = 16 * 60;

/** Minutes after midnight → "9:30 a.m.". */
function hm(m: number): string {
  const t = ((m % 1440) + 1440) % 1440;
  const h = Math.floor(t / 60);
  const mm = t % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`;
}

type Round = {
  /** Clock shown while the learner thinks. */
  show: { city: City; min: number };
  /** Clock shown once answered. */
  reveal: { city: City; min: number };
  prompt: string;
  options: string[];
  answer: number;
  why: string;
};

const STATES = ["Before the open", "Regular session", "After the close"];

function stateRound(city: City, et: number): Round {
  const local = et + city.off;
  const answer = et < OPEN ? 0 : et < CLOSE ? 1 : 2;
  const what = ["traders collect and submit orders", "the NYSE is trading", "traders settle trades and report to clients"][answer];
  return {
    show: { city, min: local },
    reveal: { city: NY, min: et },
    prompt: `It's ${hm(local)} in ${city.name}. Where is the NYSE's day?`,
    options: STATES,
    answer,
    why: city === NY ? `The NYSE trades 9:30 a.m.–4 p.m. ET: ${what}.` : `${hm(local)} ${city.zone} is ${hm(et)} ET: ${what}.`,
  };
}

function convertRound(prompt: string, from: City, fromMin: number, to: City, why: string): Round {
  const target = fromMin - from.off + to.off;
  // the usual slips: keeping the source time, or shifting the wrong way; plus one more nearby hour
  const slips = [fromMin, 2 * fromMin - target];
  const near = shuffle([-120, -60, 60, 120].map((d) => target + d).filter((m) => !slips.includes(m)));
  const opts = [target, ...slips, near[0]].sort((a, b) => a - b);
  return {
    show: { city: from, min: fromMin },
    reveal: { city: to, min: target },
    prompt,
    options: opts.map(hm),
    answer: opts.indexOf(target),
    why,
  };
}

// ET times for the "where is the day" rounds: none sits on 9:30 or 4:00 exactly.
const ET_TIMES = [7 * 60 + 40, 8 * 60 + 50, 9 * 60 + 10, 9 * 60 + 45, 10 * 60 + 30, 11 * 60 + 55, 13 * 60 + 15, 14 * 60 + 40, 15 * 60 + 35, 16 * 60 + 25, 17 * 60 + 10, 18 * 60 + 30];

function buildDeck(): Round[] {
  const cities = [NY, CHI, SF];
  const states = shuffle(ET_TIMES)
    .slice(0, 6)
    .map((et, i) => stateRound(cities[(i + Math.floor(Math.random() * 3)) % 3], et));
  const converts = shuffle([
    convertRound("The NYSE opens at 9:30 a.m. Eastern. What time is it in Chicago?", NY, OPEN, CHI, "Chicago is one hour behind New York: the Chicago Stock Exchange opens at 8:30 a.m. CT to match."),
    convertRound("The NYSE opens at 9:30 a.m. Eastern. What time is it in San Francisco?", NY, OPEN, SF, "Pacific Time is three hours behind: the Pacific Exchange opens at 6:30 a.m. PT to match."),
    convertRound("The Pacific Exchange opens at 6:30 a.m. Pacific. What time is it in New York?", SF, 6 * 60 + 30, NY, "It opens at that hour to coincide with the NYSE's 9:30 a.m. ET open."),
    convertRound("The Chicago Stock Exchange opens at 8:30 a.m. Central. What time is it in New York?", CHI, 8 * 60 + 30, NY, "It opens at that hour to coincide with the NYSE's 9:30 a.m. ET open."),
    convertRound("The NYSE closes at 4:00 p.m. Eastern. What time is it in Chicago?", NY, CLOSE, CHI, "One hour behind New York: 3:00 p.m. CT."),
    convertRound("The NYSE closes at 4:00 p.m. Eastern. What time is it in San Francisco?", NY, CLOSE, SF, "Three hours behind New York: 1:00 p.m. PT."),
  ]).slice(0, 4);
  return shuffle([...states, ...converts]);
}

export function MarketClock({ onDone }: GameProps) {
  const deck = useMemo(buildDeck, []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const finished = useRef(false);
  const done = i >= deck.length;
  const r = deck[Math.min(i, deck.length - 1)];
  const ok = pick !== null && pick === r.answer;

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: deck.length }), 500);
    return () => clearTimeout(id);
  }, [done, score, deck.length, onDone]);

  const choose = (k: number) => {
    if (pick !== null || done || k < 0 || k >= r.options.length) return;
    setPick(k);
    if (k === r.answer) setScore((s) => s + 1);
    setTimeout(
      () => {
        setPick(null);
        setI((x) => x + 1);
      },
      k === r.answer ? 1500 : 3000,
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

  const face = pick === null ? r.show : r.reveal;
  return (
    <div className="mclk">
      <div className="mclk-top">
        <span className="mclk-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="mclk-dots" aria-hidden>
          {deck.map((_, k) => (
            <span key={k} className={`mclk-dot ${k < i ? "past" : k === i ? "now" : ""}`} />
          ))}
        </div>
        <span className="mclk-count">
          {Math.min(i + 1, deck.length)}/{deck.length}
        </span>
      </div>

      {!done ? (
        <>
          <div className="mclk-face">
            <Clock key={i} min={face.min} />
            <div className="mclk-read">
              <span className="mclk-city">{face.city.name}</span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${face.city.name}-${face.min}`}
                  className="mclk-time"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
                  transition={spring.soft}
                >
                  {hm(face.min)} <small>{face.city.zone}</small>
                </motion.span>
              </AnimatePresence>
              <span className="mclk-hours">NYSE: 9:30 a.m.–4:00 p.m. ET</span>
            </div>
          </div>
          <motion.p
            key={`p${i}`}
            className="mclk-prompt"
            initial={{ opacity: 0, y: 8 }}
            animate={pick !== null && !ok ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
            transition={{ ...spring.soft, x: { duration: 0.32 } }}
          >
            {r.prompt}
          </motion.p>
          <div className={`mclk-opts n${r.options.length}`}>
            {r.options.map((o, k) => {
              const st = pick === null ? "" : k === r.answer ? "right" : k === pick ? "wrong" : "off";
              return (
                <button key={o} type="button" className={`mclk-opt ${st}`} onClick={() => choose(k)} disabled={pick !== null}>
                  <Kbd>{k + 1}</Kbd>
                  <span className="mclk-opt-t">{o}</span>
                </button>
              );
            })}
          </div>
          <div className="mclk-fb" aria-live="polite">
            <AnimatePresence initial={false}>
              {pick !== null && (
                <motion.p key={`f${i}`} className={ok ? "ok" : "ko"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.25, ease: EASE_OUT }}>
                  {ok ? "Right. " : "Not quite. "}
                  {r.why}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <motion.div className="mclk-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Done!
        </motion.div>
      )}
    </div>
  );
}

/** An analog clock. Changing `min` turns the hands forward or back through the hours between. */
function Clock({ min }: { min: number }) {
  const S = 132;
  const c = S / 2;
  const R = c - 6;
  return (
    <svg className="mclk-svg" viewBox={`0 0 ${S} ${S}`} width={S} height={S} aria-hidden>
      <circle cx={c} cy={c} r={R} className="mclk-rim" />
      {Array.from({ length: 12 }, (_, k) => {
        const t = (k * Math.PI) / 6;
        const inner = R - (k % 3 ? 8 : 12);
        return <line key={k} x1={c + (R - 4) * Math.sin(t)} y1={c - (R - 4) * Math.cos(t)} x2={c + inner * Math.sin(t)} y2={c - inner * Math.cos(t)} className={k % 3 ? "mclk-tick" : "mclk-tick big"} />;
      })}
      <Hand c={c} len={R - 14} deg={min * 6} cls="mclk-min" />
      <Hand c={c} len={R - 28} deg={min * 0.5} cls="mclk-hour" />
      <circle cx={c} cy={c} r={4.5} className="mclk-pin" />
    </svg>
  );
}

function Hand({ c, len, deg, cls }: { c: number; len: number; deg: number; cls: string }) {
  const reduce = useReducedMotion();
  const a = useMotionValue(deg);
  useEffect(() => {
    if (reduce) {
      a.set(deg);
      return;
    }
    const ctl = animate(a, deg, { duration: 1.1, ease: EASE_IN_OUT });
    return () => ctl.stop();
  }, [deg, a, reduce]);
  const x2 = useTransform(a, (v) => c + len * Math.sin((v * Math.PI) / 180));
  const y2 = useTransform(a, (v) => c - len * Math.cos((v * Math.PI) / 180));
  return <motion.line x1={c} y1={c} x2={x2} y2={y2} className={cls} />;
}
