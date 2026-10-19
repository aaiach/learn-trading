// Learner progress for one chapter. Kept in localStorage and mirrored to course/progress/<id>.json
// by the dev server (server/api.ts), newest `updatedAt` wins on load.
import { useSyncExternalStore } from "react";

export type LessonRecord = { stars: number; best: number; runs: number; at: number };
export type QRecord = { right: number; wrong: number; last: number; lastOk: boolean };
export type CardRecord = { box: number; due: number };
export type ExamRecord = { at: number; score: number; max: number; passed: boolean };

export type Progress = {
  v: 2;
  updatedAt: number;
  xp: number;
  /** Local dates (YYYY-MM-DD) on which the learner finished something. */
  days: string[];
  lessons: Record<string, LessonRecord>;
  checkpoints: Record<string, { best: number; max: number; runs: number; passed: boolean }>;
  q: Record<string, QRecord>;
  /** Question ids to review, oldest first. A question leaves after two right answers in review. */
  mistakes: Record<string, number>;
  cards: Record<string, CardRecord>;
  exams: ExamRecord[];
  games: Record<string, { best: number; max: number }>;
  unlockAll: boolean;
};

const empty = (): Progress => ({
  v: 2,
  updatedAt: 0,
  xp: 0,
  days: [],
  lessons: {},
  checkpoints: {},
  q: {},
  mistakes: {},
  cards: {},
  exams: [],
  games: {},
  unlockAll: false,
});

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function streak(days: string[]): number {
  const set = new Set(days);
  let n = 0;
  const d = new Date();
  // today counts if done; otherwise start from yesterday so the streak survives until midnight
  const key = (x: Date) =>
    `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
  if (!set.has(key(d))) d.setDate(d.getDate() - 1);
  while (set.has(key(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

function load(key: string): Progress {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const p = JSON.parse(raw);
      if (p?.v === 2) return { ...empty(), ...p };
    }
  } catch {
    /* storage unavailable */
  }
  return empty();
}

export class ProgressStore {
  private state: Progress;
  private listeners = new Set<() => void>();
  private timer: ReturnType<typeof setTimeout> | undefined;
  mode: "local" | "file" = "local";

  constructor(readonly chapter: string) {
    this.state = load(this.key);
    void this.connect();
  }

  private get key() {
    return `te:${this.chapter}`;
  }

  private async connect() {
    try {
      const r = await fetch(`/api/progress/${this.chapter}`);
      if (!r.ok) return;
      const file = (await r.json()) as Progress | null;
      this.mode = "file";
      if (file?.v === 2 && file.updatedAt > this.state.updatedAt) {
        this.state = { ...empty(), ...file };
        this.persistLocal();
        this.emit();
      } else if (this.state.updatedAt) {
        this.schedule();
      }
    } catch {
      /* static build: browser storage only */
    }
  }

  get = () => this.state;

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  private emit() {
    for (const fn of this.listeners) fn();
  }

  private persistLocal() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.state));
    } catch {
      /* ignore */
    }
  }

  private schedule() {
    if (this.mode !== "file") return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      void fetch(`/api/progress/${this.chapter}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state, null, 1),
      }).catch(() => undefined);
    }, 600);
  }

  update(fn: (draft: Progress) => void) {
    const next = structuredClone(this.state);
    fn(next);
    next.updatedAt = Date.now();
    this.state = next;
    this.persistLocal();
    this.schedule();
    this.emit();
  }

  /** Record one answer. `review` answers can clear a mistake. */
  answer(qid: string, ok: boolean, review = false) {
    this.update((p) => {
      const r = p.q[qid] ?? { right: 0, wrong: 0, last: 0, lastOk: false };
      if (ok) r.right++;
      else r.wrong++;
      r.last = Date.now();
      r.lastOk = ok;
      p.q[qid] = r;
      if (!ok) p.mistakes[qid] = 0; // (re)enter review with no credits
      else if (review && qid in p.mistakes) {
        const credits = p.mistakes[qid] + 1;
        if (credits >= 2) delete p.mistakes[qid];
        else p.mistakes[qid] = credits;
      }
    });
  }

  addXp(n: number) {
    this.update((p) => {
      p.xp += n;
      const d = today();
      if (!p.days.includes(d)) p.days.push(d);
    });
  }
}

/** `select` must return a primitive or a slice of the state (not a new object), or React re-renders forever. */
export function useProgress<T>(store: ProgressStore, select: (p: Progress) => T): T {
  return useSyncExternalStore(store.subscribe, () => select(store.get()));
}

const stores = new Map<string, ProgressStore>();
export function storeFor(chapter: string) {
  let s = stores.get(chapter);
  if (!s) {
    s = new ProgressStore(chapter);
    stores.set(chapter, s);
  }
  return s;
}
