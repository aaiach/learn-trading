// Moving progress between devices: the pasted text round-trips, foreign text is refused, merging loses nothing.
import { describe, expect, it } from "vitest";
import { type Progress, BOX_DAYS, DAY, empty } from "../src/state/progress.ts";
import { type Bundle, NotOurs, decode, encode, merge } from "../src/state/transfer.ts";

const T = 1_760_000_000_000;
const prog = (over: Partial<Progress>): Progress => ({ ...empty(), updatedAt: T, ...over });

describe("transfer", () => {
  it("round-trips through the copied text", async () => {
    const b: Bundle = {
      app: "trading-and-exchanges",
      v: 1,
      at: T,
      focus: true,
      chapters: { ch03: prog({ xp: 120, days: ["2026-10-20"], lessons: { "3.1-a": { stars: 3, best: 10, runs: 1, at: T } } }) },
    };
    const text = await encode(b);
    expect(text.startsWith("te1:")).toBe(true);
    expect(await decode(text)).toEqual(b);
    // a messaging app may wrap the text over lines; the file format is plain JSON
    expect(await decode(text.replace(/(.{40})/g, "$1\n"))).toEqual(b);
    expect(await decode(JSON.stringify(b, null, 1))).toEqual(b);
  });

  it("refuses text that isn't progress from this course", async () => {
    for (const bad of ["", "hello", "te1:zzzz", "{}", JSON.stringify({ app: "trading-and-exchanges", v: 1, chapters: { x: {} } })])
      await expect(decode(bad)).rejects.toBeInstanceOf(NotOurs);
  });

  it("merges two devices without losing anything", () => {
    const mac = prog({
      updatedAt: T + 5,
      xp: 300,
      days: ["2026-10-19", "2026-10-20"],
      lessons: { a: { stars: 3, best: 10, runs: 1, at: T }, b: { stars: 1, best: 4, runs: 1, at: T } },
      q: { q1: { right: 1, wrong: 1, last: T + 1, lastOk: true }, q2: { right: 0, wrong: 1, last: T + 1, lastOk: false } },
      mistakes: { q1: 1, q2: 0 },
      cards: { c1: { box: 2, due: T + BOX_DAYS[2] * DAY } },
      exams: [{ at: T, score: 30, max: 40, passed: false }],
    });
    const phone = prog({
      updatedAt: T + 9,
      xp: 340,
      days: ["2026-10-20", "2026-10-21"],
      lessons: { b: { stars: 3, best: 8, runs: 2, at: T + 9 }, c: { stars: 2, best: 6, runs: 1, at: T + 9 } },
      // q1 answered right again on the phone, later: its mistake is cleared there
      q: { q1: { right: 2, wrong: 1, last: T + 8, lastOk: true } },
      mistakes: {},
      // reviewed later on the phone and missed: back to box 0
      cards: { c1: { box: 0, due: T + 9 } },
      exams: [{ at: T + 7, score: 36, max: 40, passed: true }],
    });
    const m = merge(mac, phone);
    expect(Object.keys(m.lessons).sort()).toEqual(["a", "b", "c"]);
    expect(m.lessons.b).toEqual({ stars: 3, best: 8, runs: 2, at: T + 9 });
    expect(m.xp).toBe(340);
    expect(m.days).toEqual(["2026-10-19", "2026-10-20", "2026-10-21"]);
    expect(m.q.q1.right).toBe(2);
    expect(m.mistakes).toEqual({ q2: 0 });
    expect(m.cards.c1.box).toBe(0);
    expect(m.exams.map((e) => e.score)).toEqual([30, 36]);
    expect(m.updatedAt).toBe(T + 9);
    // bringing the same progress in twice changes nothing
    expect(merge(m, m)).toEqual(m);
    expect(merge(empty(), mac)).toEqual({ ...mac });
  });
});
