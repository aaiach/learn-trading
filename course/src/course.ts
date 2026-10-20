import type { Chapter, Lesson } from "./content/types.ts";
import type { Progress } from "./state/progress.ts";
import { CH03 } from "./content/ch03/index.ts";
import { CH04 } from "./content/ch04/index.ts";

export const CHAPTERS: Record<string, Chapter> = { ch03: CH03, ch04: CH04 };

export type NodeStatus = "done" | "current" | "open" | "locked";

export type PathNode =
  | { type: "lesson"; lesson: Lesson; unitSec: string; status: NodeStatus; stars: number }
  | { type: "checkpoint"; unitSec: string; status: NodeStatus; best?: number; passed: boolean };

/**
 * The chapter as a path: lessons in book order, a checkpoint after each unit.
 * Lessons unlock one after another. A checkpoint opens once its unit's lessons are done;
 * passing it earns a badge but never blocks the next unit.
 */
export function pathOf(ch: Chapter, p: Progress): { unitSec: string; nodes: PathNode[] }[] {
  let seenCurrent = false;
  return ch.units.map((u) => {
    const nodes: PathNode[] = u.lessons.map((lesson) => {
      const rec = p.lessons[lesson.id];
      let status: NodeStatus;
      if (rec) status = "done";
      else if (!seenCurrent) {
        status = "current";
        seenCurrent = true;
      } else status = p.unlockAll ? "open" : "locked";
      return { type: "lesson", lesson, unitSec: u.sec, status, stars: rec?.stars ?? 0 };
    });
    const cp = p.checkpoints[u.sec];
    const unitDone = u.lessons.every((l) => p.lessons[l.id]);
    const status: NodeStatus = cp?.passed ? "done" : unitDone || p.unlockAll ? "open" : "locked";
    nodes.push({ type: "checkpoint", unitSec: u.sec, status, best: cp?.best, passed: !!cp?.passed });
    return { unitSec: u.sec, nodes };
  });
}

export function mastery(ch: Chapter, p: Progress): number {
  const lessons = ch.units.flatMap((u) => u.lessons);
  const done = lessons.filter((l) => p.lessons[l.id]).length;
  const cps = ch.units.filter((u) => p.checkpoints[u.sec]?.passed).length;
  const exam = p.exams.some((e) => e.passed) ? 1 : 0;
  const total = lessons.length * 2 + ch.units.length + 2;
  return Math.round((100 * (done * 2 + cps + exam * 2)) / Math.max(1, total));
}

export function findLesson(ch: Chapter, id: string): { lesson: Lesson; unitSec: string } | undefined {
  for (const u of ch.units) for (const l of u.lessons) if (l.id === id) return { lesson: l, unitSec: u.sec };
  return undefined;
}
