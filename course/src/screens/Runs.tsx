import { useMemo } from "react";
import type { Chapter } from "../content/types.ts";
import { isQuestion } from "../content/types.ts";
import { qid, questionsOf, type QRef } from "../content/ids.ts";
import { CHECKPOINT_N, findLesson } from "../course.ts";
import { useChapterView } from "../focus.ts";
import { navigate } from "../router.tsx";
import { type ProgressStore, today } from "../state/progress.ts";
import { Player, type PlayItem, type RunResult } from "../player/Player.tsx";
import { PASS, starsFor } from "../player/Complete.tsx";
import { shuffle } from "../util.ts";

function finishXp(store: ProgressStore, r: RunResult) {
  store.update((p) => {
    p.xp += r.xp;
    const d = today();
    if (!p.days.includes(d)) p.days.push(d);
  });
}

export function LessonRun({ ch, store, id }: { ch: Chapter; store: ProgressStore; id: string }) {
  const found = findLesson(ch, id);
  const items = useMemo<PlayItem[]>(
    () =>
      found
        ? found.lesson.steps.map((step) => ({
            step,
            qid: isQuestion(step) ? qid(found.lesson.id, step) : undefined,
            sec: found.lesson.sec,
          }))
        : [],
    [found],
  );
  if (!found || !items.length) return <NotFound chId={ch.id} />;
  const { lesson } = found;
  return (
    <Player
      key={lesson.id}
      items={items}
      title={lesson.title}
      mode="lesson"
      store={store}
      onExit={() => navigate(`/${ch.id}`)}
      onFinish={(r) => {
        finishXp(store, r);
        store.update((p) => {
          const old = p.lessons[lesson.id];
          const stars = starsFor(r);
          const acc = r.questions ? Math.round((100 * r.firstTry) / r.questions) : 100;
          p.lessons[lesson.id] = {
            stars: Math.max(old?.stars ?? 0, stars),
            best: Math.max(old?.best ?? 0, acc),
            runs: (old?.runs ?? 0) + 1,
            at: Date.now(),
          };
          // new vocabulary enters the flashcard deck, due now
          for (const s of lesson.steps)
            if (s.kind === "definition") {
              const cid = `${lesson.id}:${s.term}`;
              if (!p.cards[cid]) p.cards[cid] = { box: 0, due: Date.now() };
            }
        });
      }}
    />
  );
}

/** Weighted pick: questions the learner got wrong before come first, then unseen, then the rest. */
function pickQuestions(pool: QRef[], n: number, store: ProgressStore): QRef[] {
  const p = store.get();
  const score = (r: QRef) => {
    const rec = p.q[r.id];
    if (r.id in p.mistakes) return 0;
    if (!rec) return 1;
    return 2 + rec.right / (rec.right + rec.wrong + 1);
  };
  return shuffle(pool)
    .sort((a, b) => score(a) - score(b))
    .slice(0, n);
}

function toItems(refs: QRef[]): PlayItem[] {
  return shuffle(refs).map((r) => ({ step: r.q, qid: r.id, sec: r.lesson.sec }));
}

export function CheckpointRun({ ch: full, store, sec }: { ch: Chapter; store: ProgressStore; sec: string }) {
  const ch = useChapterView(full);
  const unit = ch.units.find((u) => u.sec === sec);
  const items = useMemo(() => {
    if (!unit) return [];
    const pool = questionsOf(ch, (_l, us) => us === sec);
    return toItems(pickQuestions(pool, CHECKPOINT_N, store));
  }, [ch, sec, unit, store]);
  if (!unit || !items.length) return <NotFound chId={ch.id} />;
  return (
    <Player
      items={items}
      title={`Checkpoint ${sec} · ${unit.title}`}
      mode="check"
      store={store}
      onExit={() => navigate(`/${ch.id}`)}
      onFinish={(r) => {
        finishXp(store, r);
        const pct = Math.round((100 * r.firstTry) / Math.max(1, r.questions));
        store.update((p) => {
          const old = p.checkpoints[sec];
          p.checkpoints[sec] = {
            best: Math.max(old?.best ?? 0, pct),
            max: 100,
            runs: (old?.runs ?? 0) + 1,
            passed: !!old?.passed || pct / 100 >= PASS,
          };
        });
      }}
    />
  );
}

export function ReviewRun({ ch, store, kind }: { ch: Chapter; store: ProgressStore; kind: "mistakes" | "quick" }) {
  const view = useChapterView(ch);
  const items = useMemo(() => {
    const p = store.get();
    if (kind === "mistakes") {
      const pool = questionsOf(ch).filter((r) => r.id in p.mistakes);
      return toItems(pool.slice(0, 10));
    }
    const doneIds = new Set(Object.keys(p.lessons));
    let pool = questionsOf(view, (l) => doneIds.has(l.id));
    const first = view.units.find((u) => u.lessons.length) ?? ch.units[0];
    if (pool.length < 5) pool = questionsOf(view, (_l, us) => us === first.sec);
    return toItems(pickQuestions(pool, 10, store));
  }, [ch, view, store, kind]);
  if (!items.length) return <NotFound chId={ch.id} msg="Nothing to review yet." back="practice" />;
  return (
    <Player
      items={items}
      title={kind === "mistakes" ? "Fix your mistakes" : "Quick 10"}
      mode="check"
      review={kind === "mistakes"}
      store={store}
      onExit={() => navigate(`/${ch.id}/practice`)}
      onFinish={(r) => finishXp(store, r)}
    />
  );
}

function NotFound({ chId, msg = "That page doesn’t exist.", back = "" }: { chId: string; msg?: string; back?: string }) {
  return (
    <div className="col empty">
      <p>{msg}</p>
      <a href={`/${chId}/${back}`} onClick={(e) => (e.preventDefault(), navigate(`/${chId}${back ? `/${back}` : ""}`))}>
        Back
      </a>
    </div>
  );
}
