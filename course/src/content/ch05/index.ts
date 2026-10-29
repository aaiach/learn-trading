// Chapter 5: Market Structures (book pp. 89–111). One unit per top-level book section;
// the 5.5 summary and 5.6 points close unit 5.4, as in Ch. 3 and 4.
import type { Chapter } from "../types.ts";
import { U51 } from "./u51.ts";
import { U52 } from "./u52.ts";
import { U53A_CHECKPOINT, U53A_LESSONS } from "./u53a.ts";
import { U53B_CHECKPOINT, U53B_LESSONS } from "./u53b.ts";
import { U54A_CHECKPOINT, U54A_LESSONS } from "./u54a.ts";
import { U54B_CHECKPOINT, U54B_LESSONS } from "./u54b.ts";
import { U54C_CHECKPOINT, U54C_LESSONS } from "./u54c.ts";

export const CH05: Chapter = {
  id: "ch05",
  num: 5,
  title: "Market Structures",
  part: "Part I",
  pages: "89–111",
  units: [
    U51,
    U52,
    {
      sec: "5.3",
      title: "Execution Systems",
      pages: "92–96",
      lessons: [...U53A_LESSONS, ...U53B_LESSONS],
      checkpoint: [...U53A_CHECKPOINT, ...U53B_CHECKPOINT],
    },
    {
      sec: "5.4",
      title: "Market Information Systems",
      pages: "97–111",
      lessons: [...U54A_LESSONS, ...U54B_LESSONS, ...U54C_LESSONS],
      checkpoint: [...U54A_CHECKPOINT, ...U54B_CHECKPOINT, ...U54C_CHECKPOINT],
    },
  ].filter((u) => u.lessons.length > 0),
};
