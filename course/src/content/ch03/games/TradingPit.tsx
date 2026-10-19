// Game: trade a moving price long and short. Teaches §3.1 long / short / cover by doing.
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUp, Check, Circle } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { money, signedMoney } from "../../../util.ts";
import "./games.css";

const N = 120;
const TICK_MS = 140;
const PMIN = 40;
const PMAX = 62;
const W = 400;
const H = 190;
const X0 = 38;
const X1 = 392;
const Y0 = 176;
const Y1 = 12;
const SIZE = 100;

const xt = (t: number) => X0 + ((X1 - X0) * t) / N;
const yp = (p: number) => Y0 - ((p - PMIN) / (PMAX - PMIN)) * (Y0 - Y1);

function genPath(): number[] {
  // up, down, up again, with a little noise so each play differs
  const knots: [number, number][] = [
    [0, 50],
    [38 + Math.random() * 6, 57 + Math.random() * 2],
    [78 + Math.random() * 6, 44 + Math.random() * 2],
    [N, 51 + Math.random() * 3],
  ];
  const out: number[] = [];
  let noise = 0;
  for (let t = 0; t <= N; t++) {
    let k = 0;
    while (k < knots.length - 2 && t > knots[k + 1][0]) k++;
    const [ta, pa] = knots[k];
    const [tb, pb] = knots[k + 1];
    const u = (t - ta) / (tb - ta);
    const s = u * u * (3 - 2 * u);
    noise = noise * 0.8 + (Math.random() - 0.5) * 0.7;
    out.push(Math.round((pa + (pb - pa) * s + noise) * 100) / 100);
  }
  return out;
}

type Trade = { t: number; p: number; side: "buy" | "sell" };

export function TradingPit({ onDone }: GameProps) {
  const path = useMemo(genPath, []);
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  const start = useRef<number | null>(null);
  const [pos, setPos] = useState(0);
  const [entry, setEntry] = useState(0);
  const [realized, setRealized] = useState(0);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [wins, setWins] = useState({ long: false, short: false });
  const done = useRef(false);

  useAnimationFrame((time) => {
    if (done.current) return;
    if (start.current === null) start.current = time;
    const nt = Math.min(N, (time - start.current) / TICK_MS);
    setT(nt);
  });

  const i = Math.floor(t);
  const price = i >= N ? path[N] : path[i] + (path[i + 1] - path[i]) * (t - i);
  const open = pos === 0 ? 0 : (price - entry) * pos;

  const act = (side: "buy" | "sell") => {
    if (done.current) return;
    const p = Math.round(price * 100) / 100;
    if (side === "buy" && pos < SIZE) {
      if (pos === 0) {
        setPos(SIZE);
        setEntry(p);
      } else {
        const gain = (entry - p) * SIZE;
        setRealized((r) => r + gain);
        if (gain > 0) setWins((w) => ({ ...w, short: true }));
        setPos(0);
      }
      setTrades((tr) => [...tr, { t, p, side }]);
    }
    if (side === "sell" && pos > -SIZE) {
      if (pos === 0) {
        setPos(-SIZE);
        setEntry(p);
      } else {
        const gain = (p - entry) * SIZE;
        setRealized((r) => r + gain);
        if (gain > 0) setWins((w) => ({ ...w, long: true }));
        setPos(0);
      }
      setTrades((tr) => [...tr, { t, p, side }]);
    }
  };

  // the bell: close any open position at the last price and score the missions
  useEffect(() => {
    if (t < N || done.current) return;
    done.current = true;
    let total = realized;
    const w = { ...wins };
    if (pos !== 0) {
      const gain = (path[N] - entry) * pos;
      total += gain;
      if (gain > 0) w[pos > 0 ? "long" : "short"] = true;
    }
    const score = (w.long ? 1 : 0) + (w.short ? 1 : 0) + (total >= 500 ? 1 : 0);
    const id = setTimeout(() => onDone({ score, max: 3 }), 700);
    return () => clearTimeout(id);
  }, [t, realized, wins, pos, entry, path, onDone]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "b" || e.key === "B") act("buy");
      if (e.key === "s" || e.key === "S") act("sell");
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  const pts: string[] = [];
  for (let k = 0; k <= i && k <= N; k++) pts.push(`${xt(k).toFixed(1)},${yp(path[k]).toFixed(1)}`);
  if (i < N) pts.push(`${xt(t).toFixed(1)},${yp(price).toFixed(1)}`);
  const total = realized + open;
  const secs = Math.ceil(((N - t) * TICK_MS) / 1000);

  return (
    <div className="pit">
      <div className="pit-top">
        <span className={`pit-pos ${pos > 0 ? "long" : pos < 0 ? "short" : ""}`}>
          {pos > 0 ? "LONG 100" : pos < 0 ? "SHORT 100" : "FLAT"}
        </span>
        <span className="pit-price">{money(price, 2)}</span>
        <span className="pit-time">{secs}s</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage pit-chart" role="img" aria-label="Live price chart">
        <rect width={W} height={H} rx={14} fill="var(--scene-bg)" />
        {[42, 46, 50, 54, 58, 62].map((p) => (
          <g key={p}>
            <line x1={X0} x2={X1} y1={yp(p)} y2={yp(p)} className="sc-grid" />
            <text x={X0 - 6} y={yp(p) + 4} textAnchor="end" className="sc-tick">
              {p}
            </text>
          </g>
        ))}
        {pos !== 0 && (
          <line x1={X0} x2={X1} y1={yp(entry)} y2={yp(entry)} stroke={pos > 0 ? "var(--good)" : "var(--bad)"} strokeDasharray="4 4" />
        )}
        <polyline points={pts.join(" ")} fill="none" stroke="var(--ink)" strokeWidth={2.2} strokeLinejoin="round" />
        {trades.map((tr, k) => (
          <motion.g key={k} initial={reduce ? false : { opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} style={{ originX: `${xt(tr.t)}px`, originY: `${yp(tr.p)}px` }}>
            <circle cx={xt(tr.t)} cy={yp(tr.p)} r={6} fill={tr.side === "buy" ? "var(--good)" : "var(--bad)"} stroke="var(--scene-bg)" strokeWidth={2} />
          </motion.g>
        ))}
        <circle cx={xt(Math.min(t, N))} cy={yp(price)} r={4} fill="var(--ink)" />
      </svg>
      <div className="pit-pnl">
        <span>
          Open <strong className={open > 0 ? "pos" : open < 0 ? "neg" : ""}>{signedMoney(Math.round(open))}</strong>
        </span>
        <span>
          Total <strong className={total > 0 ? "pos" : total < 0 ? "neg" : ""}>{signedMoney(Math.round(total))}</strong>
        </span>
      </div>
      <div className="pit-btns">
        <button type="button" className="pit-btn buy" onClick={() => act("buy")} disabled={pos >= SIZE || t >= N}>
          <ArrowUp size={18} /> {pos < 0 ? "Buy back (cover)" : "Buy 100"} <Kbd>B</Kbd>
        </button>
        <button type="button" className="pit-btn sell" onClick={() => act("sell")} disabled={pos <= -SIZE || t >= N}>
          <ArrowDown size={18} /> {pos > 0 ? "Sell 100" : "Sell short 100"} <Kbd>S</Kbd>
        </button>
      </div>
      <ul className="pit-missions">
        {[
          [wins.long, "Profit on a long: buy low, then sell high"],
          [wins.short, "Profit on a short: sell high, then buy back low"],
          [total >= 500 && (t >= N || pos === 0), "End with at least +$500"],
        ].map(([ok, text], k) => (
          <li key={k} className={ok ? "ok" : ""}>
            {ok ? <Check size={16} strokeWidth={3} /> : <Circle size={16} />} {text as string}
          </li>
        ))}
      </ul>
    </div>
  );
}
