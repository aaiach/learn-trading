import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Flame, RotateCcw, X, Zap } from "lucide-react";
import type { Question, Step } from "../content/types.ts";
import { isActivity, isQuestion } from "../content/types.ts";
import { BookQuote, Button, Kbd, Rich } from "../ds/ui.tsx";
import { screen, spring, EASE_OUT } from "../motion/tokens.ts";
import { shuffle } from "../util.ts";
import type { ProgressStore } from "../state/progress.ts";
import { type Answer, blankAnswer, grade, isComplete, rightAnswer } from "./grade.ts";
import { DefinitionView, IdeaView, QuoteView, RecapView, SeeView, TodayView } from "./steps/Learn.tsx";
import { QuestionView } from "./steps/Questions.tsx";
import { type ActivityResult, ClassifyView, GameView, MatchView } from "./steps/Activities.tsx";
import { Complete } from "./Complete.tsx";

export type PlayItem = { step: Step; qid?: string; sec: string };
type Item = PlayItem & { key: string; retry: boolean; tries: number; order: number[] };

export type RunResult = {
  xp: number;
  questions: number;
  firstTry: number;
  mistakes: string[];
  ms: number;
  activityScore: number;
  activityMax: number;
};

function orderFor(step: Step): number[] {
  switch (step.kind) {
    case "choice":
    case "multi":
      return shuffle(step.options.map((_, i) => i));
    case "fill":
      return shuffle(step.bank.map((_, i) => i));
    case "order":
      return shuffle(step.items.map((_, i) => i));
    default:
      return [];
  }
}

const PRAISE = ["Correct!", "Exactly.", "Right!", "Spot on.", "Yes!"];

export function Player({
  items: input,
  title,
  mode,
  review = false,
  store,
  onExit,
  onFinish,
}: {
  items: PlayItem[];
  title: string;
  /** Answers count toward clearing the learner's mistakes list. */
  review?: boolean;
  /** "lesson": wrong answers come back at the end. "check": scored once, no retries. */
  mode: "lesson" | "check";
  store: ProgressStore;
  onExit: () => void;
  onFinish: (r: RunResult) => void;
}) {
  const origN = input.length;
  const [queue, setQueue] = useState<Item[]>(() =>
    input.map((it, i) => ({ ...it, key: `s${i}`, retry: false, tries: 0, order: orderFor(it.step) })),
  );
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [beat, setBeat] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(() => (isQuestion(input[0].step) ? blankAnswer(input[0].step) : null));
  const [revealed, setRevealed] = useState<boolean | null>(null);
  const [act, setAct] = useState<ActivityResult | null>(null);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [stats, setStats] = useState({ questions: 0, firstTry: 0, mistakes: [] as string[], aScore: 0, aMax: 0 });
  const [confirmExit, setConfirmExit] = useState(false);
  const [finished, setFinished] = useState<RunResult | null>(null);
  const started = useRef(Date.now());
  const praise = useRef(PRAISE[0]);

  const item = queue[idx] as Item | undefined;
  const step = item?.step;

  const go = useCallback(
    (to: number, d: number, startBeat = 0) => {
      setDir(d);
      setIdx(to);
      setBeat(startBeat);
      setRevealed(null);
      setAct(null);
      const s = queue[to]?.step;
      setAnswer(s && isQuestion(s) ? blankAnswer(s) : null);
    },
    [queue],
  );

  const finish = useCallback(() => {
    // finishing a lesson pays a bonus, more for a clean run
    const bonus = mode === "lesson" ? 15 + (stats.questions === stats.firstTry ? 10 : 0) : 0;
    const r: RunResult = {
      xp: xp + bonus,
      questions: stats.questions,
      firstTry: stats.firstTry,
      mistakes: stats.mistakes,
      ms: Date.now() - started.current,
      activityScore: stats.aScore,
      activityMax: stats.aMax,
    };
    setFinished(r);
    onFinish(r);
  }, [xp, stats, onFinish, mode]);

  const next = useCallback(() => {
    if (!step) return;
    if (step.kind === "see" && beat < step.beats.length - 1) {
      setBeat((b) => b + 1);
      return;
    }
    if (idx + 1 >= queue.length) finish();
    else go(idx + 1, 1);
  }, [step, beat, idx, queue.length, go, finish]);

  const prevStep = idx > 0 ? queue[idx - 1].step : null;
  const prevIsLearn = !!prevStep && !isQuestion(prevStep) && !isActivity(prevStep);
  // Back re-reads learning screens. Answered questions stay answered, and activities can't be left half-way.
  const canBack =
    !!step && !isActivity(step) && ((step.kind === "see" && beat > 0) || (prevIsLearn && revealed === null && idx < origN));

  const back = useCallback(() => {
    if (!step || !canBack) return;
    if (step.kind === "see" && beat > 0) {
      setBeat((b) => b - 1);
      return;
    }
    const prev = queue[idx - 1].step;
    go(idx - 1, -1, prev.kind === "see" ? prev.beats.length - 1 : 0);
  }, [step, canBack, beat, queue, idx, go]);

  const check = useCallback(() => {
    if (!item || !step || !isQuestion(step) || !answer || revealed !== null || !isComplete(step, answer)) return;
    const ok = grade(step, answer);
    setRevealed(ok);
    praise.current = PRAISE[Math.floor(Math.random() * PRAISE.length)];
    if (item.qid) store.answer(item.qid, ok, review);
    if (ok) {
      const gain = item.retry ? 5 : 10;
      setXp((x) => x + gain);
      setCombo((c) => c + 1);
    } else {
      setCombo(0);
    }
    if (!item.retry) {
      setStats((s) => ({
        ...s,
        questions: s.questions + 1,
        firstTry: s.firstTry + (ok ? 1 : 0),
        mistakes: ok || !item.qid ? s.mistakes : [...s.mistakes, item.qid],
      }));
    }
    // a missed question comes back at the end, at most twice; after that it waits in the mistakes list
    if (!ok && mode === "lesson" && item.tries < 2) {
      setQueue((qq) => [...qq, { ...item, key: `${item.key}r${qq.length}`, retry: true, tries: item.tries + 1, order: orderFor(step) }]);
    }
  }, [item, step, answer, revealed, store, mode, review]);

  const onActivity = useCallback(
    (r: ActivityResult) => {
      setAct(r);
      const gain = step?.kind === "game" ? Math.round((20 * r.score) / Math.max(1, r.max)) : r.score * 2;
      setXp((x) => x + gain);
      setStats((s) => ({ ...s, aScore: s.aScore + r.score, aMax: s.aMax + r.max }));
      if (step?.kind === "game") {
        const id = step.id;
        store.update((p) => {
          const g = p.games[id];
          if (!g || r.score > g.best) p.games[id] = { best: r.score, max: r.max };
        });
      }
    },
    [step, store],
  );

  // What the main button does right now
  const primary = useMemo((): { label: string; action: () => void; disabled: boolean } | null => {
    if (!step || finished) return null;
    if (isQuestion(step)) {
      if (revealed !== null) return null; // the sheet owns the button
      return { label: "Check", action: check, disabled: !answer || !isComplete(step, answer) };
    }
    if (isActivity(step)) return { label: "Continue", action: next, disabled: !act };
    if (step.kind === "see" && beat < step.beats.length - 1) return { label: "Next", action: next, disabled: false };
    return { label: "Continue", action: next, disabled: false };
  }, [step, finished, revealed, check, answer, act, next, beat]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (finished || confirmExit) return;
      if (e.key === "Escape") {
        setConfirmExit(true);
        return;
      }
      if (e.key === "Enter") {
        if (revealed !== null) {
          e.preventDefault();
          next();
        } else if (primary && !primary.disabled) {
          e.preventDefault();
          primary.action();
        }
        return;
      }
      // QA builds only (VITE_QA=1 vite build): "]" skips any step, so a script can walk every screen.
      if (import.meta.env.VITE_QA && e.key === "]") {
        if (idx + 1 >= queue.length) finish();
        else go(idx + 1, 1);
        return;
      }
      const t = e.target as HTMLElement | null;
      if (t && t.tagName === "INPUT") return;
      if (e.key === "ArrowRight" && step && !isQuestion(step) && !isActivity(step)) next();
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [finished, confirmExit, revealed, next, primary, step, back, idx, queue.length, go, finish]);

  if (finished) {
    return <Complete title={title} mode={mode} result={finished} onDone={onExit} />;
  }
  if (!item || !step) return null;

  const frac =
    idx >= origN
      ? 1
      : (idx + (step.kind === "see" ? beat / step.beats.length : 0) + (revealed !== null || act ? 1 : 0)) / origN;
  const refQ = `§ ${item.sec}`;

  return (
    <div className="player">
      <header className="p-top">
        <button type="button" className="icon-btn" onClick={() => setConfirmExit(true)} aria-label="Quit lesson">
          <X size={22} />
        </button>
        <div className="p-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(frac * 100)}>
          <motion.div className="p-bar-fill" initial={false} animate={{ width: `${Math.max(3, frac * 100)}%` }} transition={spring.fill} />
        </div>
        <div className="p-stats">
          <AnimatePresence>
            {combo >= 3 && (
              <motion.span
                key="combo"
                className="combo"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                title={`${combo} right in a row`}
              >
                <Flame size={15} />
                <motion.span key={combo} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  {combo}
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
          <span className="xp" title="XP this lesson">
            <Zap size={15} />
            {xp}
          </span>
        </div>
      </header>

      <main className="p-main">
        <div className="col">
          {item.retry && idx >= origN && (
            <p className="retry-tag">
              <RotateCcw size={14} /> Second try
            </p>
          )}
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div key={item.key} custom={dir} variants={screen} initial="enter" animate="center" exit="exit">
              {renderStep(item, { beat, answer, setAnswer, revealed, onActivity, refQ })}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence initial={false}>
        {revealed !== null && isQuestion(step) && (
          <Sheet
            key={`sheet-${item.key}`}
            q={step}
            ok={revealed}
            praise={praise.current}
            gain={revealed ? (item.retry ? 5 : 10) : 0}
            retryNote={!revealed && mode === "lesson" && item.tries < 2}
            onNext={next}
          />
        )}
      </AnimatePresence>

      {primary && (
        <footer className="p-foot">
          <div className="col p-foot-row">
            {step.kind === "game" && !act ? (
              <Button variant="ghost" onClick={next} title="Skip the game (no XP)">
                Skip
              </Button>
            ) : (
              <Button variant="ghost" onClick={back} disabled={!canBack} className={canBack ? "" : "invisible"}>
                <ArrowLeft size={18} /> Back
              </Button>
            )}
            <Button variant="cta" onClick={primary.action} disabled={primary.disabled} className="btn-wide">
              {primary.label}
              <Kbd>Enter</Kbd>
            </Button>
          </div>
        </footer>
      )}

      <AnimatePresence>
        {confirmExit && (
          <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmExit(false)}>
            <motion.div
              className="modal"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={spring.soft}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <h3>Quit “{title}”?</h3>
              <p>You’ll start this {mode === "lesson" ? "lesson" : "test"} from the beginning next time.</p>
              <div className="modal-row">
                <Button variant="ghost" onClick={onExit}>
                  Quit
                </Button>
                <Button variant="cta" onClick={() => setConfirmExit(false)} autoFocus>
                  Keep going
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function renderStep(
  item: Item,
  ctx: {
    beat: number;
    answer: Answer | null;
    setAnswer: (a: Answer) => void;
    revealed: boolean | null;
    onActivity: (r: ActivityResult) => void;
    refQ: string;
  },
) {
  const s = item.step;
  switch (s.kind) {
    case "definition":
      return <DefinitionView step={s} />;
    case "idea":
      return <IdeaView step={s} />;
    case "quote":
      return <QuoteView step={s} />;
    case "see":
      return <SeeView step={s} beat={ctx.beat} />;
    case "recap":
      return <RecapView step={s} />;
    case "today":
      return <TodayView step={s} />;
    case "classify":
      return <ClassifyView step={s} onDone={ctx.onActivity} refText={ctx.refQ} />;
    case "match":
      return <MatchView step={s} onDone={ctx.onActivity} refText={ctx.refQ} />;
    case "game":
      return <GameView step={s} onDone={ctx.onActivity} />;
    default:
      return (
        <QuestionView
          q={s}
          answer={ctx.answer ?? blankAnswer(s)}
          set={ctx.setAnswer}
          revealed={ctx.revealed}
          order={item.order}
          refText={ctx.refQ}
          uid={item.key}
        />
      );
  }
}

function Sheet({
  q,
  ok,
  praise,
  gain,
  retryNote,
  onNext,
}: {
  q: Question;
  ok: boolean;
  praise: string;
  gain: number;
  retryNote: boolean;
  onNext: () => void;
}) {
  return (
    <motion.section
      className={`sheet ${ok ? "good" : "bad"}`}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%", transition: { duration: 0.18, ease: EASE_OUT } }}
      transition={spring.soft}
      aria-live="assertive"
    >
      <div className="col sheet-inner">
        <div className="sheet-head">
          <span className="sheet-icon">{ok ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}</span>
          <strong>{ok ? praise : "Not quite"}</strong>
          {gain > 0 && (
            <motion.span
              className="xp-gain"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, ...spring.ui }}
            >
              +{gain} XP
            </motion.span>
          )}
        </div>
        {!ok && (
          <p className="sheet-answer">
            Answer: <strong>{rightAnswer(q)}</strong>
          </p>
        )}
        <p className="sheet-why">
          <Rich text={q.why} />
        </p>
        <BookQuote cite={q.cite} size="sm" />
        {retryNote && (
          <p className="sheet-note">
            <RotateCcw size={14} /> This one comes back at the end of the lesson.
          </p>
        )}
        <Button variant={ok ? "good" : "bad"} onClick={onNext} className="btn-wide" autoFocus>
          Continue <Kbd>Enter</Kbd>
        </Button>
      </div>
    </motion.section>
  );
}
