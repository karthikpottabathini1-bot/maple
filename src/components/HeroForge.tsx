import { useState, useEffect, useRef } from "react";

interface Example {
  raw: string;
  clean: string;
  bullets?: string[];
}

const EXAMPLES: Example[] = [
  {
    raw: "~um,~ let's run the ~sim~ simulation again before the demo.",
    clean: "Let's run the simulation again before the demo.",
  },
  {
    raw: "let's meet at ~Ocala Caf\u00e9 \u2014~ ~you know what,~ let's do Cloud's Caf\u00e9.",
    clean: "Let's meet at Cloud's Caf\u00e9.",
  },
  {
    raw: "for the launch we need to, ~um,~ finish the docs, record the demo, and email the beta list.",
    clean: "For the launch:",
    bullets: ["Finish the docs", "Record the demo", "Email the beta list"],
  },
];

interface WordToken {
  text: string;
  filler: boolean;
}

function parseRaw(raw: string): WordToken[] {
  const tokens: WordToken[] = [];
  raw.split("~").forEach((segment, idx) => {
    const isFiller = idx % 2 === 1;
    for (const word of segment.split(/\s+/).filter(Boolean)) {
      tokens.push({ text: word, filler: isFiller });
    }
  });
  return tokens;
}

export default function HeroForge() {
  const [exIdx, setExIdx] = useState(0);
  const [phase, setPhase] = useState<"live" | "swoosh" | "clearing" | "done">("live");
  const [typedCount, setTypedCount] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
  }, []);

  useEffect(() => {
    const ex = EXAMPLES[exIdx];
    const tokens = parseRaw(ex.raw);
    const tts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    setPhase("live");
    setTypedCount(0);

    if (reducedMotion.current) {
      setTypedCount(tokens.length);
      setPhase("done");
      return () => tts.forEach(clearTimeout);
    }

    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn(); }, ms);
      tts.push(t);
    };

    let i = 0;
    const typeNext = () => {
      if (cancelled) return;
      if (i >= tokens.length) {
        schedule(() => setPhase("swoosh"), 80);
        schedule(() => setPhase("clearing"), 80 + 500);
        schedule(() => setPhase("done"), 80 + 500 + 220);
        schedule(() => setExIdx((p) => (p + 1) % EXAMPLES.length), 80 + 500 + 220 + 2400);
        return;
      }
      i++;
      setTypedCount(i);
      const token = tokens[i - 1];
      const extra = /[.:\u2014]$/.test(token.text) ? 170 : /,$/.test(token.text) ? 85 : 0;
      schedule(typeNext, 95 + Math.random() * 55 + extra);
    };

    schedule(typeNext, 640);

    return () => {
      cancelled = true;
      tts.forEach(clearTimeout);
    };
  }, [exIdx]);

  const ex = EXAMPLES[exIdx];
  const visibleTokens = parseRaw(ex.raw).slice(0, typedCount);
  const isDone = phase === "done";
  const wordCount = isDone
    ? (ex.clean + " " + (ex.bullets?.join(" ") ?? "")).trim().split(/\s+/).filter(Boolean).length
    : visibleTokens.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-warm-200/60 bg-white shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_30px_70px_-40px_rgba(24,24,27,0.12)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-warm-200/60 bg-warm-50/40 px-5 py-3.5">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ED6A5E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#61C454]" />
        </span>
        <span className="h-4 w-px bg-warm-200/50" aria-hidden="true" />
        {isDone ? (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-warm-800">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l4.5 4.5L19 6" />
            </svg>
            Polished
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-warm-800">
            <span className="motion-pulse h-2 w-2 rounded-full bg-amber-500" />
            Listening
          </span>
        )}
        {!isDone && (
          <div className="ml-auto flex h-6 w-32 items-center gap-[3px] sm:w-44">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="block h-full flex-1 origin-center rounded-full bg-amber-500/60"
                style={{ animation: `wave ${(0.85 + (i % 6) * 0.16).toFixed(2)}s ease-in-out ${i * 45}ms infinite` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text area */}
      <div className="px-6 py-7">
        <div className="relative min-h-[7rem] text-[1.35rem] leading-relaxed text-warm-800">
          {(phase === "swoosh" || phase === "clearing") && (
            <span className="shimmer pointer-events-none absolute inset-y-0 -inset-x-2 z-10" aria-hidden="true" />
          )}

          {isDone ? (
            <div className="polish-rise">
              <p>{ex.clean}</p>
              {ex.bullets && (
                <ul className="mt-3.5 space-y-2 text-[1.18rem]">
                  {ex.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className={phase === "clearing" ? "raw-out" : undefined}>
              {visibleTokens.map((t, i) => (
                <span key={i} className={`word-in ${t.filler ? "text-warm-400" : ""}`}>
                  {i > 0 ? " " : ""}
                  {t.text}
                </span>
              ))}
              <span className="motion-caret ml-0.5 inline-block h-[1.15em] w-[2px] translate-y-[3px] bg-amber-500" />
            </p>
          )}
        </div>

        <div className="mt-5 flex items-center border-t border-warm-200/60 pt-4 text-sm text-warm-400">
          <span className="ml-auto tabular-nums">{wordCount} words</span>
        </div>
      </div>
    </div>
  );
}
