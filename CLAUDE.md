# Trading and Exchanges — interactive course

Source: Larry Harris, *Trading and Exchanges: Market Microstructure for Practitioners* (657 pp., 29 chapters, 7 parts).
One interactive course per chapter, in a local React app (`course/`). The learner wants to learn fast: no
storytelling, hands-on practice immediately, constant testing.

## What the learner asked for (2026-10-19)
- Ornicar-style (French driving-theory app): many small steps, **one element per screen**, the feeling of progressing.
- Each concept follows **learn → see it → practice**. Gamified: XP, streaks, stars, combos, checkpoints, a mock exam.
- A standard design system where the **kind of screen is always obvious** (definition, quote, illustration, game…).
- Clean motion that illustrates the concept. Local React, not claude.ai artifacts.
- History: a claude.ai artifact and a first React version were deleted; the user found their animations odd.

## Non-negotiable content rules
- Follow the book's structure and numbering exactly (Part → chapter → 3.2.2.1 …) and use its vocabulary.
- Every learn screen and every question carries a verbatim excerpt (`Cite`: page, section, exact text, optional box/table).
  Definitions and explanations are our own words; quotes are the book's.
- `npm test` checks every excerpt word for word against `source/chapters/` (punctuation and case ignored) and checks
  that every exercise is answerable. Never ship a failing quote.
- Numbers that aren't in the book are flagged (`illustrative: true` on number questions, "illustrative" in scenes).
- Facts that changed after publication (2003) go in `today` steps ("Not in the book · today"), never in definitions.

## Design system (`course/src/ds/kinds.ts` is the source of truth)
Each screen kind has one colour, icon and label. Green and red are reserved for right/wrong; the primary button is ink.
| Kind | Label | Tone | Step kinds |
|---|---|---|---|
| Definition | DEFINITION | blue | `definition` |
| Key idea | KEY IDEA | violet | `idea` |
| Book excerpt | FROM THE BOOK | sepia, serif italic | `quote` (and every `BookQuote` block) |
| Illustration | SEE IT | teal | `see` (beat-driven scene) |
| Practice | PRACTICE · verb | orange | `choice` `multi` `truefalse` `fill` `number` `order` `classify` `match` |
| Game | GAME | pink | `game` |
| Recap | REMEMBER | slate | `recap` (last step of every lesson) |
| Update | NOT IN THE BOOK · TODAY | grey, dashed | `today` |

## Content model (`course/src/content/types.ts`)
Chapter → units (top-level book sections, e.g. 3.1) → lessons (subsections, 8–15 steps) → steps.
- A lesson: 1–3 learn steps, a `see` illustration, then ≥3 practice steps; repeat; end with `recap`.
- Copy is short: a definition body is one or two sentences. Use `**bold**` for the key words.
- Questions: wrong answers come back at the end of the lesson (max twice) and go to "Fix your mistakes".
- Each unit needs ≥12 questions (lessons + `checkpoint` extras) for its checkpoint; the exam draws 40 from all units.
- `fill`: one `___` per blank, ≥2 distractors, unique bank words. `classify`: ≤4 buckets. `match`: 3–6 short pairs.

## Lesson importance (`imp` on every lesson; asked for 2026-10-20)
Top priority for the learner: the vocabulary and definitions to sound fluent in finance. Hard rule: never skip the basics
every experienced trader knows. (The learner's personal context is kept out of this public repo.)
- Rate per **lesson**, not per screen: `imp: 3 | 2 | 1` → "Must know" / "Should know" / "Nice to know"
  (`IMPORTANCE` in `src/ds/kinds.ts`). Shown as 1–3 rising bars on the map and in the lesson popover; stars stay for
  results. Nothing is reordered.
- "Must know only" switch (home page only, asked for 2026-10-20; one setting for all chapters, `src/focus.ts`):
  `focusView(ch, on)` keeps lessons rated 3. Map, unlock order, checkpoints, exam, Quick 10, mastery rings and the
  home card all use it. Either way it must feel like the whole course: never show hidden counts or "must know only"
  labels; a unit with no must-know lessons simply doesn't appear. Checkpoint extras stay if they cite a kept
  lesson's section (or a section no lesson owns). `npm test` checks every unit kept has ≥5
  checkpoint questions and the exam can draw 40.
- 3 = basics every experienced trader knows cold, and the vocabulary they'd be judged on by investors, brokers and other traders.
- 2 = useful when you run money: investors, risk, custody, trading tools. U.S. regulator names (SEC, CFTC, FINRA)
  sit here.
- 1 = history, narrow U.S. rules, rare cases. Never down-rate a lesson for not fitting a market or style.
- `npm test` fails if a lesson has no rating.

## Motion rules
- Vocabulary in `course/src/motion/tokens.ts` (`spring.ui/soft/travel/fill`, `screen`, `EASE_*`) and `AutoHeight`/`Swap`.
- Scenes (`course/src/scene/index.tsx`): `Stage` (400 wide), `Node`, `Edge`, `Token`, `Txt`, `Num`, `Bar`, `Ping`,
  `between()` for lanes. Derive every prop from `beat`, keep elements mounted, let motion animate the difference;
  going back a beat reverses the move.
- A token travels the edge it represents. Simultaneous events (per the book) move in parallel. Tokens that would end
  on a box use `absorb`; resting tokens need a gap ≥ 70 units. Nodes not involved in the current beat `dim`.
- No scroll-triggered reveals, nothing loops, no scaling text. Wrong answers get a small horizontal nudge.
- Discrete quantities step; only money/percent counts (`Num`, `CountUp`). Direct manipulation follows the pointer.
- `MotionConfig reducedMotion="user"`; tokens jump under reduced motion.

## Publishing
- Public repo: https://github.com/aaiach/learn-trading (root = this folder). `source/`, `.env*`, `.vercel` and
  `course/progress/*.json` are git-ignored and must never be published (the book is copyrighted).
- Deployed on Vercel from `course/` (`vercel.json` rewrites every path to `index.html` for the client router).
  Redeploy with `cd course && vercel deploy --prod`.

## Layout
- `source/harris-trading-and-exchanges.pdf`, `source/text.txt` (pdftotext -layout), `source/chapters/NN-*.txt`
  (tagged `<<p.N>>` per book page), `source/chapters/03-raw.txt` (non-layout text, also used to verify quotes).
- Page mapping: book page N = PDF page N+13. Rotated tables (e.g. Table 3-9) extract as garbage; render them with
  `pdftoppm -f P -l P` and read the image.
- `course/` — Vite 7 + React 19 + TypeScript + Motion 12 + lucide-react. `npm run dev` → http://localhost:5317.
  - `src/player/`: lesson player (top progress bar, one card, Continue/Check, feedback sheet, completion screen).
  - `src/screens/`: Home (book TOC + card legend), ChapterMap (path of lessons + checkpoints), PracticeHub
    (mistakes, Quick 10, vocabulary cards), Exam (40 questions, timer, 35 to pass), Cards (Leitner flashcards).
  - `src/content/chNN/`: `index.ts` (units), `uNN.ts` (lessons, one file per unit), `illus/uNN.tsx` (scenes),
    `games/*.tsx` (+ unit CSS). Register a chapter in `src/course.ts` and `tests/content.test.ts` (`SOURCES`).
  - `src/state/progress.ts`: localStorage + mirror to `course/progress/chNN.json` via `server/api.ts`.
  - `src/state/transfer.ts` + `src/screens/Sync.tsx` (`/sync`, phone icon on the home page; asked for 2026-10-22):
    move progress between devices with no server. "Copy my progress" puts `te1:` + base64url(gzip(JSON)) on the
    clipboard (Universal Clipboard carries it Mac → iPhone); `/sync/get` → "Paste", or a `.json` file either way. The
    QR code only opens `/sync/get` on the phone (full progress is ~12 KB compressed for two chapters, far too big for
    a QR). Bringing progress in **merges** (`merge()`: best lesson run, latest answer per question and card, larger XP,
    union of days and exams), so neither device loses anything. `npm test` covers the round trip and the merge. When
    `Progress` gains a field, add it to `merge()`.
- QA scripts used during the build live in the session scratchpad; recreate as needed (Playwright, Python 3.11 at
  `/Library/Frameworks/Python.framework/Versions/3.11/bin/python3`).

## Per-chapter workflow
1. Read `course/progress/chNN.json` of earlier chapters: missed question ids, checkpoint scores.
2. Read the whole chapter text; list concepts, definitions, formulas, tables and boxes by section.
3. Write `uNN.ts` per unit with exact excerpts, scenes in `illus/`, games where something is computable.
4. `npm run typecheck`, `npm test`, `npm run build` in `course/`.
5. Playwright at 390 and 1280 px, light and dark: walk every lesson, check every beat, no console errors,
   no horizontal overflow. Screenshots wait for motion to stop; sample positions over time to check motion.

## Chapters built
- Ch. 3 The Trading Industry — `course/src/content/ch03/` (http://localhost:5317/ch03), built 2026-10-19.
  53 lessons (24 must know, 20 should know, 9 nice to know) / 583 screens: 235 questions, 112 definitions, 59 scenes (244 beats), 34 sort/match, 7 games, 7 today
  notes. Units: u31 (6 lessons), u32 (10), u33a + u33b (9 + 7, one unit 3.3), u34 (10), u35 (11, incl. 3.7 recap).
  Games: TradingPit (long/short), ClearingDesk, ClassRush, Waterfall (CMO), OdaxGame, WealthGuess, JurisdictionRush.
- Ch. 4 Orders and Order Properties — `course/src/content/ch04/` (http://localhost:5317/ch04), built 2026-10-20.
  38 lessons (25 must know, 12 should know, 1 nice to know) / 469 screens: 261 questions (78 in checkpoints),
  63 definitions, 54 scenes (240 beats), 25 sort/match, 12 games, 12 today notes. Units 4.1–4.11, one file each
  (`u44a` + `u44b` form unit 4.4); the 4.12 summary and 4.13 points close unit 4.11, as Ch. 3 did.
  Games: OrderTicket, MakerTaker, WalkTheBook, PlaceIt, BeatTheBell, TriggerLab, TickTape, WorkTheOrder, OrderClock,
  FillDesk, IcebergHunter, OrderDesk.
  Shared order-book drawing kit: `ch04/illus/kit.tsx` (`Ladder`, `PriceChart`); bid/ask colours `--bid`/`--ask` in
  `tokens.css`. Table 4-4 is rotated: its hand transcription is `source/chapters/04-tables.txt` (`tables` in SOURCES).
  Book inconsistency handled in the lesson: §4.9 treats fill-or-kill as immediate-or-cancel; today FOK is all-or-nothing.
- Building a unit in parallel with forks worked: give each fork its own `uNN.ts` / `illus/uNN.tsx` / games files,
  keep shared engine edits in the main session, and ask for short excerpts written in small steps (one fork's
  large output with many book quotes was stopped by the API's content filter).
- With many forks saving files at once, the shared dev server shows Vite error overlays and live reloads. Test on a
  frozen build (`vite build` + `vite preview` on another port) or stub Vite's live-reload client in Playwright.
  `ONLY=4.3 npm test` checks one unit's excerpts while it is being written.
