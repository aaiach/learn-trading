// Motion vocabulary. Use these instead of ad-hoc values so the whole course moves the same way.
import type { Transition } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const dur = { fast: 0.16, base: 0.26, slow: 0.45 } as const;

export const spring = {
  /** Buttons, chips, selection states. */
  ui: { type: "spring", stiffness: 560, damping: 40 } as Transition,
  /** Cards and sheets entering. */
  soft: { type: "spring", stiffness: 300, damping: 32 } as Transition,
  /** Things travelling across a scene. */
  travel: { type: "spring", stiffness: 120, damping: 20 } as Transition,
  /** Bars and gauges filling. */
  fill: { type: "spring", stiffness: 160, damping: 26 } as Transition,
};

export const fade: Transition = { duration: dur.base, ease: EASE_OUT };

/** Slide-in for a new screen; `dir` is +1 going forward, -1 going back. */
export const screen = {
  enter: (dir: number) => ({ opacity: 0, x: 36 * dir }),
  center: { opacity: 1, x: 0, transition: { ...spring.soft, opacity: { duration: 0.2 } } },
  exit: (dir: number) => ({ opacity: 0, x: -28 * dir, transition: { duration: 0.14, ease: EASE_OUT } }),
};
