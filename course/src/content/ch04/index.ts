// Chapter 4: Orders and Order Properties (book pp. 68–88). One unit per top-level book section.
import type { Chapter } from "../types.ts";
import { U41 } from "./u41.ts";
import { U42 } from "./u42.ts";
import { U43 } from "./u43.ts";
import { U44A_CHECKPOINT, U44A_LESSONS } from "./u44a.ts";
import { U44B_CHECKPOINT, U44B_LESSONS } from "./u44b.ts";
import { U45 } from "./u45.ts";
import { U46 } from "./u46.ts";
import { U47 } from "./u47.ts";
import { U48 } from "./u48.ts";
import { U49 } from "./u49.ts";
import { U410 } from "./u410.ts";
import { U411 } from "./u411.ts";

export const CH04: Chapter = {
  id: "ch04",
  num: 4,
  title: "Orders and Order Properties",
  part: "Part I",
  pages: "68–88",
  units: [
    U41,
    U42,
    U43,
    {
      sec: "4.4",
      title: "Limit Orders",
      pages: "73–78",
      lessons: [...U44A_LESSONS, ...U44B_LESSONS],
      checkpoint: [...U44A_CHECKPOINT, ...U44B_CHECKPOINT],
    },
    U45,
    U46,
    U47,
    U48,
    U49,
    U410,
    U411,
  ].filter((u) => u.lessons.length > 0),
};
