// Every excerpt shown to the learner must appear word for word on the cited page,
// and every exercise must be answerable. Run: npm test
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CHAPTERS } from "../src/course.ts";
import type { Cite, Step } from "../src/content/types.ts";
import { isQuestion } from "../src/content/types.ts";
import { qid, questionsOf } from "../src/content/ids.ts";
import { focusView } from "../src/focus.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
// A git worktree (each Orca session) gets no git-ignored files, so the book may only be in the main checkout.
function bookDir(): string {
  const local = join(HERE, "..", "..", "source", "chapters");
  if (existsSync(local)) return local;
  try {
    const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { cwd: HERE, encoding: "utf8" });
    return join(dirname(common.trim()), "source", "chapters");
  } catch {
    return local;
  }
}
const ROOT = bookDir();
// `tables`: optional hand transcriptions (tagged <<p.N>>) of rotated tables that pdftotext garbles.
// Valuation's text (tagged by PDF page) sits next to Harris's, in source/valuation/; it needs no raw copy.
const SOURCES: Record<string, { layout: string; raw?: string; first: number; tables?: string }> = {
  ch03: { layout: "03-the-trading-industry.txt", raw: "03-raw.txt", first: 32 },
  ch04: { layout: "04-orders-and-order-properties.txt", raw: "04-raw.txt", first: 68, tables: "04-tables.txt" },
  ch05: { layout: "05-market-structures.txt", raw: "05-raw.txt", first: 89, tables: "05-tables.txt" },
  va01: { layout: "../valuation/01-why-value-value.txt", first: 50 },
  va02: { layout: "../valuation/02-finance-in-a-nutshell.txt", first: 68 },
};
// ONLY=4.3 npm test → check only units whose section starts with 4.3 (handy while one unit is being written).
const ONLY = process.env.ONLY;

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

for (const [id, full] of Object.entries(CHAPTERS)) {
  const ch = ONLY ? { ...full, units: full.units.filter((u) => u.sec === ONLY || u.sec.startsWith(`${ONLY}.`)) } : full;
  if (ONLY && !ch.units.length) continue;
  const src = SOURCES[id];
  // The book text lives in ../source, which is never published; without it the quote check is skipped.
  const haveSource = existsSync(join(ROOT, src.layout)) && (!src.raw || existsSync(join(ROOT, src.raw)));
  const layout = haveSource ? pagesFromLayout(readFileSync(join(ROOT, src.layout), "utf8")) : new Map<number, string>();
  const raw = haveSource && src.raw ? pagesFromRaw(readFileSync(join(ROOT, src.raw), "utf8"), src.first) : new Map<number, string>();
  if (haveSource && src.tables && existsSync(join(ROOT, src.tables)))
    for (const [p, t] of pagesFromLayout(readFileSync(join(ROOT, src.tables), "utf8"))) layout.set(p, `${layout.get(p) ?? ""}\n${t}`);

  describe.skipIf(!haveSource)(`${id} quotes`, () => {
    const cites: { cite: Cite; path: string }[] = [];
    collectCites(ch, id, cites);

    it("has quotes", () => expect(cites.length).toBeGreaterThan(ONLY ? 0 : 20));

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
      // Harris numbers his sections. Valuation only names them: a cite gives the chapter number (its opening
      // pages) or a heading, and every heading must be the book's, word for word.
      const named = full.book === "valuation";
      const text = norm([...layout.values()].join(""));
      const isHeading = (s: string) => /^\d+$/.test(s) || text.includes(norm(s));
      const bad = cites
        .filter(({ cite }) => (named ? !isHeading(cite.s) : !/^\d+(\.\d+)*$/.test(cite.s)))
        .map(({ path, cite }) => `${path}: ${cite.s}`);
      if (named) for (const s of secs) if (!isHeading(s)) bad.push(`heading not in the book: ${s}`);
      expect(bad, bad.join("\n")).toEqual([]);
    });
  });

  describe(`${id} structure`, () => {
    const lessons = ch.units.flatMap((u) => u.lessons);

    it("lesson ids are unique", () => {
      const ids = lessons.map((l) => l.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("every lesson has an importance rating (1–3)", () => {
      const bad = lessons.filter((l) => l.imp !== 1 && l.imp !== 2 && l.imp !== 3).map((l) => l.id);
      expect(bad, bad.join("\n")).toEqual([]);
    });

    it("every lesson teaches, illustrates and tests", () => {
      const bad: string[] = [];
      // a reading chapter shows scenes only where the book has numbers, and checks lightly
      const minTests = full.read ? 2 : 3;
      for (const l of lessons) {
        const kinds = new Set(l.steps.map((s) => s.kind));
        const learns = l.steps.filter((s) => ["definition", "idea", "quote"].includes(s.kind)).length;
        const tests = l.steps.filter((s) => isQuestion(s) || s.kind === "classify" || s.kind === "match" || s.kind === "game").length;
        if (!learns) bad.push(`${l.id}: no definition/idea/quote`);
        if (!kinds.has("see") && !full.read) bad.push(`${l.id}: no "see" illustration`);
        if (tests < minTests) bad.push(`${l.id}: only ${tests} practice steps`);
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

    it("\"must know only\" keeps every lesson rated 3, in book order, with enough questions", () => {
      const v = focusView(full, true);
      const want = full.units.flatMap((u) => u.lessons.filter((l) => l.imp === 3).map((l) => l.id));
      expect(v.units.flatMap((u) => u.lessons.map((l) => l.id))).toEqual(want);
      expect(want.length).toBeGreaterThan(0);
      const thin = v.units.filter((u) => u.lessons.length && questionsOf(v, (_l, s) => s === u.sec).length < 5).map((u) => u.sec);
      expect(thin, `checkpoints under 5 questions: ${thin.join(", ")}`).toEqual([]);
      if (!full.read) expect(questionsOf(v).length).toBeGreaterThanOrEqual(40);
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
