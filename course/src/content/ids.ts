import type { Chapter, DefinitionStep, Lesson, Question, Step } from "./types.ts";
import { isQuestion } from "./types.ts";

function hash(s: string): string {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

/** Stable id for a question: survives reordering, changes only if the wording changes. */
export const qid = (lessonId: string, q: Question) => `${lessonId}#${hash(q.kind + q.q)}`;

export type QRef = { id: string; q: Question; lesson: Lesson; unitSec: string };
export type CardRef = { id: string; step: DefinitionStep; lesson: Lesson };

export function questionsOf(ch: Chapter, filter?: (l: Lesson, unitSec: string) => boolean): QRef[] {
  const out: QRef[] = [];
  for (const u of ch.units) {
    for (const l of u.lessons) {
      if (filter && !filter(l, u.sec)) continue;
      for (const s of l.steps) if (isQuestion(s)) out.push({ id: qid(l.id, s), q: s, lesson: l, unitSec: u.sec });
    }
    if (u.checkpoint && (!filter || filter({ id: `cp-${u.sec}`, sec: u.sec, title: "", pages: u.pages, steps: [] }, u.sec)))
      for (const q of u.checkpoint) {
        const lesson: Lesson = { id: `cp-${u.sec}`, sec: u.sec, title: `Checkpoint ${u.sec}`, pages: u.pages, steps: [] };
        out.push({ id: qid(lesson.id, q), q, lesson, unitSec: u.sec });
      }
  }
  return out;
}

export function cardsOf(ch: Chapter, filter?: (l: Lesson) => boolean): CardRef[] {
  const out: CardRef[] = [];
  for (const u of ch.units)
    for (const l of u.lessons) {
      if (filter && !filter(l)) continue;
      for (const s of l.steps) if (s.kind === "definition") out.push({ id: `${l.id}:${s.term}`, step: s, lesson: l });
    }
  return out;
}

export function allLessons(ch: Chapter): { lesson: Lesson; unitSec: string }[] {
  return ch.units.flatMap((u) => u.lessons.map((lesson) => ({ lesson, unitSec: u.sec })));
}

export const stepCount = (steps: Step[]) => steps.length;
