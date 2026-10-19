// Every excerpt shown to the learner must appear word for word on the cited page,
// and every exercise must be answerable. Run: npm test
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CHAPTERS } from "../src/course.ts";
import type { Cite, Step } from "../src/content/types.ts";
import { isQuestion } from "../src/content/types.ts";
import { qid } from "../src/content/ids.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "source", "chapters");
const SOURCES: Record<string, { layout: string; raw: string; first: number }> = {
  ch03: { layout: "03-the-trading-industry.txt", raw: "03-raw.txt", first: 32 },
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const words = (s: string) => s.toLowerCase().match(/[a-z0-9]+/g) ?? [];

function pagesFromLayout(text: string): Map<number, string> {
  const m = new Map<number, string>();
  const re = /<<p\.(\d+)>>\n([\s\S]*?)(?=<<p\.\d+>>|$)/g;
  for (let x = re.exec(text); x; x = re.exec(text)) m.set(Number(x[1]), x[2]);
  return m;
}

function pagesFromRaw(text: string, first: number): Map<number, string> {
  const m = new Map<number, string>();
  text.split("\f").forEach((chunk, i) => m.set(first + i, chunk));
  return m;
}

function pageRange(p: number | string): number[] {
  if (typeof p === "number") return [p];
  const [a, b] = p.split("-").map(Number);
  return Array.from({ length: (b || a) - a + 1 }, (_, i) => a + i);
}

function collectCites(node: unknown, path: string, out: { cite: Cite; path: string }[], seen = new Set<unknown>()) {
  if (!node || typeof node !== "object" || seen.has(node)) return;
  seen.add(node);
  const o = node as Record<string, unknown>;
  if (typeof o.t === "string" && typeof o.s === "string" && (typeof o.p === "number" || typeof o.p === "string")) {
    out.push({ cite: o as unknown as Cite, path });
    return;
  }
  for (const [k, v] of Object.entries(o)) if (typeof v !== "function") collectCites(v, `${path}.${k}`, out, seen);
}

for (const [id, ch] of Object.entries(CHAPTERS)) {
  const src = SOURCES[id];
  // The book text lives in ../source, which is never published; without it the quote check is skipped.
  const haveSource = existsSync(join(ROOT, src.layout)) && existsSync(join(ROOT, src.raw));
  const layout = haveSource ? pagesFromLayout(readFileSync(join(ROOT, src.layout), "utf8")) : new Map<number, string>();
  const raw = haveSource ? pagesFromRaw(readFileSync(join(ROOT, src.raw), "utf8"), src.first) : new Map<number, string>();

  describe.skipIf(!haveSource)(`${id} quotes`, () => {
    const cites: { cite: Cite; path: string }[] = [];
    collectCites(ch, id, cites);

    it("has quotes", () => expect(cites.length).toBeGreaterThan(20));

    it("every quote is verbatim on its cited page", () => {
      const bad: string[] = [];
      for (const { cite, path } of cites) {
        const pr = pageRange(cite.p);
        const cands: string[] = [];
        for (const p of pr) cands.push(layout.get(p) ?? "", raw.get(p) ?? "");
        if (pr.length > 1) {
          cands.push(pr.map((p) => layout.get(p) ?? "").join(""));
          cands.push(pr.map((p) => raw.get(p) ?? "").join(""));
        }
        let ok: boolean;
        if (cite.table) {
          const pool = new Set(cands.flatMap(words));
          ok = words(cite.t).every((w) => pool.has(w));
        } else {
          const t = norm(cite.t);
          ok = cands.some((c) => norm(c).includes(t));
        }
        if (!ok) {
          const t = norm(cite.t);
          const where = [...layout.entries(), ...raw.entries()].filter(([, c]) => norm(c).includes(t)).map(([p]) => p);
          bad.push(`${path} (p.${cite.p}${where.length ? `, found on p.${[...new Set(where)].join("/")}` : ", NOT FOUND"}): ${cite.t.slice(0, 90)}`);
        }
      }
      expect(bad, bad.join("\n")).toEqual([]);
    });

    it("section numbers exist in the chapter", () => {
      const secs = new Set<string>();
      for (const u of ch.units) {
        secs.add(u.sec);
        for (const l of u.lessons) secs.add(l.sec);
      }
      const bad = cites.filter(({ cite }) => !/^\d+(\.\d+)*$/.test(cite.s)).map(({ path, cite }) => `${path}: ${cite.s}`);
      expect(bad, bad.join("\n")).toEqual([]);
    });
  });

  describe(`${id} structure`, () => {
    const lessons = ch.units.flatMap((u) => u.lessons);

    it("lesson ids are unique", () => {
      const ids = lessons.map((l) => l.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("every lesson teaches, illustrates and tests", () => {
      const bad: string[] = [];
      for (const l of lessons) {
        const kinds = new Set(l.steps.map((s) => s.kind));
        const learns = l.steps.filter((s) => ["definition", "idea", "quote"].includes(s.kind)).length;
        const tests = l.steps.filter((s) => isQuestion(s) || s.kind === "classify" || s.kind === "match" || s.kind === "game").length;
        if (!learns) bad.push(`${l.id}: no definition/idea/quote`);
        if (!kinds.has("see")) bad.push(`${l.id}: no "see" illustration`);
        if (tests < 3) bad.push(`${l.id}: only ${tests} practice steps`);
        if (l.steps[l.steps.length - 1].kind !== "recap") bad.push(`${l.id}: last step should be a recap`);
      }
      expect(bad, bad.join("\n")).toEqual([]);
    });

    it("question ids are unique", () => {
      const ids: string[] = [];
      for (const l of lessons) for (const s of l.steps) if (isQuestion(s)) ids.push(qid(l.id, s));
      const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
      expect(dup).toEqual([]);
    });

    it("every exercise is answerable", () => {
      const bad: string[] = [];
      const check = (where: string, s: Step) => {
        switch (s.kind) {
          case "choice":
            if (s.answer < 0 || s.answer >= s.options.length) bad.push(`${where}: answer out of range`);
            if (new Set(s.options).size !== s.options.length) bad.push(`${where}: duplicate options`);
            break;
          case "multi":
            if (!s.answer.length || s.answer.some((a) => a < 0 || a >= s.options.length)) bad.push(`${where}: bad answers`);
            break;
          case "fill": {
            const blanks = s.q.split("___").length - 1;
            if (blanks !== s.answer.length) bad.push(`${where}: ${blanks} blanks but ${s.answer.length} answers`);
            if (s.answer.some((a) => !s.bank.includes(a))) bad.push(`${where}: answer missing from bank`);
            if (new Set(s.bank).size !== s.bank.length) bad.push(`${where}: duplicate bank words`);
            if (s.bank.length < s.answer.length + 2) bad.push(`${where}: needs at least 2 distractors`);
            break;
          }
          case "order":
            if (s.items.length < 3) bad.push(`${where}: order needs 3+ items`);
            break;
          case "classify":
            if (s.items.some((it) => it.bucket < 0 || it.bucket >= s.buckets.length)) bad.push(`${where}: bucket out of range`);
            if (s.buckets.length > 4) bad.push(`${where}: more than 4 buckets`);
            if (s.items.length < 4) bad.push(`${where}: classify needs 4+ items`);
            break;
          case "match":
            if (s.pairs.length < 3 || s.pairs.length > 6) bad.push(`${where}: match needs 3–6 pairs`);
            break;
          case "see":
            if (s.beats.length < 2) bad.push(`${where}: see needs 2+ beats`);
            break;
        }
      };
      for (const l of lessons) l.steps.forEach((s, i) => check(`${l.id}[${i}]`, s));
      for (const u of ch.units) (u.checkpoint ?? []).forEach((s, i) => check(`cp-${u.sec}[${i}]`, s));
      expect(bad, bad.join("\n")).toEqual([]);
    });

    it("each unit has enough questions for a checkpoint", () => {
      const bad: string[] = [];
      for (const u of ch.units) {
        const n = u.lessons.flatMap((l) => l.steps).filter(isQuestion).length + (u.checkpoint?.length ?? 0);
        if (n < 12) bad.push(`${u.sec}: only ${n} questions`);
      }
      expect(bad, bad.join("\n")).toEqual([]);
    });
  });
}
