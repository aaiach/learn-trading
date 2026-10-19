import { useSyncExternalStore, type ReactNode, type MouseEvent } from "react";

const EVT = "te:navigate";

function subscribe(fn: () => void) {
  window.addEventListener("popstate", fn);
  window.addEventListener(EVT, fn);
  return () => {
    window.removeEventListener("popstate", fn);
    window.removeEventListener(EVT, fn);
  };
}

export function usePath(): string {
  return useSyncExternalStore(subscribe, () => window.location.pathname);
}

export function navigate(to: string, replace = false) {
  if (to === window.location.pathname) return;
  if (replace) history.replaceState(null, "", to);
  else history.pushState(null, "", to);
  window.scrollTo(0, 0);
  window.dispatchEvent(new Event(EVT));
}

export function Link({ to, children, className, ...rest }: { to: string; children: ReactNode; className?: string; "aria-label"?: string }) {
  const on = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={on} className={className} {...rest}>
      {children}
    </a>
  );
}
