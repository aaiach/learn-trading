// "See it" scenes for 4.1 What Are Orders, and Why Do People Use Them?
import { motion } from "motion/react";
import { Cpu, FileText, UserRound, Users, Landmark } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Node, Ping, Stage, Token, Txt, between, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";

// ── Harry's order, phrase by phrase (box "An Order Example", p. 69) ─────────
const PHRASES = [
  { lines: ["sell 7,600 shares"], beat: 0 },
  { lines: ["of Exxon Mobil (XOM)"], beat: 0 },
  { lines: ["at no less than $41.05"], beat: 1 },
  { lines: ["only during the", "current session"], beat: 2 },
  { lines: ["only the entire", "quantity at once"], beat: 3 },
];

const ROWS = [
  { k: "SIDE", v: "SELL", beat: 0 },
  { k: "QUANTITY", v: "7,600", beat: 0 },
  { k: "INSTRUMENT", v: "XOM", beat: 0 },
  { k: "PRICE", v: "LIMIT 41.05", beat: 1 },
  { k: "VALID", v: "DAY", beat: 2 },
  { k: "FILL", v: "ALL-OR-NOTHING", beat: 3 },
];

export function HarryTicket({ beat }: BeatProps) {
  const TX = 196;
  const TW = 192;
  const RY = 76;
  const RH = 26;
  const TB = RY + ROWS.length * RH - RH / 2 + 34; // ticket bottom, with room for the footer
  let py = 66;
  return (
    <Stage h={TB + 14} label="Harry's intentions turned into an order ticket">
      <Txt x={16} y={26} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        WHAT HARRY WANTS
      </Txt>
      {PHRASES.map((ph, i) => {
        const y = py;
        py += ph.lines.length * 17 + 14;
        const now = beat === ph.beat || beat === 4;
        const on = beat >= ph.beat;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: now ? 1 : on ? 0.55 : 0.3 }} transition={{ duration: 0.3 }}>
            <motion.rect
              x={10}
              y={y - 15}
              width={172}
              height={ph.lines.length * 17 + 7}
              rx={8}
              initial={false}
              animate={{ opacity: beat === ph.beat ? 1 : 0 }}
              fill={toneSoft("def")}
              stroke={toneVar("def")}
              strokeWidth={1.25}
            />
            {ph.lines.map((l, j) => (
              <text key={j} x={18} y={y + j * 17} className="sc-txt" style={{ fontSize: 13.5, fontWeight: now ? 750 : 600 }} fill="var(--ink)">
                {l}
              </text>
            ))}
          </motion.g>
        );
      })}

      <motion.rect
        x={TX}
        y={38}
        width={TW}
        height={TB - 38}
        rx={14}
        fill="var(--node)"
        initial={false}
        animate={{ strokeWidth: beat === 4 ? 2 : 1.25 }}
        stroke={beat === 4 ? toneVar("see") : "var(--node-line)"}
      />
      <rect x={TX} y={38} width={TW} height={26} rx={14} fill={toneSoft("prac")} />
      <rect x={TX} y={52} width={TW} height={12} fill={toneSoft("prac")} />
      <text x={TX + 14} y={56} className="sc-txt" style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em" }} fill={toneVar("prac")}>
        ORDER TICKET
      </text>
      {/* the three things every order specifies */}
      <motion.rect
        x={TX + 6}
        y={RY - RH / 2 + 4}
        width={TW - 12}
        height={3 * RH - 2}
        rx={8}
        initial={false}
        animate={{ opacity: beat === 0 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        fill={toneSoft("def")}
        stroke={toneVar("def")}
        strokeWidth={1.25}
      />
      {ROWS.map((r, i) => {
        const y = RY + i * RH;
        const on = beat >= r.beat;
        const now = beat === r.beat;
        return (
          <g key={r.k}>
            {i > 0 && <line x1={TX + 12} x2={TX + TW - 12} y1={y - RH / 2 + 3} y2={y - RH / 2 + 3} stroke="var(--line)" strokeWidth={1} />}
            <text x={TX + 14} y={y + 7} className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.06em" }} fill="var(--ink-3)">
              {r.k}
            </text>
            <motion.text
              x={TX + TW - 14}
              y={y + 7}
              textAnchor="end"
              className="sc-txt"
              style={{ fontSize: 13, fontWeight: 800 }}
              fill={now && beat < 4 ? toneVar("def") : "var(--ink)"}
              initial={false}
              animate={{ opacity: on ? 1 : 0, x: on ? 0 : 8 }}
              transition={{ ...spring.soft, opacity: { duration: 0.3, delay: now ? 0.15 : 0 } }}
            >
              {r.v}
            </motion.text>
          </g>
        );
      })}
      {/* footer: the ticket is complete */}
      <motion.g initial={false} animate={{ opacity: beat === 4 ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === 4 ? 0.2 : 0 }}>
        <rect x={TX + 1} y={TB - 30} width={TW - 2} height={29} rx={13} fill={toneSoft("see")} />
        <rect x={TX + 1} y={TB - 30} width={TW - 2} height={14} fill={toneSoft("see")} />
        <text x={TX + TW / 2} y={TB - 11} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 850, letterSpacing: "0.1em" }} fill={toneVar("see")}>
          ✓ READY TO SEND
        </text>
      </motion.g>
    </Stage>
  );
}

// ── Cancel too late: why slow order writers lose (p. 69) ────────────────────
const box = (x: number, y: number, w = 104, h = 56): Box => ({ x, y, w, h });

export function CancelRace({ beat }: BeatProps) {
  const fast = beat >= 3;
  const you = box(68, 62);
  const other = box(332, 62);
  const mkt = box(200, 160, 124, 60);
  const cancel = between(you, mkt, 0, 6, 34);
  const sell = between(other, mkt, 0, 6, 40);
  const price = beat >= 1 ? "46" : "50";
  return (
    <Stage h={252} label="A slow cancel loses the race to a trade">
      <Node {...you} icon={fast ? Cpu : UserRound} label={fast ? "Computer" : "You"} sub={fast ? "watches for you" : "away from screen"} hl={beat === 0 || beat === 3} tone="see" />
      <Node {...other} icon={Users} label="Other trader" sub="watching" dim={beat === 0} />
      <Node {...mkt} icon={Landmark} label="Market" sub={`value now ${price}`} hl={beat === 1} tone="prac" />
      <Ping x={mkt.x} y={mkt.y} trigger={beat === 1 ? "news" : "none"} tone="prac" r={44} />
      <Txt x={200} y={114} size={12} weight={800} tone="prac" show={beat === 1} className="halo">
        bad news
      </Txt>

      {/* your standing order sits at the market */}
      <motion.g initial={false} animate={{ opacity: 1 }}>
        <rect x={mkt.x - 106} y={mkt.y + 40} width={212} height={28} rx={14} fill={toneSoft("bid")} stroke={toneVar("bid")} strokeWidth={1.5} />
        <motion.text
          key={beat === 2 ? "filled" : beat === 3 ? "canceled" : "standing"}
          x={mkt.x}
          y={mkt.y + 58.5}
          textAnchor="middle"
          className="sc-token"
          fill={toneVar("bid")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: beat === 2 ? 1.0 : beat === 3 ? 0.55 : 0, ease: EASE_OUT }}
        >
          {beat === 2 ? "FILLED: you bought at 50" : beat === 3 ? "CANCELED in time" : "your order: buy 100 at 50"}
        </motion.text>
      </motion.g>

      {/* beat 2: a slow manual cancel loses to a fast sell */}
      <Token from={cancel[0]} to={cancel[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="cancel" icon={FileText} tone="neutral" duration={2.2} absorb />
      <Token from={sell[0]} to={sell[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="sell 100" tone="ask" duration={0.8} delay={0.15} absorb />
      {/* beat 3: a computer cancels first */}
      <Token from={cancel[0]} to={cancel[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="cancel" icon={FileText} tone="see" duration={0.45} absorb />
      <Token from={sell[0]} to={sell[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="sell 100" tone="ask" duration={0.8} delay={0.7} absorb />
      <Txt x={you.x} y={you.y + 44} size={12} weight={800} tone="prac" show={beat === 2} delay={1.1} className="halo">
        too late
      </Txt>
    </Stage>
  );
}
