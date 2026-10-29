// The books in the course. Each has its own table of contents and chapter ids; progress is kept per chapter.
import { createContext, useContext, useSyncExternalStore } from "react";
import type { BookId, Chapter } from "./types.ts";
import { TOC, chapterId, type TocPart } from "./toc.ts";

export type Book = {
  id: BookId;
  title: string;
  /** Shown under the title on the home page. */
  sub: string;
  /** Credited under every excerpt. */
  author: string;
  toc: TocPart[];
  chapterId: (num: number) => string;
};

// Valuation, 7th edition (2020), in its own words. Pages are PDF pages of source/valuation/valuation.pdf
// (the e-book has no printed page numbers).
const VALUATION_TOC: TocPart[] = [
  {
    part: "Part One",
    title: "Foundations of Value",
    chapters: [
      { num: 1, title: "Why Value Value?", page: 50 },
      { num: 2, title: "Finance in a Nutshell", page: 68 },
      { num: 3, title: "Fundamental Principles of Value Creation", page: 81 },
      { num: 4, title: "Risk and the Cost of Capital", page: 116 },
      { num: 5, title: "The Alchemy of Stock Market Performance", page: 134 },
      { num: 6, title: "Valuation of ESG and Digital Initiatives", page: 153 },
      { num: 7, title: "The Stock Market Is Smarter Than You Think", page: 172 },
      { num: 8, title: "Return on Invested Capital", page: 212 },
      { num: 9, title: "Growth", page: 248 },
    ],
  },
  {
    part: "Part Two",
    title: "Core Valuation Techniques",
    chapters: [
      { num: 10, title: "Frameworks for Valuation", page: 274 },
      { num: 11, title: "Reorganizing the Financial Statements", page: 315 },
      { num: 12, title: "Analyzing Performance", page: 361 },
      { num: 13, title: "Forecasting Performance", page: 390 },
      { num: 14, title: "Estimating Continuing Value", page: 429 },
      { num: 15, title: "Estimating the Cost of Capital", page: 456 },
      { num: 16, title: "Moving from Enterprise Value to Value per Share", page: 497 },
      { num: 17, title: "Analyzing the Results", page: 527 },
      { num: 18, title: "Using Multiples", page: 540 },
      { num: 19, title: "Valuation by Parts", page: 571 },
    ],
  },
  {
    part: "Part Three",
    title: "Advanced Valuation Techniques",
    chapters: [
      { num: 20, title: "Taxes", page: 596 },
      { num: 21, title: "Nonoperating Items, Provisions, and Reserves", page: 615 },
      { num: 22, title: "Leases", page: 636 },
      { num: 23, title: "Retirement Obligations", page: 654 },
      { num: 24, title: "Measuring Performance in Capital-Light Businesses", page: 668 },
      { num: 25, title: "Alternative Ways to Measure Return on Capital", page: 688 },
      { num: 26, title: "Inflation", page: 701 },
      { num: 27, title: "Cross-Border Valuation", page: 720 },
    ],
  },
  {
    part: "Part Four",
    title: "Managing for Value",
    chapters: [
      { num: 28, title: "Corporate Portfolio Strategy", page: 746 },
      { num: 29, title: "Strategic Management: Analytics", page: 772 },
      { num: 30, title: "Strategic Management: Mindsets and Behaviors", page: 800 },
      { num: 31, title: "Mergers and Acquisitions", page: 818 },
      { num: 32, title: "Divestitures", page: 856 },
      { num: 33, title: "Capital Structure, Dividends, and Share Repurchases", page: 882 },
      { num: 34, title: "Investor Communications", page: 928 },
    ],
  },
  {
    part: "Part Five",
    title: "Special Situations",
    chapters: [
      { num: 35, title: "Emerging Markets", page: 958 },
      { num: 36, title: "High-Growth Companies", page: 982 },
      { num: 37, title: "Cyclical Companies", page: 1001 },
      { num: 38, title: "Banks", page: 1012 },
      { num: 39, title: "Flexibility", page: 1048 },
    ],
  },
];

export const BOOKS: Record<BookId, Book> = {
  harris: {
    id: "harris",
    title: "Trading & Exchanges",
    sub: "Larry Harris · Market Microstructure for Practitioners",
    author: "Harris",
    toc: TOC,
    chapterId,
  },
  valuation: {
    id: "valuation",
    title: "Valuation",
    sub: "McKinsey & Company · Koller, Goedhart, Wessels",
    author: "Koller et al.",
    toc: VALUATION_TOC,
    chapterId: (num) => `va${String(num).padStart(2, "0")}`,
  },
};

export const BOOK_IDS = Object.keys(BOOKS) as BookId[];

export const bookOf = (ch: Chapter): Book => BOOKS[ch.book ?? "harris"];

/** The book of the chapter on screen; excerpts credit its author. */
export const BookContext = createContext<Book>(BOOKS.harris);
export const useBook = () => useContext(BookContext);

// The book the home page shows: the last one opened (a per-device convenience).
const KEY = "te-book";
const subs = new Set<() => void>();
let shelf: BookId = read();

function read(): BookId {
  try {
    const v = localStorage.getItem(KEY);
    return v && v in BOOKS ? (v as BookId) : "harris";
  } catch {
    return "harris";
  }
}

export function setShelf(id: BookId) {
  if (id === shelf) return;
  shelf = id;
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* ignore */
  }
  subs.forEach((f) => f());
}

export function useShelf(): BookId {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => shelf,
  );
}
