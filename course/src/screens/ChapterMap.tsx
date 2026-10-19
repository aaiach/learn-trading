import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Crown, Flag, Lock, Play, Star, Trophy, Unlock } from "lucide-react";
import type { Chapter } from "../content/types.ts";
import { type PathNode, pathOf } from "../course.ts";
import { navigate } from "../router.tsx";
import { type ProgressStore, useProgress } from "../state/progress.ts";
import { Button } from "../ds/ui.tsx";
import { spring } from "../motion/tokens.ts";

const ZIG = [0, 52, 78, 52, 0, -52, -78, -52];

function minutes(n: number) {
  return Math.max(1, Math.round((n * 20) / 60));
}

export function ChapterMap({ ch, store }: { ch: Chapter; store: ProgressStore }) {
  const p = useProgress(store, (x) => x);
  const path = pathOf(ch, p);
  const [open, setOpen] = useState<string | null>(null);
  const currentRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center" });
  }, []);

  let zi = 0;
  return (
    <div className="col map" onClick={() => setOpen(null)}>
      {ch.units.map((u, ui) => {
        const nodes = path[ui].nodes;
        const done = nodes.filter((n) => n.type === "lesson" && n.status === "done").length;
        return (
          <section key={u.sec} className="unit">
            <header className="unit-banner">
              <span className="unit-sec">{u.sec}</span>
              <div className="unit-text">
                <h2>{u.title}</h2>
                <p>
                  pp. {u.pages} · {done}/{u.lessons.length} lessons
                </p>
              </div>
              <div className="unit-bar" aria-hidden>
                <motion.div
                  className="unit-bar-fill"
                  initial={false}
                  animate={{ width: `${(100 * done) / u.lessons.length}%` }}
                  transition={spring.fill}
                />
              </div>
            </header>
            <ol className="path">
              {nodes.map((n) => {
                const key = n.type === "lesson" ? n.lesson.id : `cp-${n.unitSec}`;
                const off = ZIG[zi++ % ZIG.length];
                return (
                  <PathNodeView
                    key={key}
                    node={n}
                    offset={off}
                    open={open === key}
                    onToggle={() => setOpen(open === key ? null : key)}
                    liRef={n.status === "current" ? currentRef : undefined}
                    chId={ch.id}
                  />
                );
              })}
            </ol>
          </section>
        );
      })}
      <section className="unit unit-final">
        <button type="button" className="exam-node" onClick={() => navigate(`/${ch.id}/exam`)}>
          <span className="exam-node-icon">
            <Flag size={26} />
          </span>
          <span>
            <strong>Chapter exam</strong>
            <small>40 questions · 35 to pass</small>
          </span>
        </button>
      </section>
      <div className="map-foot">
        <button
          type="button"
          className="link-btn"
          onClick={(e) => {
            e.stopPropagation();
            store.update((d) => {
              d.unlockAll = !d.unlockAll;
            });
          }}
        >
          {p.unlockAll ? <Lock size={14} /> : <Unlock size={14} />}
          {p.unlockAll ? "Lock lessons to book order" : "Unlock every lesson"}
        </button>
      </div>
    </div>
  );
}

function PathNodeView({
  node,
  offset,
  open,
  onToggle,
  liRef,
  chId,
}: {
  node: PathNode;
  offset: number;
  open: boolean;
  onToggle: () => void;
  liRef?: React.Ref<HTMLLIElement>;
  chId: string;
}) {
  const st = node.status;
  const isCp = node.type === "checkpoint";
  const Icon =
    st === "locked" ? Lock : isCp ? (node.passed ? Crown : Trophy) : st === "done" ? Check : st === "current" ? Play : Star;
  const label = node.type === "lesson" ? node.lesson.title : `Checkpoint ${node.unitSec}`;
  const sub = node.type === "lesson" ? node.lesson.sec : node.passed ? `Best ${node.best}%` : "10 questions";
  const start = () => {
    if (node.type === "lesson") navigate(`/${chId}/l/${node.lesson.id}`);
    else navigate(`/${chId}/cp/${node.unitSec}`);
  };
  return (
    <li ref={liRef} className={`pnode ${open ? "pnode-open" : ""}`} style={{ transform: `translateX(${offset}px)` }}>
      <AnimatePresence>
        {st === "current" && !open && (
          <motion.span
            className="pnode-bubble"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ ...spring.soft, delay: 0.25 }}
          >
            Start
          </motion.span>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className={`pnode-btn ${st} ${isCp ? "cp" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (st !== "locked") onToggle();
        }}
        whileTap={st !== "locked" ? { y: 4 } : undefined}
        transition={spring.ui}
        aria-label={`${label}${st === "locked" ? " (locked)" : ""}`}
        aria-expanded={open}
      >
        <Icon size={isCp ? 28 : 26} strokeWidth={2.6} />
      </motion.button>
      {node.type === "lesson" && st === "done" && (
        <span className="pnode-stars" aria-label={`${node.stars} stars`}>
          {[0, 1, 2].map((i) => (
            <Star key={i} size={12} fill={i < node.stars ? "currentColor" : "none"} className={i < node.stars ? "on" : ""} />
          ))}
        </span>
      )}
      <span className="pnode-label">
        <small>{sub}</small>
        {label}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pop"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={spring.soft}
            onClick={(e) => e.stopPropagation()}
            style={{ x: -offset / 2 }}
          >
            <p className="pop-eyebrow">
              {node.type === "lesson" ? `§ ${node.lesson.sec} · pp. ${node.lesson.pages}` : `Unit ${node.unitSec}`}
            </p>
            <h3>{label}</h3>
            <p className="pop-meta">
              {node.type === "lesson"
                ? `${node.lesson.steps.length} screens · about ${minutes(node.lesson.steps.length)} min`
                : "10 questions from this unit · 80% to pass"}
            </p>
            <Button variant="cta" onClick={start} className="btn-wide" autoFocus>
              {st === "done" ? (isCp ? "Retake" : "Practice again") : "Start"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
