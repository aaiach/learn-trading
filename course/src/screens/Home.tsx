import { motion } from "motion/react";
import { ArrowRight, BookOpen, Lock } from "lucide-react";
import { TOC, chapterId } from "../content/toc.ts";
import { CHAPTERS, mastery } from "../course.ts";
import { Link } from "../router.tsx";
import { storeFor, useProgress } from "../state/progress.ts";
import { ThemeToggle } from "../theme.tsx";
import { MasteryRing } from "./Shell.tsx";
import { KINDS } from "../ds/kinds.ts";
import { Chip } from "../ds/ui.tsx";

function ChapterRow({ num, title, page }: { num: number; title: string; page: number }) {
  const id = chapterId(num);
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
  const m = mastery(CHAPTERS[id], p);
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

function HeroGo() {
  const id = "ch03";
  const ch = CHAPTERS[id];
  const p = useProgress(storeFor(id), (x) => x);
  const m = mastery(ch, p);
  return (
    <Link to={`/${id}`} className="hero-go">
      <MasteryRing value={m} size={44} />
      <span className="hero-go-text">
        <small>
          {ch.part} · Chapter {ch.num}
        </small>
        <strong>{ch.title}</strong>
      </span>
      <span className="hero-go-cta">
        {m ? "Continue" : "Start"} <ArrowRight size={16} />
      </span>
    </Link>
  );
}

export function Home() {
  return (
    <div className="home">
      <header className="home-head col">
        <div className="home-brand">
          <span className="home-logo">
            <BookOpen size={20} />
          </span>
          <div>
            <h1>Trading &amp; Exchanges</h1>
            <p>Larry Harris · Market Microstructure for Practitioners</p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="col home-main">
        <HeroGo />
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
        </motion.details>
        {TOC.map((part) => (
          <section key={part.title} className="toc-part">
            <h2 className="toc-part-title">
              {part.part && <span>{part.part}</span>} {part.title}
            </h2>
            <ul className="toc-list">
              {part.chapters.map((c) => (
                <ChapterRow key={c.num} {...c} />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
