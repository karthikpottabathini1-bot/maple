import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────────────────────────────
   HeroForge — cinematic live transcription demo
   Shows raw speech being actively forged into
   polished text, word by word, with visible edits.
   ─────────────────────────────────────────────── */

interface Example {
  raw: string;
  polished: string;
  // which raw word indices are fillers
  removals: number[];
  // which raw word indices get punctuation after them
  punctAfter: number[];
  // inline annotation labels: [wordIndex, label]
  labels: Array<[number, string]>;
}

const EXAMPLES: Example[] = [
  {
    raw: "um so like we should circle back before the sprint ends uh",
    polished: "We should circle back before the sprint ends.",
    removals: [0, 1, 2, 11],
    punctAfter: [10],
    labels: [
      [0, "filler"],
      [1, "filler"],
      [2, "filler"],
      [11, "filler"],
      [10, "period"],
    ],
  },
  {
    raw: "like can we ship the redesign maybe before friday i mean",
    polished: "Can we ship the redesign before Friday?",
    removals: [0, 6, 9, 10],
    punctAfter: [8],
    labels: [
      [0, "filler"],
      [6, "filler"],
      [9, "filler"],
      [10, "filler"],
      [1, "capitalize"],
      [8, "capitalize"],
      [8, "?"],
    ],
  },
  {
    raw: "uh let me write up the release notes real quick um honestly",
    polished: "Let me write up the release notes.",
    removals: [0, 8, 9, 10, 11],
    punctAfter: [7],
    labels: [
      [0, "filler"],
      [8, "filler"],
      [9, "filler"],
      [10, "filler"],
      [11, "filler"],
      [7, "period"],
    ],
  },
];

/* Waveform */
function Waveform({ active }: { active: boolean }) {
  const [bars] = useState([0.3, 0.6, 0.4, 0.8, 0.5, 0.35, 0.7]);
  return (
    <div className="flex items-end gap-[3px] h-5">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          animate={{
            height: active
              ? [`${15 + i * 8}%`, `${40 + Math.random() * 50}%`, `${15 + i * 8}%`]
              : [`${15 + i * 5}%`, `${20 + i * 3}%`, `${15 + i * 5}%`],
            opacity: active ? 1 : 0.35,
          }}
          transition={{ duration: 0.4 + i * 0.06, repeat: Infinity, repeatType: "reverse" }}
          className="w-[3px] rounded-full bg-amber-500"
        />
      ))}
    </div>
  );
}

/* Sparkle particle */
function Sparkle({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.3 }}
      animate={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute pointer-events-none z-30"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" fill="#f59e0b" />
      </svg>
    </motion.div>
  );
}

export default function HeroForge() {
  const [exIdx, setExIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "processing" | "done" | "hold">("typing");
  const [typedLen, setTypedLen] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [visibleLabels, setVisibleLabels] = useState<Set<number>>(new Set());
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showSummary, setShowSummary] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparkId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const ex = EXAMPLES[exIdx];
  const rawWords = ex.raw.split(" ");

  /* ── Cycle ── */
  const start = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("typing");
    setTypedLen(0);
    setProcessedCount(0);
    setVisibleLabels(new Set());
    setSparks([]);
    setShowSummary(false);

    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedLen(i);
      if (i >= ex.raw.length) {
        clearInterval(iv);
        const t1 = setTimeout(() => {
          setPhase("processing");

          // Process each edit with stagger
          const totalEdits = ex.labels.length;
          ex.labels.forEach(([wordIdx, _], fi) => {
            const t = setTimeout(() => {
              setProcessedCount(fi + 1);
              setVisibleLabels((prev) => new Set(prev).add(wordIdx));

              // Spark
              const el = wordRefs.current[wordIdx];
              if (el && containerRef.current) {
                const rect = el.getBoundingClientRect();
                const crect = containerRef.current.getBoundingClientRect();
                const sx = rect.left - crect.left + rect.width / 2;
                const sy = rect.top - crect.top + rect.height / 2;
                sparkId.current++;
                const sid = sparkId.current;
                setSparks((prev) => [...prev.slice(-8), { id: sid, x: sx, y: sy }]);
                setTimeout(() => {
                  setSparks((prev) => prev.filter((s) => s.id !== sid));
                }, 600);
              }
            }, fi * 320);
            timers.current.push(t);
          });

          // Done
          const t2 = setTimeout(() => {
            setPhase("done");
            const t3 = setTimeout(() => setShowSummary(true), 350);
            timers.current.push(t3);

            const t4 = setTimeout(() => {
              setPhase("hold");
              const t5 = setTimeout(() => setExIdx((p) => (p + 1) % EXAMPLES.length), 2400);
              timers.current.push(t5);
            }, 2800);
            timers.current.push(t4);
          }, totalEdits * 320 + 600);
          timers.current.push(t2);
        }, 400);
        timers.current.push(t1);
      }
    }, 26);

    return () => clearInterval(iv);
  }, [ex]);

  useEffect(() => {
    const cleanup = start();
    return () => { cleanup?.(); timers.current.forEach(clearTimeout); };
  }, [exIdx, start]);

  const typedRaw = ex.raw.slice(0, typedLen);
  const isRemoving = (i: number) => ex.removals.includes(i);
  const hasPunct = (i: number) => ex.punctAfter.includes(i);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-warm-200/60 bg-white/30">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ED6A5E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#61C454]" />
        </span>
        <span className="h-4 w-px bg-warm-200/50" />
        <div className="flex items-center gap-2">
          <Waveform active={phase === "typing" || phase === "processing"} />
          <span className="text-xs font-medium text-warm-400">
            {phase === "typing" ? "Listening…" : phase === "processing" ? `Polishing… ${processedCount}/${ex.labels.length}` : "Done"}
          </span>
        </div>
      </div>

      {/* Text area */}
      <div ref={containerRef} className="flex-1 px-5 py-6 relative min-h-[10rem]">
        <div className="text-[1.25rem] md:text-[1.35rem] leading-[1.7] text-warm-800 relative">
          {/* TYPING: character by character */}
          {phase === "typing" && (
            <span>
              {typedRaw}
              <span className="inline-block w-[2px] h-[1em] bg-amber-500 align-middle ml-0.5 animate-pulse" />
            </span>
          )}

          {/* PROCESSING: show raw with live edits */}
          {(phase === "processing" || (phase === "done" && !showSummary)) && (
            <span className="relative inline">
              {rawWords.map((word, i) => {
                const removing = isRemoving(i);
                const punct = hasPunct(i);
                const labelVisible = visibleLabels.has(i);

                return (
                  <span key={i} className="relative inline-block mr-[0.3em]">
                    {/* Word */}
                    <motion.span
                      ref={(el) => { wordRefs.current[i] = el; }}
                      initial={{ opacity: 1 }}
                      animate={{
                        opacity: removing && labelVisible ? 0.15 : 1,
                        scale: removing && labelVisible ? 0.85 : 1,
                        color: removing && labelVisible ? "#d97706" : "#1c1917",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`inline ${removing && labelVisible ? "line-through decoration-amber-400 decoration-[2px]" : ""}`}
                    >
                      {word}
                    </motion.span>

                    {/* Punctuation pop-in */}
                    <AnimatePresence>
                      {punct && labelVisible && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="inline text-amber-600 font-bold ml-[-0.1em]"
                        >
                          {exIdx === 1 ? "?" : "."}
                        </motion.span>
                      )}
                    </AnimatePresence>


                  </span>
                );
              })}

              {/* Sparks */}
              {sparks.map((s) => (
                <Sparkle key={s.id} x={s.x} y={s.y} />
              ))}
            </span>
          )}

          {/* DONE / HOLD: polished text */}
          {(phase === "done" && showSummary) || phase === "hold" ? (
            <motion.span
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {ex.polished}
            </motion.span>
          ) : null}
        </div>

        {/* Summary badges */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {ex.removals.length > 0 && (
                <motion.span
                  initial={{ opacity: 0, x: 12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200/60 px-2.5 py-1 text-[11px] font-semibold text-rose-600"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                  Removed {ex.removals.length} filler{ex.removals.length > 1 ? "s" : ""}
                </motion.span>
              )}
              {ex.punctAfter.length > 0 && (
                <motion.span
                  initial={{ opacity: 0, x: 12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.45, duration: 0.35 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/60 px-2.5 py-1 text-[11px] font-semibold text-amber-700"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v13M12 21h.01" /></svg>
                  Added punctuation
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-warm-200/60 px-5 py-3 bg-white/20">
        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4.5 4.5L19 6" />
          </svg>
          {phase === "typing" ? "Transcribing…" : phase === "processing" ? "Polishing…" : "Polished"}
        </div>
        <span className="text-xs text-warm-400 tabular-nums">
          {phase === "typing"
            ? `${typedRaw.split(" ").filter(Boolean).length} words`
            : `${ex.polished.split(" ").filter(Boolean).length} words`}
        </span>
      </div>
    </div>
  );
}
