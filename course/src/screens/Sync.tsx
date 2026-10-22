// "Continue on another device": copy this browser's progress, paste it on the other device (or use a file).
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, ClipboardCopy, ClipboardPaste, Download, Smartphone, Upload, X } from "lucide-react";
import { encode as qrEncode } from "uqr";
import { TOC, chapterId } from "../content/toc.ts";
import { Button } from "../ds/ui.tsx";
import { EASE_OUT, screen, spring } from "../motion/tokens.ts";
import { Link, navigate } from "../router.tsx";
import { type Bundle, type Change, NotOurs, bringIn, collect, copyText, decode, encode, saveFile, siteUrl } from "../state/transfer.ts";

export type SyncStep = "pick" | "send" | "sent" | "get" | "done";

const FRAC: Record<SyncStep, number> = { pick: 1 / 3, send: 2 / 3, get: 2 / 3, sent: 1, done: 1 };

const TITLES = new Map(TOC.flatMap((p) => p.chapters.map((c) => [chapterId(c.num), c] as const)));

function ChapterRows({ rows }: { rows: { id: string; meta: ReactNode }[] }) {
  return (
    <ul className="sync-list">
      {rows.map((r) => {
        const c = TITLES.get(r.id);
        return (
          <li key={r.id}>
            <span className="toc-num">{c?.num ?? r.id}</span>
            <span className="sync-row-title">{c?.title ?? r.id}</span>
            <span className="sync-row-meta">{r.meta}</span>
          </li>
        );
      })}
    </ul>
  );
}

function CheckBadge() {
  return (
    <svg viewBox="0 0 120 120" width="64" height="64" className="sync-badge" aria-hidden>
      <motion.circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        style={{ rotate: -90, originX: "50%", originY: "50%" }}
      />
      <motion.path
        d="M38 62l15 15 30-32"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.45, duration: 0.35, ease: EASE_OUT }}
      />
    </svg>
  );
}

/** Black on a white plate in both themes: phone cameras read that best. */
function Qr({ text }: { text: string }) {
  const { d, size } = useMemo(() => {
    const qr = qrEncode(text, { ecc: "M", border: 0 });
    let path = "";
    qr.data.forEach((row, y) => row.forEach((on, x) => on && (path += `M${x} ${y}h1v1h-1z`)));
    return { d: path, size: qr.size };
  }, [text]);
  const q = 3; // quiet zone, in modules
  return (
    <motion.svg
      className="qr"
      viewBox={`${-q} ${-q} ${size + 2 * q} ${size + 2 * q}`}
      role="img"
      aria-label="QR code that opens this page on your phone"
      shapeRendering="crispEdges"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring.soft, delay: 0.25 }}
    >
      <rect x={-q} y={-q} width={size + 2 * q} height={size + 2 * q} rx={2} fill="#fff" />
      <path d={d} fill="#111" />
    </motion.svg>
  );
}

const lessons = (n: number) => `${n} lesson${n === 1 ? "" : "s"}`;

export function Sync({ start }: { start: SyncStep }) {
  const [step, setStep] = useState<SyncStep>(start);
  const [dir, setDir] = useState(1);
  const go = (s: SyncStep) => {
    setDir(1);
    setStep(s);
  };

  // send
  const bundle = useMemo<Bundle | null>(() => (step === "send" ? collect() : null), [step]);
  const [code, setCode] = useState<string | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);
  useEffect(() => {
    if (!bundle) return;
    let live = true;
    void encode(bundle).then((c) => live && setCode(c));
    return () => {
      live = false;
    };
  }, [bundle]);
  const sendRows = bundle
    ? Object.entries(bundle.chapters).map(([id, p]) => ({ id, meta: `${lessons(Object.keys(p.lessons).length)} · ${p.xp} XP` }))
    : [];

  // get
  const [manual, setManual] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [changes, setChanges] = useState<Change[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const take = async (text: string) => {
    setError(null);
    if (!text.trim()) {
      setError("Nothing to paste yet. On the other device, tap Copy my progress first.");
      return;
    }
    setBusy(true);
    try {
      const b = await decode(text);
      setChanges(bringIn(b));
      go("done");
    } catch (e) {
      setError(
        e instanceof NotOurs
          ? "That isn't progress from this course. Copy it again on the other device, then paste."
          : "Something went wrong. Try again, or use a file.",
      );
    } finally {
      setBusy(false);
    }
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      await take(text);
    } catch {
      setManual(true);
      setError(null);
    }
  };

  const copy = async () => {
    if (!code) return;
    if (await copyText(code)) go("sent");
    else setCopyFailed(true);
  };

  const host = siteUrl().replace(/^https?:\/\//, "");

  let card: ReactNode;
  let foot: ReactNode = null;
  switch (step) {
    case "pick":
      card = (
        <>
          <span className="sync-hero" aria-hidden>
            <Smartphone size={26} />
          </span>
          <h1 className="title">Continue on another device</h1>
          <p className="sync-sub">Your progress lives in this browser. Copy it here, paste it there.</p>
          <div className="sync-choices">
            <button type="button" className="sync-choice" onClick={() => go("send")}>
              <span className="focus-ico">
                <Upload size={18} />
              </span>
              <span className="focus-text">
                <strong>Send from this device</strong>
                <small>Copy what you've done here</small>
              </span>
              <ChevronRight size={18} className="sync-chev" />
            </button>
            <button type="button" className="sync-choice" onClick={() => go("get")}>
              <span className="focus-ico">
                <Download size={18} />
              </span>
              <span className="focus-text">
                <strong>Bring it to this device</strong>
                <small>Paste what you copied on the other one</small>
              </span>
              <ChevronRight size={18} className="sync-chev" />
            </button>
          </div>
        </>
      );
      break;

    case "send":
      card = (
        <>
          <h1 className="title">Send from this device</h1>
          {sendRows.length ? (
            <>
              <p className="sync-sub">Lessons, XP, streak, flashcards and mistakes to review:</p>
              <ChapterRows rows={sendRows} />
              {copyFailed && code && (
                <div className="sync-manual">
                  <p className="sync-tip">This browser won't copy for you. Select all the text below and copy it.</p>
                  <textarea className="sync-paste" readOnly value={code} onFocus={(e) => e.currentTarget.select()} rows={4} />
                </div>
              )}
              <button type="button" className="link-btn sync-alt" onClick={() => bundle && saveFile(bundle)}>
                <Download size={14} /> Or save it as a file
              </button>
            </>
          ) : (
            <p className="sync-sub">Nothing to send yet. Finish a lesson first.</p>
          )}
        </>
      );
      if (sendRows.length)
        foot = (
          <Button variant="cta" onClick={() => void copy()} disabled={!code} className="btn-wide" autoFocus>
            <ClipboardCopy size={18} /> Copy my progress
          </Button>
        );
      break;

    case "sent":
      card = (
        <>
          <CheckBadge />
          <h1 className="title">Copied</h1>
          <p className="sync-sub">Now, on your other device:</p>
          <div className="sync-wide">
            <ol className="sync-steps">
              <li>
                <span className="sync-n">1</span>
                <span>Scan this code with its camera.</span>
              </li>
              <li>
                <span className="sync-n">2</span>
                <span>
                  Tap <strong>Paste</strong>.
                </span>
              </li>
            </ol>
            <Qr text={`${siteUrl()}/sync/get`} />
          </div>
          <ol className="sync-steps sync-narrow">
            <li>
              <span className="sync-n">1</span>
              <span>
                Open <strong>{host}</strong> and tap <Smartphone size={15} className="inline-ico" /> at the top.
              </span>
            </li>
            <li>
              <span className="sync-n">2</span>
              <span>
                Tap <strong>Bring it to this device</strong>, then <strong>Paste</strong>.
              </span>
            </li>
          </ol>
          <p className="sync-note">
            Same Apple ID on both? What you copy here pastes there. If not, send the copied text to yourself in a message.
          </p>
        </>
      );
      foot = (
        <Button variant="cta" onClick={() => navigate("/")} className="btn-wide" autoFocus>
          Done
        </Button>
      );
      break;

    case "get":
      card = (
        <>
          <h1 className="title">Bring it to this device</h1>
          <p className="sync-sub">
            First, on the other device: <strong>Send from this device</strong>, then <strong>Copy my progress</strong>.
          </p>
          <p className="sync-sub">What's already here stays: you keep the best of both.</p>
          {manual && (
            <div className="sync-manual">
              <p className="sync-tip">Press and hold in the box, then choose Paste.</p>
              <textarea
                className="sync-paste"
                rows={4}
                placeholder="Paste here"
                autoFocus
                onChange={(e) => void take(e.currentTarget.value)}
              />
            </div>
          )}
          <AnimatePresence>
            {error && (
              <motion.p
                key={error}
                className="sync-err"
                role="alert"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -6, 6, -3, 0] }}
                transition={{ duration: 0.32 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <button type="button" className="link-btn sync-alt" onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> Or open a file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json,.txt,application/json,text/plain"
            hidden
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              e.currentTarget.value = "";
              if (f) void f.text().then(take);
            }}
          />
        </>
      );
      if (!manual)
        foot = (
          <Button variant="cta" onClick={() => void paste()} disabled={busy} className="btn-wide" autoFocus>
            <ClipboardPaste size={18} /> Paste
          </Button>
        );
      break;

    case "done":
      card = (
        <>
          <CheckBadge />
          <h1 className="title">You're all set</h1>
          <p className="sync-sub">This device now has the best of both.</p>
          <ChapterRows
            rows={changes.map((c) => ({
              id: c.id,
              meta:
                c.after !== c.before ? (
                  <>
                    <span className="sync-was">{c.before}</span> → {lessons(c.after)}
                  </>
                ) : (
                  lessons(c.after)
                ),
            }))}
          />
        </>
      );
      foot = (
        <Button variant="cta" onClick={() => navigate("/")} className="btn-wide" autoFocus>
          Continue
        </Button>
      );
      break;
  }

  return (
    <div className="player sync">
      <header className="p-top">
        <Link to="/" className="icon-btn" aria-label="Back to all chapters">
          <X size={22} />
        </Link>
        <div className="p-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(FRAC[step] * 100)}>
          <motion.div className="p-bar-fill" initial={false} animate={{ width: `${FRAC[step] * 100}%` }} transition={spring.fill} />
        </div>
      </header>
      <main className="p-main">
        <div className="col">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.article key={step} className="card sync-card" custom={dir} variants={screen} initial="enter" animate="center" exit="exit">
              {card}
            </motion.article>
          </AnimatePresence>
        </div>
      </main>
      {foot && (
        <footer className="p-foot">
          <div className="col p-foot-row sync-foot">{foot}</div>
        </footer>
      )}
    </div>
  );
}
