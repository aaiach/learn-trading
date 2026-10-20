// Mock exam, modelled on the French driving-theory test: 40 questions, a timer on each,
// no feedback until the end, 35 right to pass.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Flag, GraduationCap, X } from "lucide-react";
import type { Chapter, Question } from "../content/types.ts";
import { type QRef, questionsOf } from "../content/ids.ts";
import { navigate } from "../router.tsx";
import { useChapterView } from "../focus.ts";
import { type ProgressStore, today, useProgress } from "../state/progress.ts";
import { BookQuote, Button, Kbd, Rich } from "../ds/ui.tsx";
import { screen, spring } from "../motion/tokens.ts";
import { shuffle } from "../util.ts";
import { type Answer, blankAnswer, grade, isComplete, rightAnswer } from "../player/grade.ts";
import { QuestionView } from "../player/steps/Questions.tsx";
import { CountUp } from "../motion/CountUp.tsx";

export const EXAM_N = 40;
export const EXAM_PASS = 35;
const secondsFor = (q: Question) => (q.kind === "order" || q.kind === "multi" || q.kind === "fill" ? 45 : 30);

export function ExamHub({ ch, store }: { ch: Chapter; store: ProgressStore }) {
  const exams = useProgress(store, (p) => p.exams);
  const view = useChapterView(ch);
  const focus = view !== ch;
  const pool = questionsOf(view).length;
  const best = exams.reduce((m, e) => Math.max(m, e.score), 0);
  return (
    <div className="col hub">
      <h1 className="hub-title">Mock exam</h1>
      <motion.div className="exam-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="exam-card-icon">
          <GraduationCap size={30} />
        </span>
        <h2>Chapter {ch.num} · {ch.title}</h2>
        <ul className="exam-rules">
          <li>
            <strong>{Math.min(EXAM_N, pool)}</strong> questions drawn from {focus ? "the must-know lessons" : "every section"}
          </li>
          <li>
            <strong>30 s</strong> per question (45 s for multi-part ones)
          </li>
          <li>
            No feedback until the end · <strong>{EXAM_PASS}</strong> right to pass
          </li>
        </ul>
        <Button variant="cta" className="btn-wide" onClick={() => navigate(`/${ch.id}/exam/run`)}>
          Start the exam
        </Button>
      </motion.div>
      {exams.length > 0 && (
        <>
          <h2 className="hub-h2">Your attempts · best {best}/{EXAM_N}</h2>
          <ol className="attempts">
            {[...exams].reverse().map((e) => (
              <li key={e.at} className={e.passed ? "pass" : "fail"}>
                {e.passed ? <Check size={16} /> : <X size={16} />}
                <span>
                  {e.score}/{e.max}
                </span>
                <small>{new Date(e.at).toLocaleString()}</small>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

function drawExam(ch: Chapter): QRef[] {
  // spread across units in proportion to how many questions each has
  const all = questionsOf(ch);
  const n = Math.min(EXAM_N, all.length);
  const byUnit = ch.units.map((u) => shuffle(all.filter((r) => r.unitSec === u.sec)));
  const out: QRef[] = [];
  let k = 0;
  while (out.length < n) {
    const bucket = byUnit[k % byUnit.length];
    if (bucket.length) out.push(bucket.pop()!);
    k++;
    if (byUnit.every((b) => !b.length)) break;
  }
  return shuffle(out);
}

type Row = { ref: QRef; answer: Answer; ok: boolean; timedOut: boolean };

export function ExamRun({ ch, store }: { ch: Chapter; store: ProgressStore }) {
  const view = useChapterView(ch);
  const refs = useMemo(() => drawExam(view), [view]);
  const orders = useMemo(
    () =>
      refs.map((r) =>
        r.q.kind === "choice" || r.q.kind === "multi"
          ? shuffle(r.q.options.map((_, i) => i))
          : r.q.kind === "fill"
            ? shuffle(r.q.bank.map((_, i) => i))
            : r.q.kind === "order"
              ? shuffle(r.q.items.map((_, i) => i))
              : [],
      ),
    [refs],
  );
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState<Answer>(() => blankAnswer(refs[0].q));
  const [rows, setRows] = useState<Row[]>([]);
  const [left, setLeft] = useState(() => secondsFor(refs[0].q));
  const [quit, setQuit] = useState(false);
  const deadline = useRef(Date.now() + secondsFor(refs[0].q) * 1000);
  const done = rows.length === refs.length;
  const ref = refs[i];

  const submit = useCallback(
    (timedOut = false) => {
      if (done || !ref) return;
      const ok = isComplete(ref.q, answer) && grade(ref.q, answer);
      store.answer(ref.id, ok, false);
      const next = [...rows, { ref, answer, ok, timedOut }];
      setRows(next);
      if (i + 1 < refs.length) {
        const q = refs[i + 1].q;
        setI(i + 1);
        setAnswer(blankAnswer(q));
        deadline.current = Date.now() + secondsFor(q) * 1000;
        setLeft(secondsFor(q));
      } else {
        const score = next.filter((r) => r.ok).length;
        store.update((p) => {
          p.exams.push({ at: Date.now(), score, max: refs.length, passed: score >= Math.min(EXAM_PASS, refs.length) });
          p.xp += score * 3;
          const d = today();
          if (!p.days.includes(d)) p.days.push(d);
        });
      }
    },
    [done, ref, answer, rows, i, refs, store],
  );

  useEffect(() => {
    if (done || quit) return;
    const t = setInterval(() => {
      const s = Math.ceil((deadline.current - Date.now()) / 1000);
      setLeft(Math.max(0, s));
      if (s <= 0) submit(true);
    }, 250);
    return () => clearInterval(t);
  }, [done, quit, submit]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !done && !quit && isComplete(ref.q, answer)) {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [done, quit, ref, answer, submit]);

  if (done) return <ExamResult ch={ch} rows={rows} />;

  const total = secondsFor(ref.q);
  return (
    <div className="player exam">
      <header className="p-top">
        <button type="button" className="icon-btn" onClick={() => setQuit(true)} aria-label="Quit exam">
          <X size={22} />
        </button>
        <div className="exam-count">
          Question <strong>{i + 1}</strong> / {refs.length}
        </div>
        <Timer left={left} total={total} />
      </header>
      <main className="p-main">
        <div className="col">
          <AnimatePresence mode="wait" initial={false} custom={1}>
            <motion.div key={i} custom={1} variants={screen} initial="enter" animate="center" exit="exit">
              <QuestionView q={ref.q} answer={answer} set={setAnswer} revealed={null} order={orders[i]} quiet uid={`ex${i}`} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <footer className="p-foot">
        <div className="col p-foot-row">
          <span />
          <Button variant="cta" className="btn-wide" onClick={() => submit()} disabled={!isComplete(ref.q, answer)}>
            {i + 1 === refs.length ? "Finish" : "Validate"} <Kbd>Enter</Kbd>
          </Button>
        </div>
      </footer>
      <AnimatePresence>
        {quit && (
          <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={spring.soft} role="dialog">
              <h3>Quit the exam?</h3>
              <p>This attempt won’t be saved.</p>
              <div className="modal-row">
                <Button variant="ghost" onClick={() => navigate(`/${ch.id}/exam`)}>
                  Quit
                </Button>
                <Button
                  variant="cta"
                  autoFocus
                  onClick={() => {
                    deadline.current = Date.now() + left * 1000;
                    setQuit(false);
                  }}
                >
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

function Timer({ left, total }: { left: number; total: number }) {
  const reduce = useReducedMotion();
  const r = 15;
  const c = 2 * Math.PI * r;
  const low = left <= 5;
  return (
    <span className={`timer ${low ? "low" : ""}`} aria-label={`${left} seconds left`}>
      <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden>
        <circle cx="19" cy="19" r={r} fill="none" stroke="var(--line)" strokeWidth="3.5" />
        <motion.circle
          cx="19"
          cy="19"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: c * (1 - left / total) }}
          transition={reduce ? { duration: 0 } : { duration: 0.25, ease: "linear" }}
          transform="rotate(-90 19 19)"
        />
      </svg>
      <span className="timer-n">{left}</span>
    </span>
  );
}

function ExamResult({ ch, rows }: { ch: Chapter; rows: Row[] }) {
  const score = rows.filter((r) => r.ok).length;
  const need = Math.min(EXAM_PASS, rows.length);
  const passed = score >= need;
  const [filter, setFilter] = useState<"wrong" | "all">("wrong");
  const shown = rows.filter((r) => filter === "all" || !r.ok);
  return (
    <div className="shell exam-result">
      <main className="col hub">
        <motion.div className={`result-hero ${passed ? "pass" : "fail"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="result-icon">{passed ? <Flag size={30} /> : <X size={30} />}</span>
          <p className="result-score">
            <CountUp value={score} duration={1} />
            <span>/ {rows.length}</span>
          </p>
          <h1>{passed ? "Passed" : `Not yet — ${need} to pass`}</h1>
        </motion.div>
        <div className="seg">
          <button type="button" className={filter === "wrong" ? "on" : ""} onClick={() => setFilter("wrong")}>
            Mistakes ({rows.length - score})
          </button>
          <button type="button" className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>
            All questions
          </button>
        </div>
        <ol className="review">
          {shown.map((r) => (
            <li key={r.ref.id} className={r.ok ? "ok" : "ko"}>
              <p className="review-q">
                <span className="review-mark">{r.ok ? <Check size={16} /> : <X size={16} />}</span>
                <Rich text={r.ref.q.q.replace(/___/g, "____")} />
              </p>
              {!r.ok && (
                <p className="review-a">
                  {r.timedOut && !isComplete(r.ref.q, r.answer) ? "Time ran out. " : ""}Answer: <strong>{rightAnswer(r.ref.q)}</strong>
                </p>
              )}
              <p className="review-why">
                <Rich text={r.ref.q.why} />
              </p>
              <BookQuote cite={r.ref.q.cite} size="sm" />
            </li>
          ))}
        </ol>
        <div className="result-actions">
          <Button variant="ghost" onClick={() => navigate(`/${ch.id}/exam`)}>
            Back
          </Button>
          <Button variant="cta" onClick={() => (window.location.href = `/${ch.id}/exam/run`)}>
            New exam
          </Button>
        </div>
      </main>
    </div>
  );
}
