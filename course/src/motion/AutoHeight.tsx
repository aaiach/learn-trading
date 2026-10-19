import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { spring, EASE_OUT } from "./tokens.ts";

/** Glides its height to fit its content, so swapping content never makes the page jump. */
export function AutoHeight({ children, className }: { children: ReactNode; className?: string }) {
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number | "auto">("auto");
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    setH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div className={className} initial={false} animate={{ height: h }} transition={spring.soft} style={{ overflow: "hidden" }}>
      <div ref={inner} style={{ display: "flow-root" }}>
        {children}
      </div>
    </motion.div>
  );
}

/** Cross-fades between keyed content while gliding the height. */
export function Swap({ k, children, className }: { k: string | number; children: ReactNode; className?: string }) {
  return (
    <AutoHeight className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={k}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE_OUT } }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </AutoHeight>
  );
}
