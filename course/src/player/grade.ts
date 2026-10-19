import type { Question } from "../content/types.ts";

/** What the learner has entered so far, per question kind. */
export type Answer =
  | { kind: "choice"; pick: number | null }
  | { kind: "multi"; picks: number[] }
  | { kind: "truefalse"; pick: boolean | null }
  | { kind: "fill"; slots: (string | null)[] }
  | { kind: "number"; text: string }
  | { kind: "order"; seq: number[] };

export function blankAnswer(q: Question): Answer {
  switch (q.kind) {
    case "choice":
      return { kind: "choice", pick: null };
    case "multi":
      return { kind: "multi", picks: [] };
    case "truefalse":
      return { kind: "truefalse", pick: null };
    case "fill":
      return { kind: "fill", slots: q.answer.map(() => null) };
    case "number":
      return { kind: "number", text: "" };
    case "order":
      return { kind: "order", seq: [] };
  }
}

export function parseNum(s: string): number | null {
  const t = s.replace(/[\s,$€£%]/g, "").replace(/[−–]/g, "-");
  if (!t || !/^-?\d*\.?\d+$/.test(t)) return null;
  return Number(t);
}

export function isComplete(q: Question, a: Answer): boolean {
  switch (a.kind) {
    case "choice":
      return a.pick !== null;
    case "multi":
      return a.picks.length > 0;
    case "truefalse":
      return a.pick !== null;
    case "fill":
      return a.slots.every((s) => s !== null);
    case "number":
      return parseNum(a.text) !== null;
    case "order":
      return q.kind === "order" && a.seq.length === q.items.length;
  }
}

export function grade(q: Question, a: Answer): boolean {
  switch (q.kind) {
    case "choice":
      return a.kind === "choice" && a.pick === q.answer;
    case "multi": {
      if (a.kind !== "multi") return false;
      const want = [...q.answer].sort();
      const got = [...a.picks].sort();
      return want.length === got.length && want.every((v, i) => v === got[i]);
    }
    case "truefalse":
      return a.kind === "truefalse" && a.pick === q.answer;
    case "fill":
      return a.kind === "fill" && q.answer.every((w, i) => a.slots[i] === w);
    case "number": {
      if (a.kind !== "number") return false;
      const n = parseNum(a.text);
      if (n === null) return false;
      const tol = q.tol ?? Math.max(1e-9, Math.abs(q.answer) * 0.001);
      return Math.abs(n - q.answer) <= tol;
    }
    case "order":
      return a.kind === "order" && a.seq.every((v, i) => v === i);
  }
}

export function fmtNum(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

/** The right answer, in words, for the feedback sheet. */
export function rightAnswer(q: Question): string {
  switch (q.kind) {
    case "choice":
      return q.options[q.answer];
    case "multi":
      return q.answer.map((i) => q.options[i]).join(" · ");
    case "truefalse":
      return q.answer ? "True" : "False";
    case "fill":
      return q.answer.join(" · ");
    case "number":
      return `${q.prefix ?? ""}${fmtNum(q.answer)}${q.unit ? ` ${q.unit}` : ""}`;
    case "order":
      return q.items.map((t, i) => `${i + 1}. ${t}`).join("  ");
  }
}
