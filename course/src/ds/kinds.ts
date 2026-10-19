// The design system's one source of truth: every screen is one of these kinds,
// and each kind always shows the same colour, icon and label.
import {
  BookOpen,
  Lightbulb,
  Quote,
  Clapperboard,
  Target,
  Gamepad2,
  ListChecks,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import type { Step } from "../content/types.ts";

export type Tone = "def" | "idea" | "book" | "see" | "prac" | "game" | "recap" | "today";

export type KindInfo = { tone: Tone; label: string; icon: LucideIcon; hint: string };

export const KINDS: Record<Tone, KindInfo> = {
  def: { tone: "def", label: "Definition", icon: BookOpen, hint: "A term from the book and what it means" },
  idea: { tone: "idea", label: "Key idea", icon: Lightbulb, hint: "A rule or fact to keep" },
  book: { tone: "book", label: "From the book", icon: Quote, hint: "Harris's exact words, with page" },
  see: { tone: "see", label: "See it", icon: Clapperboard, hint: "An animation, one beat at a time" },
  prac: { tone: "prac", label: "Practice", icon: Target, hint: "A question; you get feedback right away" },
  game: { tone: "game", label: "Game", icon: Gamepad2, hint: "A scored mini-game" },
  recap: { tone: "recap", label: "Remember", icon: ListChecks, hint: "The lesson in three lines" },
  today: { tone: "today", label: "Not in the book · today", icon: CalendarClock, hint: "What changed since 2003" },
};

export function toneOf(step: Step): Tone {
  switch (step.kind) {
    case "definition":
      return "def";
    case "idea":
      return "idea";
    case "quote":
      return "book";
    case "see":
      return "see";
    case "recap":
      return "recap";
    case "today":
      return "today";
    case "game":
      return "game";
    default:
      return "prac";
  }
}

/** The sub-label shown next to "Practice", telling the learner what to do. */
export function practiceVerb(step: Step): string | undefined {
  switch (step.kind) {
    case "choice":
      return "Pick one";
    case "multi":
      return "Select all that apply";
    case "truefalse":
      return "True or false?";
    case "fill":
      return "Fill the gap";
    case "number":
      return "Calculate";
    case "order":
      return "Put in order";
    case "classify":
      return "Sort";
    case "match":
      return "Match pairs";
    default:
      return undefined;
  }
}
