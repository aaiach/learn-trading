// Move progress between devices. Everything lives in this browser's storage, so it travels as one text
// (copied here, pasted there) or a file. Bringing it in merges with what the device already has: nothing is lost.
import { CHAPTERS } from "../course.ts";
import { getFocus, setFocus } from "../focus.ts";
import { BOX_DAYS, type CardRecord, DAY, type Progress, empty, storeFor, today } from "./progress.ts";

const APP = "trading-and-exchanges";
/** Compressed text: "te1:" + base64url(gzip(JSON)). Plain JSON (the file format) is accepted too. */
const PREFIX = "te1:";
const MAX_TEXT = 8_000_000;

export type Bundle = { app: typeof APP; v: 1; at: number; focus?: boolean; chapters: Record<string, Progress> };

/** Every chapter this browser has progress for. */
export function collect(): Bundle {
  const ids = new Set(Object.keys(CHAPTERS));
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const m = localStorage.key(i)?.match(/^te:(ch\d{2})$/);
      if (m) ids.add(m[1]);
    }
  } catch {
    /* storage unavailable */
  }
  const chapters: Record<string, Progress> = {};
  for (const id of [...ids].sort()) {
    const p = storeFor(id).get();
    if (p.updatedAt) chapters[id] = p;
  }
  return { app: APP, v: 1, at: Date.now(), focus: getFocus(), chapters };
}

function union<T>(a: Record<string, T>, b: Record<string, T>, pick: (x: T, y: T) => T): Record<string, T> {
  const out = { ...a };
  for (const [k, y] of Object.entries(b)) out[k] = k in out ? pick(out[k], y) : y;
  return out;
}

const reviewedAt = (c: CardRecord) => c.due - (BOX_DAYS[c.box] ?? 0) * DAY;

/**
 * The best of both devices: a lesson keeps its best run, a question and a flashcard keep their latest answer,
 * a mistake stays only if the device that answered that question last still has it to review.
 * XP can't be added up (both devices may hold the same past), so it keeps the larger total.
 */
export function merge(here: Progress, there: Progress): Progress {
  const last = (p: Progress, id: string) => p.q[id]?.last ?? 0;
  const mistakes: Record<string, number> = {};
  for (const id of new Set([...Object.keys(here.mistakes), ...Object.keys(there.mistakes)])) {
    const src = last(there, id) > last(here, id) ? there : here;
    if (id in src.mistakes) mistakes[id] = src.mistakes[id];
    else if (last(there, id) === last(here, id)) mistakes[id] = there.mistakes[id];
  }
  const exams = [...here.exams];
  for (const e of there.exams) if (!exams.some((x) => x.at === e.at)) exams.push(e);
  return {
    ...empty(),
    v: 2,
    updatedAt: Math.max(here.updatedAt, there.updatedAt),
    xp: Math.max(here.xp, there.xp),
    days: [...new Set([...here.days, ...there.days])].sort(),
    lessons: union(here.lessons, there.lessons, (x, y) => ({
      stars: Math.max(x.stars, y.stars),
      best: Math.max(x.best, y.best),
      runs: Math.max(x.runs, y.runs),
      at: Math.max(x.at, y.at),
    })),
    checkpoints: union(here.checkpoints, there.checkpoints, (x, y) => ({
      ...(y.best / (y.max || 1) > x.best / (x.max || 1) ? y : x),
      runs: Math.max(x.runs, y.runs),
      passed: x.passed || y.passed,
    })),
    q: union(here.q, there.q, (x, y) => (y.last > x.last ? y : x)),
    mistakes,
    cards: union(here.cards, there.cards, (x, y) => (reviewedAt(y) > reviewedAt(x) ? y : x)),
    exams: exams.sort((a, b) => a.at - b.at),
    games: union(here.games, there.games, (x, y) => (y.best / (y.max || 1) > x.best / (x.max || 1) ? y : x)),
    unlockAll: here.unlockAll || there.unlockAll,
  };
}

export type Change = { id: string; before: number; after: number; xp: number };

/** Merge a bundle into this device. Returns lessons done per chapter, before and after. */
export function bringIn(b: Bundle): Change[] {
  const out: Change[] = [];
  for (const [id, p] of Object.entries(b.chapters)) {
    const s = storeFor(id);
    const before = Object.keys(s.get().lessons).length;
    const next = merge(s.get(), { ...empty(), ...p });
    s.replace(next);
    out.push({ id, before, after: Object.keys(next.lessons).length, xp: next.xp });
  }
  if (typeof b.focus === "boolean") setFocus(b.focus);
  return out;
}

// ── Text and file formats ───────────────────────────────────────────────────
async function through(bytes: Uint8Array<ArrayBuffer>, t: CompressionStream | DecompressionStream) {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(t)).arrayBuffer());
}

function toB64url(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Uint8Array<ArrayBuffer> {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export async function encode(b: Bundle): Promise<string> {
  const json = JSON.stringify(b);
  if (typeof CompressionStream === "undefined") return json;
  try {
    return PREFIX + toB64url(await through(new TextEncoder().encode(json), new CompressionStream("gzip")));
  } catch {
    return json;
  }
}

const isObj = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);

function isProgress(p: unknown): p is Progress {
  if (!isObj(p) || p.v !== 2 || typeof p.updatedAt !== "number" || typeof p.xp !== "number") return false;
  const objs = ["lessons", "checkpoints", "q", "mistakes", "cards", "games"];
  return objs.every((k) => p[k] === undefined || isObj(p[k])) && ["days", "exams"].every((k) => p[k] === undefined || Array.isArray(p[k]));
}

export class NotOurs extends Error {}

/** Read a pasted text or a file's content. Throws `NotOurs` when it isn't progress from this course. */
export async function decode(text: string): Promise<Bundle> {
  const t = text.trim();
  if (!t || t.length > MAX_TEXT) throw new NotOurs();
  let b: unknown;
  try {
    const json = t.startsWith(PREFIX)
      ? new TextDecoder().decode(await through(fromB64url(t.slice(PREFIX.length).replace(/\s+/g, "")), new DecompressionStream("gzip")))
      : t;
    b = JSON.parse(json);
  } catch {
    throw new NotOurs();
  }
  if (!isObj(b) || b.app !== APP || b.v !== 1 || !isObj(b.chapters)) throw new NotOurs();
  for (const [id, p] of Object.entries(b.chapters)) if (!/^ch\d{2}$/.test(id) || !isProgress(p)) throw new NotOurs();
  return b as Bundle;
}

export function saveFile(b: Bundle) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(b, null, 1)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `trading-progress-${today()}.json`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Copy inside the click handler (no await before it), or Safari refuses. */
export async function copyText(s: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(s);
    return true;
  } catch {
    /* try the old way */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = s;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;opacity:0";
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

const PROD = "https://learn-trading-woad.vercel.app";
/** Where the other device should open the course (a phone can't reach this Mac's localhost). */
export const siteUrl = () => (/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname) ? PROD : location.origin);
