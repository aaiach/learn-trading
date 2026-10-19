import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Dumbbell, Flame, GraduationCap, Route, Zap } from "lucide-react";
import type { Chapter } from "../content/types.ts";
import { Link } from "../router.tsx";
import { type ProgressStore, streak, useProgress } from "../state/progress.ts";
import { ThemeToggle } from "../theme.tsx";
import { mastery } from "../course.ts";

export type Tab = "learn" | "practice" | "exam";

export function ChapterShell({
  ch,
  store,
  tab,
  children,
}: {
  ch: Chapter;
  store: ProgressStore;
  tab: Tab;
  children: ReactNode;
}) {
  const xp = useProgress(store, (p) => p.xp);
  const days = useProgress(store, (p) => p.days);
  const prog = useProgress(store, (p) => p);
  const m = mastery(ch, prog);
  const s = streak(days);
  const tabs: { id: Tab; label: string; icon: typeof Route; to: string }[] = [
    { id: "learn", label: "Learn", icon: Route, to: `/${ch.id}` },
    { id: "practice", label: "Practice", icon: Dumbbell, to: `/${ch.id}/practice` },
    { id: "exam", label: "Exam", icon: GraduationCap, to: `/${ch.id}/exam` },
  ];
  return (
    <div className="shell">
      <header className="topbar">
        <div className="col topbar-row">
          <Link to="/" className="icon-btn" aria-label="All chapters">
            <ChevronLeft size={22} />
          </Link>
          <div className="topbar-title">
            <span className="eyebrow">
              {ch.part} · Chapter {ch.num}
            </span>
            <strong>{ch.title}</strong>
          </div>
          <div className="topbar-stats">
            <span className={`stat ${s ? "stat-fire" : ""}`} title={`${s}-day streak`}>
              <Flame size={16} /> {s}
            </span>
            <span className="stat stat-xp" title="Total XP">
              <Zap size={16} /> {xp}
            </span>
            <span className="stat" title="Chapter mastery">
              <MasteryRing value={m} />
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="shell-main">{children}</main>
      <nav className="tabbar" aria-label="Sections">
        <div className="col tabbar-row">
          {tabs.map((t) => {
            const Icon = t.icon;
            const on = t.id === tab;
            return (
              <Link key={t.id} to={t.to} className={`tab ${on ? "on" : ""}`}>
                {on && <motion.span layoutId="tab-on" className="tab-on" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                <Icon size={20} />
                <span>{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function MasteryRing({ value, size = 26 }: { value: number; size?: number }) {
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;
  return (
    <span className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth="3.5" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--progress)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-val" style={{ fontSize: Math.max(8, Math.round(size * 0.27)) }}>
        {value}%
      </span>
    </span>
  );
}
