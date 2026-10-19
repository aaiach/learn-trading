import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { usePath } from "./router.tsx";
import { CHAPTERS } from "./course.ts";
import { storeFor } from "./state/progress.ts";
import { Home } from "./screens/Home.tsx";
import { ChapterShell } from "./screens/Shell.tsx";
import { ChapterMap } from "./screens/ChapterMap.tsx";
import { PracticeHub } from "./screens/PracticeHub.tsx";
import { ExamHub, ExamRun } from "./screens/Exam.tsx";
import { Cards } from "./screens/Cards.tsx";
import { CheckpointRun, LessonRun, ReviewRun } from "./screens/Runs.tsx";

function Route({ path }: { path: string }) {
  const [, chId, section, arg] = path.split("/").map(decodeURIComponent);
  const ch = CHAPTERS[chId];
  useEffect(() => {
    document.title = ch ? `Ch. ${ch.num} ${ch.title} · Trading & Exchanges` : "Trading & Exchanges";
  }, [ch]);
  if (!ch) return <Home />;
  const store = storeFor(ch.id);
  switch (section) {
    case undefined:
    case "":
      return (
        <ChapterShell ch={ch} store={store} tab="learn">
          <ChapterMap ch={ch} store={store} />
        </ChapterShell>
      );
    case "practice":
      return (
        <ChapterShell ch={ch} store={store} tab="practice">
          <PracticeHub ch={ch} store={store} />
        </ChapterShell>
      );
    case "exam":
      if (arg === "run") return <ExamRun key="exam-run" ch={ch} store={store} />;
      return (
        <ChapterShell ch={ch} store={store} tab="exam">
          <ExamHub ch={ch} store={store} />
        </ChapterShell>
      );
    case "l":
      return <LessonRun key={arg} ch={ch} store={store} id={arg} />;
    case "cp":
      return <CheckpointRun key={arg} ch={ch} store={store} sec={arg} />;
    case "review":
      return <ReviewRun key="mistakes" ch={ch} store={store} kind="mistakes" />;
    case "quick":
      return <ReviewRun key="quick" ch={ch} store={store} kind="quick" />;
    case "cards":
      return <Cards ch={ch} store={store} />;
    default:
      return <Home />;
  }
}

export function App() {
  const path = usePath();
  return (
    <MotionConfig reducedMotion="user">
      <Route path={path} />
    </MotionConfig>
  );
}
