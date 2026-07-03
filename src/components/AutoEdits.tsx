import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────────────────────────────
   AI Auto Edits — premium before/after section
   Shows messy transcript being actively polished
   with animated annotations and sparkle effects.
   ─────────────────────────────────────────────── */

interface Example {
  raw: string;
  polished: string;
  // [wordIndex, type, label]
  edits: Array<[number, "remove" | "punct" | "fix" | "restructure", string]>;
}

const EXAMPLES: Example[] = [
  {
    raw: "um so like we should circle back before the sprint ends uh",
    polished: "We should circle back before the sprint ends.",
    edits: [
      [0, "remove", "filler"],
      [1, "remove", "filler"],
      [2, "remove", "filler"],
      [10, "remove", "filler"],
      [9, "punct", "period"],
    ],
  },
  {
    raw: "like can we ship the redesign maybe before friday i mean",
    polished: "Can we ship the redesign before Friday?",
    edits: [
      [0, "remove", "filler"],
      [5, "remove", "filler"],
      [8, "remove", "filler"],
      [7, "fix", "capitalization"],
      [7, "punct", "question mark"],
    ],
  },
  {
    raw: "uh let me write up the release notes real quick um honestly",
    polished: "Let me write up the release notes.",
    edits: [
      [0, "remove", "filler"],
      [7, "remove", "filler"],
      [8, "remove", "filler"],
      [10, "remove", "filler"],
      [9, "punct", "period"],
    ],
  },
];

const BADGE_STYLES: Record<string, string> = {
  remove: "bg-rose-50 border-rose-200/60 text-rose-700",
  punct: "bg-amber-50 border-amber-200/60 text-amber-700",
  fix: "bg-sky-50 border-sky-200/60 text-sky-700",
  restructure: "bg-violet-50 border-violet-200/60 text-violet-700",
};

const BADGE_ICONS: Record<string, React.ReactNode> = {
  remove: (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
  ),
  punct: (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v13M12 21h.01" /></svg>
  ),
  fix: (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
  ),
  restructure: (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h3M4 17v3h3M20 7V4h-3M20 17v3h-3M9 9h6v6H9z" /></svg>
  ),
};

/* Animated waveform */
function WaveformBars() {
  return (
    <div className="flex items-end gap-[2px] h-3.5">
      {[0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6].map((h, i) => (
        <motion.span
          key={i}
          animate={{ height: [`${h * 60}%`, `${(h + 0.3) * 60}%`, `${h * 60}%`] }}
          transition={{ duration: 0.3 + i * 0.05, repeat: Infinity, repeatType: "reverse" }}
          className="w-[2.5px] rounded-full bg-amber-500"
        />
      ))}
    </div>
  );
}

/* Sparkle burst effect */
function SparkleBurst({ x, y, delay }: { x: number; y: number; delay: number }) {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    angle: (i / 6) * Math.PI * 2,
    distance: 20 + Math.random() * 15,
  }));

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            scale: 0,
          }}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
        />
      ))}
    </div>
  );
}

export default function AutoEdits() {
  const [exIdx, setExIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "editing" | "polished" | "hold">("typing");
  const [typedLen, setTypedLen] = useState(0);
  const [activeEdits, setActiveEdits] = useState<Set<number>>(new Set());
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [showBadges, setShowBadges] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparkId = useRef(0);

  const ex = EXAMPLES[exIdx];
  const rawWords = ex.raw.split(" ");
  const polishedWords = ex.polished.split(" ");

  /* ── Animation cycle ── */
  const startCycle = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("typing");
    setTypedLen(0);
    setActiveEdits(new Set());
    setSparks([]);
    setShowBadges(false);
    setWordCount(0);

    const speed = 24;
    let i = 0;
    const typeIv = setInterval(() => {
      i++;
      setTypedLen(i);
      if (i >= ex.raw.length) {
        clearInterval(typeIv);

        const t1 = setTimeout(() => {
          setPhase("editing");

          // Animate each edit
          ex.edits.forEach(([wordIdx, type], fi) => {
            const t = setTimeout(() => {
              setActiveEdits((prev) => {
                const next = new Set(prev);
                next.add(wordIdx);
                return next;
              });

              // Spawn sparkle
              const el = wordRefs.current[wordIdx];
              if (el) {
                const rect = el.getBoundingClientRect();
                const parent = el.offsetParent as HTMLElement;
                if (parent) {
                  const prect = parent.getBoundingClientRect();
                  const sx = rect.left - prect.left + (type === "punct" ? rect.width : rect.width / 2);
                  const sy = rect.top - prect.top + rect.height / 2;
                  sparkId.current++;
                  const sid = sparkId.current;
                  setSparks((prev) => [...prev.slice(-10), { id: sid, x: sx, y: sy, delay: 0 }]);
                  setTimeout(() => {
                    setSparks((prev) => prev.filter((s) => s.id !== sid));
                  }, 800);
                }
              }

              // Update word count
              setWordCount((prev) => prev + 1);
            }, fi * 380);
            timers.current.push(t);
          });

          // Transition to polished
          const t2 = setTimeout(() => {
            setPhase("polished");
            const t3 = setTimeout(() => setShowBadges(true), 300);
            timers.current.push(t3);

            const t4 = setTimeout(() => {
              setPhase("hold");
              const t5 = setTimeout(() => setExIdx((p) => (p + 1) % EXAMPLES.length), 2800);
              timers.current.push(t5);
            }, 3200);
            timers.current.push(t4);
          }, ex.edits.length * 380 + 700);
          timers.current.push(t2);
        }, 400);
        timers.current.push(t1);
      }
    }, speed);

    return () => clearInterval(typeIv);
  }, [ex]);

  useEffect(() => {
    const cleanup = startCycle();
    return () => {
      cleanup?.();
      timers.current.forEach(clearTimeout);
    };
  }, [exIdx, startCycle]);

  const typedRaw = ex.raw.slice(0, typedLen);

  // Unique edit labels for badges
  const uniqueEdits = ex.edits.reduce((acc, [_, type, label]) => {
    const key = `${type}-${label}`;
    if (!acc.find((e) => e.key === key)) {
      acc.push({ key, type, label });
    }
    return acc;
  }, [] as Array<{ key: string; type: string; label: string }>);

  return (
    <section className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
                  <path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z" />
                  <path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5z" />
                </svg>
              </motion.div>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900">
              AI Auto Edits
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg leading-relaxed text-warm-500 max-w-lg mx-auto"
          >
            Speak naturally. maple transcribes and edits your voice instantly — rambling thoughts become clear, perfectly formatted text.
          </motion.p>
        </div>

        {/* Main comparison card */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-warm-200/50 bg-white/40">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ED6A5E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#61C454]" />
            </div>
            <div className="flex items-center gap-3">
              {phase === "typing" && <WaveformBars />}
              <span className="text-xs font-medium text-warm-400">
                {phase === "typing" ? "Listening…" : phase === "editing" ? `Editing… ${wordCount}/${ex.edits.length}` : "Done"}
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Raw */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-warm-200/50 relative min-h-[280px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-warm-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-warm-400">Raw transcript</span>
              </div>

              <div className="text-[1.15rem] leading-[1.8] text-warm-600 relative">
                {phase === "typing" ? (
                  <span>
                    {typedRaw}
                    <span className="inline-block w-[2px] h-[1em] bg-amber-500 align-middle ml-0.5 animate-pulse" />
                  </span>
                ) : (
                  <span className="relative">
                    {rawWords.map((word, i) => {
                      const isEdited = activeEdits.has(i);
                      const editInfo = ex.edits.find(([wi]) => wi === i);
                      const editType = editInfo?.[1];

                      return (
                        <span key={i} className="relative inline-block">
                          <motion.span
                            ref={(el) => { wordRefs.current[i] = el; }}
                            initial={{ opacity: 1 }}
                            animate={{
                              opacity: isEdited ? 0.25 : 1,
                              color: isEdited ? (editType === "remove" ? "#d97706" : "#292524") : "#57534e",
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className={`inline ${editType === "remove" && isEdited ? "line-through decoration-amber-400 decoration-[1.5px]" : ""}`}
                          >
                            {word}
                          </motion.span>
                          {editType === "punct" && isEdited && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="text-amber-600 font-bold ml-0.5"
                            >
                              .
                            </motion.span>
                          )}
                          {i < rawWords.length - 1 && <span> </span>}
                        </span>
                      );
                    })}

                    {/* Sparkles */}
                    {sparks.map((s) => (
                      <SparkleBurst key={s.id} x={s.x} y={s.y} delay={s.delay} />
                    ))}
                  </span>
                )}
              </div>

              {/* Edit badges floating below */}
              <AnimatePresence>
                {showBadges && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {uniqueEdits.map(({ key, type, label }, i) => (
                      <motion.span
                        key={key}
                        initial={{ opacity: 0, x: 16, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.12, duration: 0.35 }}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-sm ${BADGE_STYLES[type] || BADGE_STYLES.remove}`}
                      >
                        <span className="opacity-70">{BADGE_ICONS[type] || BADGE_ICONS.remove}</span>
                        <span>{label}</span>
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Polished */}
            <div className="p-6 md:p-8 relative min-h-[280px] flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">After maple</span>
              </div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {phase === "polished" || phase === "hold" ? (
                    <motion.div
                      key={`pol-${exIdx}`}
                      initial={{ opacity: 0, filter: "blur(3px)", y: 8 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <p className="text-[1.15rem] leading-[1.8] text-warm-800 font-semibold">
                        {ex.polished}
                      </p>

                      <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12l4.5 4.5L19 6" />
                          </svg>
                          Polished
                        </div>
                        <div className="h-px flex-1 bg-warm-200/50" />
                        <span className="text-xs text-warm-400 tabular-nums">
                          {polishedWords.length} words
                        </span>
                        <span className="text-xs text-warm-300">
                          —
                        </span>
                        <span className="text-xs text-amber-600 font-medium">
                          -{rawWords.length - polishedWords.length} words
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="waiting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 text-sm text-warm-400 pt-4"
                    >
                      <WaveformBars />
                      <span>Processing…</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Amber glow when polished */}
              <AnimatePresence>
                {(phase === "polished" || phase === "hold") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 rounded-none md:rounded-r-2xl pointer-events-none"
                    style={{ boxShadow: "inset 0 0 80px rgba(249,115,22,0.03)" }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-warm-200/50 bg-white/30">
            <div className="flex items-center gap-2 text-xs text-warm-400">
              <span>Example {exIdx + 1} of {EXAMPLES.length}</span>
            </div>
            <div className="flex items-center gap-3">
              {EXAMPLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setExIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === exIdx ? "w-6 bg-amber-500" : "w-1.5 bg-warm-300 hover:bg-warm-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)]"
          >
            Try maple free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
