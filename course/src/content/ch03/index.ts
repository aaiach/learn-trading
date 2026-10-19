// Chapter 3: The Trading Industry (book pp. 32–67). One unit per top-level book section.
import type { Chapter } from "../types.ts";
import { U31 } from "./u31.ts";
import { U32 } from "./u32.ts";
import { U33A_LESSONS, U33A_CHECKPOINT } from "./u33a.ts";
import { U33B_LESSONS, U33B_CHECKPOINT } from "./u33b.ts";
import { U34 } from "./u34.ts";
import { U35 } from "./u35.ts";

export const CH03: Chapter = {
  id: "ch03",
  num: 3,
  title: "The Trading Industry",
  part: "Part I",
  pages: "32–67",
  units: [
    U31,
    U32,
    {
      sec: "3.3",
      title: "Trading Instruments",
      pages: "38–44",
      lessons: [...U33A_LESSONS, ...U33B_LESSONS],
      checkpoint: [...U33A_CHECKPOINT, ...U33B_CHECKPOINT],
    },
    U34,
    U35,
  ].filter((u) => u.lessons.length > 0),
};
