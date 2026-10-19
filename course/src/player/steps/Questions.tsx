import { useEffect } from "react";
import { LayoutGroup, motion } from "motion/react";
import { X } from "lucide-react";
import type { ChoiceQ, FillQ, MultiQ, NumberQ, OrderQ, Question, TrueFalseQ } from "../../content/types.ts";
import { Card, Rich } from "../../ds/ui.tsx";
import { practiceVerb } from "../../ds/kinds.ts";
import { EASE_OUT, spring } from "../../motion/tokens.ts";
import type { Answer } from "../grade.ts";

export type QProps<T extends Question> = {
  q: T;
  answer: Answer;
  set: (a: Answer) => void;
  /** null until checked; then whether the whole answer was right. */
  revealed: boolean | null;
  /** Display permutation for options / bank words / order items. */
  order: number[];
  /** Exam mode hides per-option right/wrong colouring. */
  quiet?: boolean;
  refText?: string;
  /** Unique per presented question, so shared-layout ids never jump between screens. */
  uid: string;
};

const LETTERS = "ABCDEFGH";
const NUDGE = { x: [0, -7, 7, -4, 0], transition: { duration: 0.34 } };

export function CheckMark({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden className="checkmark">
      <motion.path
        d="M4.5 10.5l3.5 3.5L15.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
      />
    </svg>
  );
}

function useKeys(handler: (key: string) => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      handler(e.key.toLowerCase());
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [handler, active]);
}

function Prompt({ q }: { q: Question }) {
  const Fig = q.fig?.illus;
  return (
    <>
      {Fig && (
        <div className="stage-wrap fig">
          <Fig beat={q.fig?.beat ?? 99} />
        </div>
      )}
      <h2 className="prompt">
        <Rich text={q.q} />
      </h2>
    </>
  );
}

function Shell({ q, refText, children }: { q: Question; refText?: string; children: React.ReactNode }) {
  return (
    <Card tone="prac" verb={practiceVerb(q)} refText={refText}>
      <Prompt q={q} />
      {children}
    </Card>
  );
}

// ── Single choice ───────────────────────────────────────────────────────────
export function ChoiceView({ q, answer, set, revealed, order, quiet, refText }: QProps<ChoiceQ>) {
  const pick = answer.kind === "choice" ? answer.pick : null;
  useKeys(
    (k) => {
      const i = /^[1-9]$/.test(k) ? Number(k) - 1 : LETTERS.toLowerCase().indexOf(k);
      if (i >= 0 && i < order.length) set({ kind: "choice", pick: order[i] });
    },
    revealed === null,
  );
  return (
    <Shell q={q} refText={refText}>
      <div className="opts" role="radiogroup">
        {order.map((oi, pos) => {
          const picked = pick === oi;
          const right = oi === q.answer;
          const state =
            revealed === null || quiet ? (picked ? "picked" : "") : right ? "right" : picked ? "wrong" : "faded";
          return (
            <motion.button
              key={oi}
              type="button"
              role="radio"
              aria-checked={picked}
              className={`opt ${state}`}
              onClick={() => revealed === null && set({ kind: "choice", pick: oi })}
              animate={state === "wrong" ? NUDGE : { x: 0 }}
              whileTap={revealed === null ? { scale: 0.985 } : undefined}
              transition={spring.ui}
            >
              <span className="opt-key">{LETTERS[pos]}</span>
              <span className="opt-text">
                <Rich text={q.options[oi]} />
              </span>
              <span className="opt-mark">
                {state === "right" && <CheckMark />}
                {state === "wrong" && <X size={20} strokeWidth={2.8} />}
              </span>
            </motion.button>
          );
        })}
      </div>
    </Shell>
  );
}

// ── Multiple answers ────────────────────────────────────────────────────────
export function MultiView({ q, answer, set, revealed, order, quiet, refText }: QProps<MultiQ>) {
  const picks = answer.kind === "multi" ? answer.picks : [];
  const toggle = (oi: number) =>
    set({ kind: "multi", picks: picks.includes(oi) ? picks.filter((p) => p !== oi) : [...picks, oi] });
  useKeys(
    (k) => {
      const i = /^[1-9]$/.test(k) ? Number(k) - 1 : LETTERS.toLowerCase().indexOf(k);
      if (i >= 0 && i < order.length) toggle(order[i]);
    },
    revealed === null,
  );
  return (
    <Shell q={q} refText={refText}>
      <div className="opts">
        {order.map((oi, pos) => {
          const picked = picks.includes(oi);
          const right = q.answer.includes(oi);
          const state =
            revealed === null || quiet
              ? picked
                ? "picked"
                : ""
              : right && picked
                ? "right"
                : right
                  ? "missed"
                  : picked
                    ? "wrong"
                    : "faded";
          return (
            <motion.button
              key={oi}
              type="button"
              role="checkbox"
              aria-checked={picked}
              className={`opt opt-multi ${state}`}
              onClick={() => revealed === null && toggle(oi)}
              animate={state === "wrong" ? NUDGE : { x: 0 }}
              whileTap={revealed === null ? { scale: 0.985 } : undefined}
              transition={spring.ui}
            >
              <span className="opt-key opt-box">{picked ? <CheckMark size={16} /> : LETTERS[pos]}</span>
              <span className="opt-text">
                <Rich text={q.options[oi]} />
              </span>
              <span className="opt-mark">
                {state === "right" && <CheckMark />}
                {state === "missed" && <span className="opt-missed">missed</span>}
                {state === "wrong" && <X size={20} strokeWidth={2.8} />}
              </span>
            </motion.button>
          );
        })}
      </div>
    </Shell>
  );
}

// ── True / false ────────────────────────────────────────────────────────────
export function TrueFalseView({ q, answer, set, revealed, quiet, refText }: QProps<TrueFalseQ>) {
  const pick = answer.kind === "truefalse" ? answer.pick : null;
  useKeys(
    (k) => {
      if (k === "1" || k === "t") set({ kind: "truefalse", pick: true });
      if (k === "2" || k === "f") set({ kind: "truefalse", pick: false });
    },
    revealed === null,
  );
  return (
    <Shell q={q} refText={refText}>
      <div className="tf">
        {[true, false].map((v) => {
          const picked = pick === v;
          const right = v === q.answer;
          const state =
            revealed === null || quiet ? (picked ? "picked" : "") : right ? "right" : picked ? "wrong" : "faded";
          return (
            <motion.button
              key={String(v)}
              type="button"
              className={`opt tf-btn ${state}`}
              onClick={() => revealed === null && set({ kind: "truefalse", pick: v })}
              animate={state === "wrong" ? NUDGE : { x: 0 }}
              whileTap={revealed === null ? { scale: 0.98 } : undefined}
              transition={spring.ui}
            >
              <span className="opt-key">{v ? "1" : "2"}</span>
              <span className="tf-word">{v ? "True" : "False"}</span>
              <span className="opt-mark">
                {state === "right" && <CheckMark />}
                {state === "wrong" && <X size={20} strokeWidth={2.8} />}
              </span>
            </motion.button>
          );
        })}
      </div>
    </Shell>
  );
}

// ── Fill the gap(s) ─────────────────────────────────────────────────────────
export function FillView({ q, answer, set, revealed, order, quiet, refText, uid }: QProps<FillQ>) {
  const slots = answer.kind === "fill" ? answer.slots : q.answer.map(() => null);
  const parts = q.q.split("___");
  const used = new Set(slots.filter(Boolean) as string[]);
  const place = (w: string) => {
    if (revealed !== null) return;
    const i = slots.indexOf(null);
    if (i < 0) return;
    const next = [...slots];
    next[i] = w;
    set({ kind: "fill", slots: next });
  };
  const clear = (i: number) => {
    if (revealed !== null) return;
    const next = [...slots];
    next[i] = null;
    set({ kind: "fill", slots: next });
  };
  useKeys(
    (k) => {
      if (/^[1-9]$/.test(k)) {
        const w = q.bank[order[Number(k) - 1]];
        if (w && !used.has(w)) place(w);
      }
      if (k === "backspace") {
        const last = slots.map((s, i) => (s ? i : -1)).filter((i) => i >= 0).pop();
        if (last !== undefined) clear(last);
      }
    },
    revealed === null,
  );
  return (
    <Card tone="prac" verb={practiceVerb(q)} refText={refText}>
      {q.fig && (
        <div className="stage-wrap fig">
          <q.fig.illus beat={q.fig.beat ?? 99} />
        </div>
      )}
      <LayoutGroup>
        <p className="fill-text">
          {parts.map((p, i) => (
            <span key={i}>
              <Rich text={p} />
              {i < parts.length - 1 && (
                <button
                  type="button"
                  className={`slot ${slots[i] ? "slot-full" : ""} ${
                    revealed === null || quiet ? "" : slots[i] === q.answer[i] ? "right" : "wrong"
                  }`}
                  onClick={() => clear(i)}
                  aria-label={slots[i] ? `Remove ${slots[i]}` : `Blank ${i + 1}`}
                >
                  {slots[i] ? (
                    <motion.span layoutId={`${uid}-w-${slots[i]}`} className="word in-slot" transition={spring.soft}>
                      {slots[i]}
                    </motion.span>
                  ) : (
                    <span className="slot-gap" />
                  )}
                </button>
              )}
            </span>
          ))}
        </p>
        <div className="bank">
          {order.map((bi, pos) => {
            const w = q.bank[bi];
            const isUsed = used.has(w);
            return (
              <span key={w} className="bank-cell">
                <span className="word word-ghost" aria-hidden>
                  {w}
                </span>
                {!isUsed && (
                  <motion.button
                    type="button"
                    layoutId={`${uid}-w-${w}`}
                    className="word"
                    onClick={() => place(w)}
                    transition={spring.soft}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="word-key">{pos + 1}</span>
                    {w}
                  </motion.button>
                )}
              </span>
            );
          })}
        </div>
      </LayoutGroup>
    </Card>
  );
}

// ── Number ──────────────────────────────────────────────────────────────────
export function NumberView({ q, answer, set, revealed, quiet, refText }: QProps<NumberQ>) {
  const text = answer.kind === "number" ? answer.text : "";
  const state = revealed === null || quiet ? "" : revealed ? "right" : "wrong";
  return (
    <Shell q={q} refText={refText}>
      {q.illustrative && <p className="tag-illus">Illustrative numbers (ours, not the book’s)</p>}
      <motion.label className={`num-field ${state}`} animate={state === "wrong" ? NUDGE : { x: 0 }}>
        {q.prefix && <span className="num-affix">{q.prefix}</span>}
        <input
          className="num-input"
          inputMode="decimal"
          autoComplete="off"
          autoFocus
          value={text}
          readOnly={revealed !== null}
          placeholder="0"
          onChange={(e) => set({ kind: "number", text: e.target.value })}
          aria-label="Your answer"
        />
        {q.unit && <span className="num-affix">{q.unit}</span>}
      </motion.label>
    </Shell>
  );
}

// ── Order ───────────────────────────────────────────────────────────────────
export function OrderView({ q, answer, set, revealed, order, quiet, refText, uid }: QProps<OrderQ>) {
  const seq = answer.kind === "order" ? answer.seq : [];
  const add = (i: number) => revealed === null && set({ kind: "order", seq: [...seq, i] });
  const remove = (i: number) => revealed === null && set({ kind: "order", seq: seq.filter((x) => x !== i) });
  useKeys(
    (k) => {
      if (/^[1-9]$/.test(k)) {
        const pool = order.filter((i) => !seq.includes(i));
        const i = pool[Number(k) - 1];
        if (i !== undefined) add(i);
      }
      if (k === "backspace" && seq.length) remove(seq[seq.length - 1]);
    },
    revealed === null,
  );
  const pool = order.filter((i) => !seq.includes(i));
  return (
    <Shell q={q} refText={refText}>
      <LayoutGroup>
        <ol className="seq">
          {q.items.map((_, pos) => {
            const it = seq[pos];
            const st = it === undefined || revealed === null || quiet ? "" : it === pos ? "right" : "wrong";
            return (
              <li key={pos} className={`seq-slot ${st}`}>
                <span className="seq-n">{pos + 1}</span>
                {it !== undefined ? (
                  <motion.button
                    type="button"
                    layoutId={`${uid}-o-${it}`}
                    className="seq-item placed"
                    onClick={() => remove(it)}
                    transition={spring.soft}
                  >
                    <Rich text={q.items[it]} />
                  </motion.button>
                ) : (
                  <span className="seq-empty" />
                )}
              </li>
            );
          })}
        </ol>
        {pool.length > 0 && (
          <div className="pool">
            {pool.map((i, k) => (
              <motion.button
                type="button"
                key={i}
                layoutId={`${uid}-o-${i}`}
                className="seq-item"
                onClick={() => add(i)}
                transition={spring.soft}
                whileTap={{ scale: 0.98 }}
              >
                <span className="word-key">{k + 1}</span>
                <Rich text={q.items[i]} />
              </motion.button>
            ))}
          </div>
        )}
      </LayoutGroup>
    </Shell>
  );
}

export function QuestionView(props: QProps<Question>) {
  const { q } = props;
  switch (q.kind) {
    case "choice":
      return <ChoiceView {...(props as QProps<ChoiceQ>)} />;
    case "multi":
      return <MultiView {...(props as QProps<MultiQ>)} />;
    case "truefalse":
      return <TrueFalseView {...(props as QProps<TrueFalseQ>)} />;
    case "fill":
      return <FillView {...(props as QProps<FillQ>)} />;
    case "number":
      return <NumberView {...(props as QProps<NumberQ>)} />;
    case "order":
      return <OrderView {...(props as QProps<OrderQ>)} />;
  }
}
