import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { EASE_OUT } from "./tokens.ts";

/** Counts from `from` to `value` once. For scores and totals, not for discrete steps. */
export function CountUp({
  value,
  from = 0,
  delay = 0,
  duration = 0.8,
  className,
  suffix = "",
  format = (v: number) => Math.round(v).toLocaleString("en-US"),
}: {
  value: number;
  from?: number;
  delay?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  format?: (v: number) => string;
}) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : from);
  const text = useTransform(mv, (v) => format(v) + suffix);
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration, delay, ease: EASE_OUT });
    return () => c.stop();
  }, [value, delay, duration, mv, reduce]);
  return <motion.span className={className}>{text}</motion.span>;
}
