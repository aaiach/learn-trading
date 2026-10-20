// "Must know only": one learner-wide switch that narrows every chapter to its must-know lessons (imp 3).
import { useSyncExternalStore } from "react";
import type { Chapter } from "./content/types.ts";

const KEY = "te-focus";
const subs = new Set<() => void>();
let on = read();

function read(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setFocus(v: boolean) {
  on = v;
  try {
    localStorage.setItem(KEY, v ? "1" : "0");
  } catch {
    /* ignore */
  }
  subs.forEach((f) => f());
}

export function useFocus(): boolean {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => on,
  );
}

const cache = new WeakMap<Chapter, Chapter>();

/**
 * The chapter as "must know only" shows it: lessons rated 3, in book order. A unit with none keeps its place
 * with no lessons. Checkpoint extras stay when they cite a section a kept lesson teaches, or one no lesson of
 * the unit owns (unit-wide questions). Cached, so screens that memoize on the chapter get the same object.
 */
export function focusView(ch: Chapter, focus: boolean): Chapter {
  if (!focus) return ch;
  let v = cache.get(ch);
  if (!v) {
    v = {
      ...ch,
      units: ch.units.map((u) => {
        const lessons = u.lessons.filter((l) => l.imp === 3);
        const kept = new Set(lessons.map((l) => l.sec));
        const owned = new Set(u.lessons.map((l) => l.sec));
        const checkpoint = lessons.length ? (u.checkpoint ?? []).filter((q) => kept.has(q.cite.s) || !owned.has(q.cite.s)) : [];
        return { ...u, lessons, checkpoint };
      }),
    };
    cache.set(ch, v);
  }
  return v;
}

/** The chapter for the current setting. */
export function useChapterView(ch: Chapter): Chapter {
  return focusView(ch, useFocus());
}
