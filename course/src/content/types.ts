import type { ComponentType } from "react";

/** A verbatim excerpt from the book. `tests/quotes.test.ts` checks every one against the source text. */
export type Cite = {
  /** Book page (e.g. 36) or range ("41-42"). */
  p: number | string;
  /** Book section number the excerpt sits in, e.g. "3.2.2.2". */
  s: string;
  /** Exact words from the book. Shortening is allowed only by quoting a contiguous run. */
  t: string;
  /** Title of the sidebar box, when the excerpt comes from one. */
  box?: string;
  /** Table name, when the excerpt is a table row; checked loosely (every word on the page). */
  table?: string;
};

/** Illustrations are beat-driven: the player passes the current beat and the scene animates to it. */
export type BeatProps = { beat: number };
export type Illustration = ComponentType<BeatProps>;

export type GameResult = { score: number; max: number };
export type GameProps = { onDone: (r: GameResult) => void };
export type Game = ComponentType<GameProps>;

export type Beat = { text: string; cite?: Cite };

/** An optional figure shown above a question (Ornicar-style picture question). */
export type Fig = { illus: Illustration; beat?: number };

// ── Learn steps: one idea per screen ────────────────────────────────────────
export type DefinitionStep = {
  kind: "definition";
  term: string;
  /** Other names the book gives for the same thing. */
  aka?: string[];
  /** Our plain-English definition, one or two short sentences. */
  body: string;
  cite: Cite;
};
export type IdeaStep = { kind: "idea"; title: string; body: string; cite: Cite };
export type QuoteStep = {
  kind: "quote";
  /** One line of context before the quote. */
  lead?: string;
  cite: Cite;
  /** Words to highlight inside the quote. */
  mark?: string[];
};
export type SeeStep = { kind: "see"; title: string; illus: Illustration; beats: Beat[] };
export type RecapStep = { kind: "recap"; title?: string; points: { text: string; cite: Cite }[] };
/** A fact that changed after the book was published. Never mixed into definitions. */
export type TodayStep = { kind: "today"; title: string; body: string; source: string };

export type LearnStep = DefinitionStep | IdeaStep | QuoteStep | SeeStep | RecapStep | TodayStep;

// ── Questions: Check button, then a feedback sheet ──────────────────────────
type Q = { q: string; why: string; cite: Cite; fig?: Fig };
export type ChoiceQ = Q & { kind: "choice"; options: string[]; answer: number };
export type MultiQ = Q & { kind: "multi"; options: string[]; answer: number[] };
export type TrueFalseQ = Q & { kind: "truefalse"; answer: boolean };
/** `q` contains one `___` per blank; `answer[i]` fills blank i; `bank` holds answers plus distractors. */
export type FillQ = Q & { kind: "fill"; bank: string[]; answer: string[] };
export type NumberQ = Q & {
  kind: "number";
  answer: number;
  tol?: number;
  prefix?: string;
  unit?: string;
  /** True when the numbers are ours, not the book's. */
  illustrative?: boolean;
};
/** `items` are listed in the correct order; the player shuffles them. */
export type OrderQ = Q & { kind: "order"; items: string[] };

export type Question = ChoiceQ | MultiQ | TrueFalseQ | FillQ | NumberQ | OrderQ;

// ── Activities: self-paced, give inline feedback, then Continue ─────────────
export type ClassifyStep = {
  kind: "classify";
  q: string;
  buckets: string[];
  items: { text: string; bucket: number; why?: string }[];
  cite: Cite;
};
export type MatchStep = { kind: "match"; q: string; pairs: [string, string][]; cite: Cite };
export type GameStep = { kind: "game"; id: string; title: string; brief: string; game: Game };

export type Activity = ClassifyStep | MatchStep | GameStep;

export type Step = LearnStep | Question | Activity;

export type Lesson = {
  /** Stable id, e.g. "3.1-long-short". Used for progress. */
  id: string;
  /** Book section this lesson teaches, e.g. "3.2.2.1". */
  sec: string;
  title: string;
  pages: string;
  /** How important the lesson is for the learner (see `IMPORTANCE` in src/ds/kinds.ts). Every real lesson has one. */
  imp?: Imp;
  steps: Step[];
};

/** 3 = must know (basics every experienced trader knows), 2 = should know, 1 = nice to know. */
export type Imp = 1 | 2 | 3;

export type Unit = {
  /** Book section, e.g. "3.1". */
  sec: string;
  /** The book's own heading, in its words. */
  title: string;
  pages: string;
  lessons: Lesson[];
  /** Extra questions used only in the unit checkpoint (lesson questions are sampled too). */
  checkpoint?: Question[];
};

/** The books in the course (see `src/content/books.ts`). */
export type BookId = "harris" | "valuation";

export type Chapter = {
  id: string;
  /** Which book; Harris when absent. */
  book?: BookId;
  /**
   * A reading chapter: the book's key passages one per screen, a few quick checks per lesson, scenes only
   * where the book has numbers to show, and no mock exam.
   */
  read?: boolean;
  num: number;
  title: string;
  part: string;
  pages: string;
  units: Unit[];
};

export const QUESTION_KINDS = ["choice", "multi", "truefalse", "fill", "number", "order"] as const;
export const isQuestion = (s: Step): s is Question => (QUESTION_KINDS as readonly string[]).includes(s.kind);
export const isActivity = (s: Step): s is Activity => s.kind === "classify" || s.kind === "match" || s.kind === "game";
