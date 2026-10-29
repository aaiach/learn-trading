import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import type { DefinitionStep, IdeaStep, QuoteStep, RecapStep, SeeStep, TodayStep } from "../../content/types.ts";
import { BookQuote, Card, Rich, citeLabel, secRef } from "../../ds/ui.tsx";
import { Swap } from "../../motion/AutoHeight.tsx";
import { EASE_OUT } from "../../motion/tokens.ts";

const ref = (s: { p: number | string; s: string }) => `${secRef(s.s)} · p. ${s.p}`;

export function DefinitionView({ step }: { step: DefinitionStep }) {
  return (
    <Card tone="def" refText={ref(step.cite)}>
      <h2 className="term">{step.term}</h2>
      {step.aka && step.aka.length > 0 && (
        <p className="aka">
          Also called <Rich text={step.aka.map((a) => `**${a}**`).join(", ")} />
        </p>
      )}
      <p className="lead">
        <Rich text={step.body} />
      </p>
      <BookQuote cite={step.cite} mark={[step.term, ...(step.aka ?? [])]} />
    </Card>
  );
}

export function IdeaView({ step }: { step: IdeaStep }) {
  return (
    <Card tone="idea" refText={ref(step.cite)}>
      <h2 className="title">{step.title}</h2>
      <p className="lead">
        <Rich text={step.body} />
      </p>
      <BookQuote cite={step.cite} />
    </Card>
  );
}

export function QuoteView({ step }: { step: QuoteStep }) {
  return (
    <Card tone="book" refText={ref(step.cite)} className="card-paper">
      {step.lead && (
        <p className="quote-lead">
          <Rich text={step.lead} />
        </p>
      )}
      <BookQuote cite={step.cite} mark={step.mark} size="lg" />
    </Card>
  );
}

export function RecapView({ step }: { step: RecapStep }) {
  return (
    <Card tone="recap">
      <h2 className="title">{step.title ?? "Keep these"}</h2>
      <ul className="recap">
        {step.points.map((pt, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.18, duration: 0.3, ease: EASE_OUT }}
          >
            <span className="recap-tick" aria-hidden>
              <svg viewBox="0 0 20 20" width="20" height="20">
                <motion.path
                  d="M5 10.5l3.2 3.2L15 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3 + i * 0.18, duration: 0.35, ease: EASE_OUT }}
                />
              </svg>
            </span>
            <span>
              <Rich text={pt.text} />
              <span className="recap-ref" title={pt.cite.t}>
                {citeLabel(pt.cite)}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

export function TodayView({ step }: { step: TodayStep }) {
  return (
    <Card tone="today" className="card-today">
      <h2 className="title">{step.title}</h2>
      <p className="lead">
        <Rich text={step.body} />
      </p>
      <p className="today-src">
        <ExternalLink size={14} aria-hidden /> {step.source}
      </p>
    </Card>
  );
}

export function SeeView({ step, beat }: { step: SeeStep; beat: number }) {
  const Illus = step.illus;
  const b = step.beats[Math.min(beat, step.beats.length - 1)];
  return (
    <Card tone="see" verb={`${beat + 1} / ${step.beats.length}`}>
      <h2 className="title title-sm">{step.title}</h2>
      <div className="stage-wrap">
        <Illus beat={beat} />
      </div>
      <div className="beat-dots" aria-hidden>
        {step.beats.map((_, i) => (
          <motion.span
            key={i}
            className="beat-dot"
            animate={{ width: i === beat ? 22 : 8, opacity: i <= beat ? 1 : 0.35 }}
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
          />
        ))}
      </div>
      <Swap k={beat} className="caption-wrap">
        <p className="caption" aria-live="polite">
          <Rich text={b.text} />
        </p>
        {b.cite && <BookQuote cite={b.cite} size="sm" />}
      </Swap>
    </Card>
  );
}
