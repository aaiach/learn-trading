import { type ReactNode, Fragment } from "react";
import { motion } from "motion/react";
import { IMPORTANCE, KINDS, type Tone } from "./kinds.ts";
import type { Cite, Imp } from "../content/types.ts";
import { spring } from "../motion/tokens.ts";

/** The kind label every screen starts with: same colour, icon and words everywhere. */
export function Chip({ tone, verb, small }: { tone: Tone; verb?: string; small?: boolean }) {
  const k = KINDS[tone];
  const Icon = k.icon;
  return (
    <span className={`chip t-${tone}${small ? " chip-sm" : ""}`}>
      <Icon size={small ? 13 : 15} strokeWidth={2.4} aria-hidden />
      <span>{k.label}</span>
      {verb && <span className="chip-verb">· {verb}</span>}
    </span>
  );
}

/** Lesson importance as three rising bars, filled up to `imp`. */
export function ImpBars({ imp, size = 12 }: { imp: Imp; size?: number }) {
  return (
    <svg className={`imp-bars imp-${imp}`} width={size} height={size} viewBox="0 0 12 12" aria-hidden>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={i * 4.5} y={8 - i * 3.5} width={3} height={4 + i * 3.5} rx={1} className={i < imp ? "on" : ""} />
      ))}
    </svg>
  );
}

/** Bars plus the words: "Must know", "Should know", "Nice to know". */
export function ImpTag({ imp }: { imp: Imp }) {
  return (
    <span className={`imp-tag imp-${imp}`} title={IMPORTANCE[imp].hint}>
      <ImpBars imp={imp} />
      {IMPORTANCE[imp].label}
    </span>
  );
}

export function citeLabel(c: Cite): string {
  const parts = [`p. ${c.p}`, `§ ${c.s}`];
  if (c.box) parts.push(`Box “${c.box}”`);
  if (c.table) parts.push(c.table);
  return parts.join(" · ");
}

/** Renders `**bold**` spans in our own copy as emphasised terms. */
export function Rich({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <strong key={i} className="em">
            {p}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Display-only typography: straight quotes and apostrophes become curly ones. */
function curly(t: string): string {
  return t.replace(/"([^"]*)"/g, "\u201c$1\u201d").replace(/(\w)'/g, "$1\u2019");
}

function highlight(raw: string, marks?: string[]): ReactNode {
  const text = curly(raw);
  if (!marks?.length) return text;
  const esc = marks.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${esc.join("|")})`, "gi");
  return text.split(re).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="qmark">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** A verbatim excerpt from the book. Always serif, always sepia, always with its page. */
export function BookQuote({
  cite,
  mark,
  size = "md",
  label = true,
}: {
  cite: Cite;
  mark?: string[];
  size?: "sm" | "md" | "lg";
  label?: boolean;
}) {
  return (
    <figure className={`bq bq-${size}${cite.table ? " bq-table" : ""}`}>
      <blockquote>{highlight(cite.t, mark)}</blockquote>
      {label && (
        <figcaption>
          <span className="bq-icon" aria-hidden>
            ❝
          </span>
          Harris · {citeLabel(cite)}
        </figcaption>
      )}
    </figure>
  );
}

/** One screen of a lesson. */
export function Card({
  tone,
  verb,
  refText,
  children,
  className = "",
}: {
  tone: Tone;
  verb?: string;
  refText?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`card t-${tone} ${className}`}>
      <header className="card-head">
        <Chip tone={tone} verb={verb} />
        {refText && <span className="card-ref">{refText}</span>}
      </header>
      {children}
    </article>
  );
}

export function Button({
  children,
  onClick,
  disabled,
  variant = "cta",
  className = "",
  type = "button",
  autoFocus,
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "cta" | "good" | "bad" | "ghost" | "soft";
  className?: string;
  type?: "button" | "submit";
  autoFocus?: boolean;
  title?: string;
}) {
  return (
    <motion.button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { y: 2 }}
      transition={spring.ui}
      autoFocus={autoFocus}
      title={title}
    >
      {children}
    </motion.button>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="kbd">{children}</kbd>;
}
