// Game: find and take a hidden (iceberg) order with fill-or-kill probes (§4.11.2, box "Undisclosed Order Example").
// A probe fills completely if that much is on offer (shown + hidden) and cancels otherwise, as §4.11.2 describes.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { clamp } from "../../../util.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u411.css";

const STEP = 5000;
const fmt = (n: number) => n.toLocaleString("en-US");

type Round = { name: string; intro: string; price: string; display: number; probes: number; min: number; max: number };

const ROUNDS: Round[] = [
  {
    name: "Michael's leftovers",
    intro: "Liza just bought 60,000 of Michael's 90,000 Alcatel shares. 10,000 still show at 408 francs. Take everything that's left.",
    price: "408 F",
    display: 10000,
    probes: 3,
    min: 30000,
    max: 30000,
  },
  {
    name: "A quiet seller",
    intro: "5,000 shown. The whole order is somewhere between 15,000 and 60,000 shares (our numbers). Take all of it.",
    price: "52.40",
    display: 5000,
    probes: 4,
    min: 15000,
    max: 60000,
  },
  {
    name: "A big seller",
    intro: "10,000 shown. The whole order is somewhere between 20,000 and 80,000 shares (our numbers). Take all of it.",
    price: "31.15",
    display: 10000,
    probes: 4,
    min: 20000,
    max: 80000,
  },
];

const pickTotal = (r: Round) => r.min + STEP * Math.floor(Math.random() * ((r.max - r.min) / STEP + 1));
const starsFor = (bought: number, total: number) => (bought >= total ? 3 : bought >= 0.75 * total ? 2 : bought >= 0.4 * total ? 1 : 0);

type Probe = { size: number; ok: boolean };

// geometry of the scene (viewBox 400 × 214)
const CX = 150;
const WL = 76;
const BODY_W = 156;
const DEPTH = 118;

function tipPath(w: number) {
  const h = 30;
  return `M${CX - w / 2},${WL} L${CX - w / 2 + 12},${WL - h} L${CX + w / 2 - 16},${WL - h + 5} L${CX + w / 2},${WL} Z`;
}
function bodyPath(d: number) {
  const w = BODY_W;
  const t = WL + 4;
  return `M${CX - w / 2},${t} L${CX + w / 2},${t} L${CX + w / 2 - 14},${t + d * 0.55} L${CX + w / 2 - 36},${t + d} L${CX - w / 2 + 26},${t + d} L${CX - w / 2 + 6},${t + d * 0.5} Z`;
}

export function IcebergHunter({ onDone }: GameProps) {
  const [r, setR] = useState(0);
  const round = ROUNDS[r];
  const [total, setTotal] = useState(() => pickTotal(ROUNDS[0]));
  const [bought, setBought] = useState(0);
  const [upper, setUpper] = useState(ROUNDS[0].max);
  const [probes, setProbes] = useState<Probe[]>([]);
  const [size, setSize] = useState(ROUNDS[0].display);
  const [score, setScore] = useState(0);

  const rest = total - bought;
  const tip = Math.min(round.display, rest);
  const over = rest === 0 || probes.length >= round.probes;
  const stars = starsFor(bought, total);
  const last = probes[probes.length - 1];
  const scale = DEPTH / round.max;
  // less than the display maximum on show means the reserve is empty
  const lastSlice = rest > 0 && tip < round.display;
  const maxHidden = lastSlice ? 0 : Math.max(0, upper - tip);

  const send = () => {
    if (over) return;
    const ok = size <= rest;
    const next = [...probes, { size, ok }];
    setProbes(next);
    if (ok) {
      setBought((b) => b + size);
      setUpper((u) => u - size);
    } else setUpper((u) => Math.min(u, size - STEP));
    const nowRest = ok ? rest - size : rest;
    if (nowRest === 0 || next.length >= round.probes) setScore((s) => s + starsFor(total - nowRest, total));
  };

  const nextRound = () => {
    if (!over) return;
    if (r + 1 >= ROUNDS.length) {
      onDone({ score, max: ROUNDS.length * 3 });
      return;
    }
    const nr = ROUNDS[r + 1];
    setR(r + 1);
    setTotal(pickTotal(nr));
    setBought(0);
    setUpper(nr.max);
    setProbes([]);
    setSize(nr.display);
  };

  const nudge = (d: number) => !over && setSize((s) => clamp(s + d, STEP, 100000));

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        nudge(STEP);
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        nudge(-STEP);
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (over) nextRound();
        else send();
      }
    };
    // capture phase, so the lesson player's arrow and Enter keys don't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const tipW = rest > 0 ? 44 + (96 * tip) / round.display : 30;
  const gaugeH = 150;
  return (
    <div className="ice">
      <div className="ice-head">
        <span className="ice-round">
          Round {r + 1}/{ROUNDS.length} · {round.name}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={r} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
            {round.intro}
          </motion.p>
        </AnimatePresence>
      </div>

      <svg viewBox="0 0 400 214" className="stage ice-scene" role="img" aria-label={`Offer at ${round.price}: ${fmt(tip)} shares shown. You bought ${fmt(bought)}.`}>
        <rect width={400} height={214} rx={16} fill="var(--scene-bg)" />
        <rect x={0} y={WL} width={400} height={214 - WL} fill="var(--see-soft)" opacity={0.8} />
        <line x1={0} x2={400} y1={WL} y2={WL} stroke="var(--see)" strokeWidth={1.75} />
        <text x={14} y={24} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ask)">
          OFFER @ {round.price}
        </text>

        {/* what nobody can see: the possible reserve while playing, the real one once the round is over */}
        <motion.path
          initial={false}
          animate={{ d: bodyPath(Math.max(6, (over ? rest - tip : maxHidden) * scale)), opacity: over && rest - tip <= 0 ? 0 : 1 }}
          transition={spring.soft}
          fill="var(--ask-soft)"
          stroke="var(--ask)"
          strokeWidth={1.75}
          strokeDasharray={over ? undefined : "5 4"}
          style={{ fillOpacity: over ? 0.95 : 0.45 }}
        />
        <text x={CX} y={WL + 4 + Math.max(24, (over ? rest - tip : maxHidden) * scale) / 2 + 6} textAnchor="middle" className="sc-num" style={{ fontSize: over ? 13 : 22, fontWeight: 800 }} fill="var(--ask-ink)">
          {over ? (rest - tip > 0 ? `${fmt(rest - tip)} hidden` : "") : maxHidden > 0 ? "?" : ""}
        </text>

        <motion.path
          initial={false}
          animate={{ d: tipPath(tipW), opacity: rest > 0 ? 1 : 0 }}
          transition={spring.soft}
          fill="var(--ask)"
        />
        <text x={CX} y={WL - 10} textAnchor="middle" className="sc-num" style={{ fontSize: 12.5, fontWeight: 800 }} fill="#fff" opacity={rest > 0 ? 1 : 0}>
          {fmt(tip)}
        </text>
        {rest === 0 && (
          <motion.text x={CX} y={WL - 14} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill="var(--good-ink)" initial={{ opacity: 0, y: WL - 6 }} animate={{ opacity: 1, y: WL - 14 }}>
            Offer gone: you took it all
          </motion.text>
        )}

        {last && (
          <motion.circle
            key={`ping${probes.length}`}
            cx={CX}
            cy={WL - 10}
            fill="none"
            stroke={last.ok ? "var(--good)" : "var(--bad)"}
            strokeWidth={2.5}
            initial={{ r: 18, opacity: 0.9 }}
            animate={{ r: 46, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          />
        )}

        {/* the trader's own position */}
        <text x={346} y={24} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10, fontWeight: 800 }} fill="var(--bid)">
          YOU BOUGHT
        </text>
        <rect x={330} y={40} width={32} height={gaugeH} rx={8} fill="var(--scene-grid)" />
        <motion.rect x={330} width={32} rx={8} fill="var(--bid)" initial={false} animate={{ y: 40 + gaugeH - (bought / round.max) * gaugeH, height: (bought / round.max) * gaugeH }} transition={spring.fill} />
        <text x={346} y={206} textAnchor="middle" className="sc-num" style={{ fontSize: 12.5, fontWeight: 800 }} fill="var(--bid)">
          {fmt(bought)}
        </text>
      </svg>

      <div className="ice-bounds" aria-live="polite">
        {over ? (
          <span>
            The order held <strong>{fmt(total)}</strong>. You took <strong>{fmt(bought)}</strong>.
          </span>
        ) : lastSlice ? (
          <span>
            Less than the display maximum shows: <strong>nothing is hidden</strong> any more.
          </span>
        ) : (
          <span>
            Left on offer: at least <strong>{fmt(tip)}</strong>
            {upper < 100000 && upper >= tip ? (
              <>
                , at most <strong>{fmt(upper)}</strong>
              </>
            ) : null}
            .
          </span>
        )}
        <span className="ice-probes" aria-label={`${round.probes - probes.length} probes left`}>
          {Array.from({ length: round.probes }, (_, i) => (
            <span key={i} className={`ice-dot ${i < probes.length ? (probes[i].ok ? "ok" : "ko") : ""}`} />
          ))}
        </span>
      </div>

      {probes.length > 0 && (
        <div className="ice-log">
          {probes.map((p, i) => (
            <motion.span key={i} className={`ice-chip ${p.ok ? "ok" : "ko"}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={spring.ui}>
              {p.ok ? <Check size={13} strokeWidth={3} /> : <X size={13} strokeWidth={3} />}
              {fmt(p.size)} {p.ok ? "filled" : "canceled"}
            </motion.span>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {!over ? (
          <motion.div key="play" className="ice-ctrl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="ice-size">
              <button type="button" onClick={() => nudge(-10000)} aria-label="Minus 10,000">
                <Minus size={14} />
                10k
              </button>
              <button type="button" onClick={() => nudge(-STEP)} aria-label="Minus 5,000">
                <Minus size={14} />
                5k
              </button>
              <output className="ice-qty" aria-label="Probe size">
                {fmt(size)}
              </output>
              <button type="button" onClick={() => nudge(STEP)} aria-label="Plus 5,000">
                <Plus size={14} />
                5k
              </button>
              <button type="button" onClick={() => nudge(10000)} aria-label="Plus 10,000">
                <Plus size={14} />
                10k
              </button>
            </div>
            <button type="button" className="ice-go" onClick={send}>
              Buy {fmt(size)} · fill-or-kill <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        ) : (
          <motion.div key="end" className={`ice-fb ${stars === 3 ? "ok" : stars === 0 ? "ko" : "mid"}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span>
              {stars === 3 ? <Check size={16} strokeWidth={3} /> : null}
              {stars === 3 ? "The whole iceberg. +3" : `${Math.round((100 * bought) / total)}% of the order. +${stars}`}
            </span>
            <button type="button" onClick={nextRound}>
              {r + 1 >= ROUNDS.length ? "Finish" : "Next round"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
