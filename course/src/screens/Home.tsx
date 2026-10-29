import { motion } from "motion/react";
import { ArrowRight, BookOpen, Lock, Smartphone } from "lucide-react";
import { BOOKS, BOOK_IDS, type Book, bookOf, setShelf, useShelf } from "../content/books.ts";
import { CHAPTERS, mastery } from "../course.ts";
import { Link } from "../router.tsx";
import { storeFor, useProgress } from "../state/progress.ts";
import { ThemeToggle } from "../theme.tsx";
import { MasteryRing } from "./Shell.tsx";
import { IMPORTANCE, KINDS } from "../ds/kinds.ts";
import { Chip, ImpBars, ImpTag } from "../ds/ui.tsx";
import { focusView, setFocus, useChapterView, useFocus } from "../focus.ts";
import { spring } from "../motion/tokens.ts";

function ChapterRow({ book, num, title, page }: { book: Book; num: number; title: string; page: number }) {
  const id = book.chapterId(num);
  const ch = CHAPTERS[id];
  if (!ch) {
    return (
      <li className="toc-row off">
        <span className="toc-num">{num}</span>
        <span className="toc-title">{title}</span>
        <span className="toc-meta">
          p. {page} <Lock size={14} aria-label="Not built yet" />
        </span>
      </li>
    );
  }
  return <ReadyRow id={id} num={num} title={title} page={page} />;
}

function ReadyRow({ id, num, title, page }: { id: string; num: number; title: string; page: number }) {
  const store = storeFor(id);
  const p = useProgress(store, (x) => x);
  const m = mastery(useChapterView(CHAPTERS[id]), p);
  return (
    <li>
      <Link to={`/${id}`} className="toc-row ready">
        <span className="toc-num">{num}</span>
        <span className="toc-title">{title}</span>
        <span className="toc-meta">
          <MasteryRing value={m} />
          <span className="toc-go">
            {m ? "Continue" : "Start"} <ArrowRight size={16} />
          </span>
        </span>
      </Link>
      <span className="sr-only">starts p. {page}</span>
    </li>
  );
}

// Book by book, then chapter by chapter.
const BUILT = Object.keys(CHAPTERS).sort(
  (a, b) => BOOK_IDS.indexOf(bookOf(CHAPTERS[a]).id) - BOOK_IDS.indexOf(bookOf(CHAPTERS[b]).id) || CHAPTERS[a].num - CHAPTERS[b].num,
);

/** The chapter the learner touched last; once all its lessons are done, the next built chapter. */
function useHeroChapter(): string {
  // BUILT never changes at runtime, so the hook order is stable
  const ps = BUILT.map((id) => useProgress(storeFor(id), (x) => x));
  const focus = useFocus();
  let last = -1;
  ps.forEach((p, i) => {
    if (p.updatedAt && (last < 0 || p.updatedAt > ps[last].updatedAt)) last = i;
  });
  if (last < 0) return BUILT[0];
  const allDone = focusView(CHAPTERS[BUILT[last]], focus).units.every((u) => u.lessons.every((l) => ps[last].lessons[l.id]));
  return allDone && last + 1 < BUILT.length ? BUILT[last + 1] : BUILT[last];
}

function HeroGo() {
  const id = useHeroChapter();
  const ch = CHAPTERS[id];
  const view = useChapterView(ch);
  const p = useProgress(storeFor(id), (x) => x);
  const m = mastery(view, p);
  return (
    <Link to={`/${id}`} className="hero-go">
      <MasteryRing value={m} size={44} />
      <span className="hero-go-text">
        <small>
          {bookOf(ch).title} · Chapter {ch.num}
        </small>
        <strong>{ch.title}</strong>
      </span>
      <span className="hero-go-cta">
        {m ? "Continue" : "Start"} <ArrowRight size={16} />
      </span>
    </Link>
  );
}

/** "Must know only": one switch for the whole course. On, every chapter is just its must-know lessons. */
function FocusSwitch() {
  const on = useFocus();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`focus-switch${on ? " on" : ""}`}
      onClick={() => setFocus(!on)}
    >
      <span className="focus-ico">
        <ImpBars imp={3} size={16} />
      </span>
      <span className="focus-text">
        <strong>Must know only</strong>
        <small>Just the basics every experienced trader knows cold</small>
      </span>
      <span className="switch" aria-hidden>
        <motion.span className="switch-knob" initial={false} animate={{ x: on ? 20 : 0 }} transition={spring.ui} />
      </span>
    </button>
  );
}

/** Which book's contents the home page lists. */
function BookSwitch({ on }: { on: Book }) {
  return (
    <div className="seg book-seg" role="tablist" aria-label="Book">
      {BOOK_IDS.map((id) => (
        <button key={id} type="button" role="tab" aria-selected={id === on.id} className={id === on.id ? "on" : ""} onClick={() => setShelf(id)}>
          {BOOKS[id].title}
        </button>
      ))}
    </div>
  );
}

export function Home() {
  const book = BOOKS[useShelf()];
  return (
    <div className="home">
      <header className="home-head col">
        <div className="home-brand">
          <span className="home-logo">
            <BookOpen size={20} />
          </span>
          <div>
            <h1>{book.title}</h1>
            <p>{book.sub}</p>
          </div>
          <div className="home-tools">
            <Link to="/sync" className="icon-btn" aria-label="Continue on another device" title="Continue on another device">
              <Smartphone size={18} />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="col home-main">
        <BookSwitch on={book} />
        <HeroGo />
        <FocusSwitch />
        <motion.details className="legend" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <summary>How to read a lesson</summary>
          <p>One screen at a time. The label at the top tells you what kind of screen it is.</p>
          <ul className="legend-list">
            {Object.values(KINDS).map((k) => (
              <li key={k.tone}>
                <Chip tone={k.tone} small />
                <span>{k.hint}</span>
              </li>
            ))}
          </ul>
          <p className="legend-sub">On the map, bars show how important each lesson is.</p>
          <ul className="legend-list">
            {([3, 2, 1] as const).map((i) => (
              <li key={i}>
                <ImpTag imp={i} />
                <span>{IMPORTANCE[i].hint}</span>
              </li>
            ))}
          </ul>
        </motion.details>
        {book.toc.map((part) => (
          <section key={part.title} className="toc-part">
            <h2 className="toc-part-title">
              {part.part && <span>{part.part}</span>} {part.title}
            </h2>
            <ul className="toc-list">
              {part.chapters.map((c) => (
                <ChapterRow key={c.num} book={book} {...c} />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
