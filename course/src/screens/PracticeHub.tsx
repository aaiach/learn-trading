import { motion } from "motion/react";
import { ChevronRight, Crown, Layers, RotateCcw, Trophy, Zap, type LucideIcon } from "lucide-react";
import type { Chapter } from "../content/types.ts";
import { cardsOf, questionsOf } from "../content/ids.ts";
import { navigate } from "../router.tsx";
import { type ProgressStore, useProgress } from "../state/progress.ts";
import { EASE_OUT } from "../motion/tokens.ts";

function HubCard({
  icon: Icon,
  title,
  sub,
  to,
  disabled,
  accent,
  i,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  to: string;
  disabled?: boolean;
  accent: string;
  i: number;
}) {
  return (
    <motion.button
      type="button"
      className="hub-card"
      disabled={disabled}
      onClick={() => navigate(to)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05, duration: 0.3, ease: EASE_OUT }}
      whileTap={disabled ? undefined : { y: 2 }}
    >
      <span className="hub-icon" style={{ background: `var(--${accent}-soft)`, color: `var(--${accent})` }}>
        <Icon size={22} />
      </span>
      <span className="hub-text">
        <strong>{title}</strong>
        <small>{sub}</small>
      </span>
      <ChevronRight size={20} className="hub-chev" />
    </motion.button>
  );
}

export function PracticeHub({ ch, store }: { ch: Chapter; store: ProgressStore }) {
  const p = useProgress(store, (x) => x);
  const allQ = questionsOf(ch);
  const mistakes = allQ.filter((r) => r.id in p.mistakes).length;
  const cards = cardsOf(ch);
  const known = cards.filter((c) => p.cards[c.id]);
  const due = known.filter((c) => p.cards[c.id].due <= Date.now()).length;
  const doneLessons = Object.keys(p.lessons).length;
  return (
    <div className="col hub">
      <h1 className="hub-title">Practice</h1>
      <p className="hub-sub">Short sessions built from what you’ve learned. Wrong answers go to “Fix your mistakes”.</p>
      <div className="hub-list">
        <HubCard
          i={0}
          icon={RotateCcw}
          accent="bad"
          title="Fix your mistakes"
          sub={mistakes ? `${mistakes} question${mistakes > 1 ? "s" : ""} to get right twice` : "No mistakes to fix"}
          to={`/${ch.id}/review`}
          disabled={!mistakes}
        />
        <HubCard
          i={1}
          icon={Zap}
          accent="prac"
          title="Quick 10"
          sub={doneLessons ? "Ten questions from lessons you’ve done" : "Ten questions from section 3.1"}
          to={`/${ch.id}/quick`}
        />
        <HubCard
          i={2}
          icon={Layers}
          accent="def"
          title="Vocabulary cards"
          sub={known.length ? `${due} due · ${known.length} of ${cards.length} terms learned` : `${cards.length} terms · unlocked as you finish lessons`}
          to={`/${ch.id}/cards`}
        />
      </div>
      <h2 className="hub-h2">Checkpoints</h2>
      <div className="hub-list">
        {ch.units.map((u, i) => {
          const cp = p.checkpoints[u.sec];
          return (
            <HubCard
              key={u.sec}
              i={3 + i}
              icon={cp?.passed ? Crown : Trophy}
              accent={cp?.passed ? "gold" : "recap"}
              title={`${u.sec} ${u.title}`}
              sub={cp ? `Best ${cp.best}% · ${cp.runs} run${cp.runs > 1 ? "s" : ""}${cp.passed ? " · passed" : ""}` : "10 questions · 80% to pass"}
              to={`/${ch.id}/cp/${u.sec}`}
            />
          );
        })}
      </div>
    </div>
  );
}
