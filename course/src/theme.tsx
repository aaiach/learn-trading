import { useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Mode = "system" | "light" | "dark";
const KEY = "te-theme";

function read(): Mode {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

export function applyTheme(m: Mode = read()) {
  const root = document.documentElement;
  if (m === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", m);
}

export function ThemeToggle() {
  const [m, setM] = useState<Mode>(read);
  const next: Record<Mode, Mode> = { system: "light", light: "dark", dark: "system" };
  const Icon = m === "light" ? Sun : m === "dark" ? Moon : Monitor;
  return (
    <button
      type="button"
      className="icon-btn"
      title={`Theme: ${m}`}
      aria-label={`Theme: ${m}. Switch to ${next[m]}`}
      onClick={() => {
        const n = next[m];
        setM(n);
        try {
          localStorage.setItem(KEY, n);
        } catch {
          /* ignore */
        }
        applyTheme(n);
      }}
    >
      <Icon size={18} />
    </button>
  );
}
