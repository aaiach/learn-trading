import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCw, X } from "lucide-react";
import type { Chapter } from "../content/types.ts";
import { type CardRef, cardsOf } from "../content/ids.ts";
import { navigate } from "../router.tsx";
import { BOX_DAYS, DAY, type ProgressStore } from "../state/progress.ts";
import { BookQuote, Button, Chip, Kbd, Rich } from "../ds/ui.tsx";
import { EASE_OUT, spring } from "../motion/tokens.ts";
import { shuffle } from "../util.ts";

export function Cards({ ch, store }: { ch: Chapter; store: ProgressStore }) {
  const deck = useMemo(() => {
    const p = store.get();
    const all = cardsOf(ch);
    const known = all.filter((c) => p.cards[c.id]);
    const due = known.filter((c) => p.cards[c.id].due <= Date.now());
    // nothing due: practise what you know; nothing known yet: preview the first unit
    const pick = due.length ? due : known.length ? known : all.filter((c) => c.lesson.sec.startsWith(ch.units[0].sec));
    return shuffle(pick).slice(0, 20);
  }, [ch, store]);

  const [queue, setQueue] = useState<CardRef[]>(deck);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [exitDir, setExitDir] = useState(1);
  const [knew, setKnew] = useState(0);
  const card = queue[i];

  const grade = (ok: boolean) => {
    if (!card || !flipped) return;
    store.update((p) => {
      const rec = p.cards[card.id] ?? { box: 0, due: 0 };
      const box = ok ? Math.min(BOX_DAYS.length - 1, rec.box + 1) : 0;
      p.cards[card.id] = { box, due: Date.now() + BOX_DAYS[box] * DAY };
    });
    if (ok) setKnew((k) => k + 1);
    else setQueue((q) => [...q, card]);
    setExitDir(ok ? 1 : -1);
    setFlipped(false);
    setI((x) => x + 1);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!card) navigate(`/${ch.id}/practice`);
        else if (!flipped) setFlipped(true);
        else if (e.key === "Enter") grade(true);
      }
      if (flipped && e.key === "1") grade(false);
      if (flipped && e.key === "2") grade(true);
      if (e.key === "Escape") navigate(`/${ch.id}/practice`);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  const frac = queue.length ? Math.min(i, queue.length) / queue.length : 1;

  return (
    <div className="player">
      <header className="p-top">
        <button type="button" className="icon-btn" onClick={() => navigate(`/${ch.id}/practice`)} aria-label="Close">
          <X size={22} />
        </button>
        <div className="p-bar">
          <motion.div className="p-bar-fill" initial={false} animate={{ width: `${Math.max(3, frac * 100)}%` }} transition={spring.fill} />
        </div>
        <div className="p-stats">
          <span className="xp">
            {Math.min(i + 1, queue.length)}/{queue.length}
          </span>
        </div>
      </header>
      <main className="p-main">
        <div className="col">
          <AnimatePresence mode="popLayout" custom={exitDir}>
            {card ? (
              <motion.div
                key={`${card.id}-${i}`}
                className="fc-wrap"
                custom={exitDir}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                variants={{ out: (d: number) => ({ opacity: 0, x: 220 * d, rotate: 6 * d, transition: { duration: 0.32, ease: EASE_OUT } }) }}
                exit="out"
                transition={spring.soft}
              >
                <motion.button
                  type="button"
                  className="fc"
                  onClick={() => setFlipped((f) => !f)}
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  aria-label={flipped ? "Show term" : "Show definition"}
                >
                  <span className="fc-face fc-front">
                    <Chip tone="def" small />
                    <span className="fc-term">{card.step.term}</span>
                    <span className="fc-hint">
                      <RotateCw size={14} /> Tap to flip
                      <span className="kbd-hint">{" or press "}</span>
                      <Kbd>Space</Kbd>
                    </span>
                  </span>
                  <span className="fc-face fc-back">
                    <span className="fc-term-sm">{card.step.term}</span>
                    <span className="fc-def">
                      <Rich text={card.step.body} />
                    </span>
                    <BookQuote cite={card.step.cite} size="sm" />
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="end" className="fc-end" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2>Deck done</h2>
                <p>
                  You knew {knew} of {deck.length} on the first go. Cards you missed come back sooner.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <footer className="p-foot">
        <div className="col p-foot-row">
          {card ? (
            flipped ? (
              <>
                <Button variant="bad" onClick={() => grade(false)} className="btn-half">
                  Missed it <Kbd>1</Kbd>
                </Button>
                <Button variant="good" onClick={() => grade(true)} className="btn-half">
                  Knew it <Kbd>2</Kbd>
                </Button>
              </>
            ) : (
              <>
                <span />
                <Button variant="cta" onClick={() => setFlipped(true)} className="btn-wide">
                  Show definition <Kbd>Space</Kbd>
                </Button>
              </>
            )
          ) : (
            <>
              <span />
              <Button variant="cta" onClick={() => navigate(`/${ch.id}/practice`)} className="btn-wide">
                Done <Kbd>Enter</Kbd>
              </Button>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
