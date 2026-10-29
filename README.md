# Learn Trading

An interactive, step-by-step study course for Larry Harris, *Trading and Exchanges: Market Microstructure for
Practitioners* (Oxford University Press, 2003). One chapter at a time: short lessons, one idea per screen, animated
illustrations, practice questions with instant feedback, checkpoints, flashcards and a timed mock exam.

Built so far:
- **Chapter 3, The Trading Industry** (53 lessons, 235 questions, 59 animated scenes, 7 games).
- **Chapter 4, Orders and Order Properties** (38 lessons, 261 questions, 54 animated scenes, 12 games).
- **Chapter 5, Market Structures** (44 lessons, 275 questions, 69 animated scenes, 9 games).

## Run it

```sh
cd course
npm install
npm run dev     # http://localhost:5317
```

`npm run build` produces a static site in `course/dist`. Progress is kept in the browser (and, in local dev only,
mirrored to `course/progress/`). To continue on another device, tap the phone icon on the home page: copy your progress
on one device and paste it on the other (or use a file). Bringing it in merges with what that device already has.

## How it is organised

- `course/src/player/` — the lesson player (progress bar, one card per screen, feedback sheet, completion screen)
- `course/src/scene/` — the SVG toolkit behind the animated "See it" scenes
- `course/src/ds/` — the design system: each kind of screen (definition, book excerpt, illustration, practice, game…)
  has one colour, icon and label
- `course/src/content/chNN/` — one folder per chapter, one file per book section
- `CLAUDE.md` — content rules, design system, motion rules and the per-chapter workflow

## About the book excerpts

Each definition and question shows a short excerpt from the book, with page and section, so every claim can be checked
against the source. The book itself is not included in this repository. If you find the course useful, get the book.

`npm test` checks every excerpt word for word against a local copy of the text in `../source/` (not published); the
check is skipped when that folder is absent.
