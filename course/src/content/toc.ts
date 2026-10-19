// The book's table of contents (p. xi–xii), in its own words.
export type TocChapter = { num: number; title: string; page: number };
export type TocPart = { part: string; title: string; chapters: TocChapter[] };

export const TOC: TocPart[] = [
  {
    part: "",
    title: "Opening",
    chapters: [
      { num: 1, title: "Introduction", page: 3 },
      { num: 2, title: "Trading Stories", page: 11 },
    ],
  },
  {
    part: "Part I",
    title: "The Structure of Trading",
    chapters: [
      { num: 3, title: "The Trading Industry", page: 32 },
      { num: 4, title: "Orders and Order Properties", page: 68 },
      { num: 5, title: "Market Structures", page: 89 },
      { num: 6, title: "Order-driven Markets", page: 112 },
      { num: 7, title: "Brokers", page: 139 },
    ],
  },
  {
    part: "Part II",
    title: "The Benefits of Trade",
    chapters: [
      { num: 8, title: "Why People Trade", page: 176 },
      { num: 9, title: "Good Markets", page: 202 },
    ],
  },
  {
    part: "Part III",
    title: "Speculators",
    chapters: [
      { num: 10, title: "Informed Traders and Market Efficiency", page: 222 },
      { num: 11, title: "Order Anticipators", page: 245 },
      { num: 12, title: "Bluffers and Market Manipulation", page: 259 },
    ],
  },
  {
    part: "Part IV",
    title: "Liquidity Suppliers",
    chapters: [
      { num: 13, title: "Dealers", page: 278 },
      { num: 14, title: "Bid/Ask Spreads", page: 297 },
      { num: 15, title: "Block Traders", page: 322 },
      { num: 16, title: "Value Traders", page: 338 },
      { num: 17, title: "Arbitrageurs", page: 347 },
      { num: 18, title: "Buy-Side Traders", page: 380 },
    ],
  },
  {
    part: "Part V",
    title: "Origins of Liquidity and Volatility",
    chapters: [
      { num: 19, title: "Liquidity", page: 394 },
      { num: 20, title: "Volatility", page: 410 },
    ],
  },
  {
    part: "Part VI",
    title: "Evaluation and Prediction",
    chapters: [
      { num: 21, title: "Liquidity and Transaction Cost Measurement", page: 420 },
      { num: 22, title: "Performance Evaluation and Prediction", page: 442 },
    ],
  },
  {
    part: "Part VII",
    title: "Market Structures",
    chapters: [
      { num: 23, title: "Index and Portfolio Markets", page: 484 },
      { num: 24, title: "Specialists", page: 494 },
      { num: 25, title: "Internalization, Preferencing, and Crossing", page: 514 },
      { num: 26, title: "Competition Within and Among Markets", page: 524 },
      { num: 27, title: "Floor Versus Automated Trading Systems", page: 543 },
      { num: 28, title: "Bubbles, Crashes, and Circuit Breakers", page: 555 },
      { num: 29, title: "Insider Trading", page: 584 },
    ],
  },
];

export const chapterId = (num: number) => `ch${String(num).padStart(2, "0")}`;
