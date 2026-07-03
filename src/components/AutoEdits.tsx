import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Example {
  raw: string;
  polished: string;
  edits: Array<[number, "remove" | "punct" | "fix" | "restructure", string]>;
}

const EXAMPLES: Example[] = [
  {
    raw: "um so like we should circle back before the sprint ends uh",
    polished: "We should circle back before the sprint ends.",
    edits: [
      [0, "remove", "filler"], [1, "remove", "filler"], [2, "remove", "filler"],
      [11, "remove", "filler"], [10, "punct", "."],
    ],
  },
  {
    raw: "like can we ship the redesign maybe before friday i mean",
    polished: "Can we ship the redesign before Friday?",
    edits: [
      [0, "remove", "filler"], [6, "remove", "filler"], [9, "remove", "filler"],
      [10, "remove", "filler"], [1, "fix", "capitalization"],
      [8, "fix", "capitalization"], [8, "punct", "?"],
    ],
  },
  {
    raw: "uh let me write up the release notes real quick um honestly",
    polished: "Let me write up the release notes.",
    edits: [
      [0, "remove", "filler"], [8, "remove", "filler"], [9, "remove", "filler"],
      [10, "remove", "filler"], [11, "remove", "filler"], [7, "punct", "."],
    ],
  },
];

function Sparkle({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.2 }}
      animate={{ opacity: 0, scale: 1.8 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="absolute pointer-events-none z-20"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ boxShadow: "0 0 8px rgba(249,115,22,0.6)" }} />
    </motion.div>
  );
}

export default function AutoEdits() {
  const [exIdx, setExIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "editing" | "done" | "hold">("typing");
  const [typedLen, setTypedLen] = useState(0);
  const [editedIndices, setEditedIndices] = useState<Set<number>>(new Set());
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showResult, setShowResult] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const sparkId = useRef(0);

  const ex = EXAMPLES[exIdx];
  const rawWords = ex.raw.split(" ");

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("typing");
    setTypedLen(0);
    setEditedIndices(new Set());
    setSparks([]);
    setShowResult(false);

    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedLen(i);
      if (i >= ex.raw.length) {
        clearInterval(iv);
        const t1 = setTimeout(() => {
          setPhase("editing");
          ex.edits.forEach(([wordIdx], fi) => {
            const t = setTimeout(() => {
              setEditedIndices((prev) => new Set(prev).add(wordIdx));
              const el = wordRefs.current[wordIdx];
              if (el && panelRef.current) {
                const r = el.getBoundingClientRect();
                const pr = panelRef.current.getBoundingClientRect();
                sparkId.current++;
                setSparks((prev) => [...prev.slice(-12), { id: sparkId.current, x: r.left - pr.left + r.width / 2, y: r.top - pr.top + r.height / 2 }]);
                setTimeout(() => setSparks((prev) => prev.filter((s) => s.id !== sparkId.current)), 700);
              }
            }, fi * 320);
            timers.current.push(t);
          });
          const t2 = setTimeout(() => {
            setPhase("done");
            setTimeout(() => setShowResult(true), 180);
            const t3 = setTimeout(() => {
              setPhase("hold");
              const t4 = setTimeout(() => {
                setExIdx((p) => (p + 1) % EXAMPLES.length);
              }, 2600);
              timers.current.push(t4);
            }, 3400);
            timers.current.push(t3);
          }, ex.edits.length * 320 + 500);
          timers.current.push(t2);
        }, 350);
        timers.current.push(t1);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [exIdx]);

  useEffect(() => {
    const c = run();
    return () => { c?.(); timers.current.forEach(clearTimeout); };
  }, [exIdx, run]);

  const isRemoved = (i: number) => ex.edits.some(([wi, t]) => wi === i && t === "remove");
  const hasPunct = (i: number) => ex.edits.some(([wi, t]) => wi === i && t === "punct");

  return (
    <section className="py-28 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900"
          >
            AI Auto Edits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="mt-4 text-lg text-warm-500 max-w-lg mx-auto"
          >
            Speak naturally. maple removes fillers, adds punctuation, and polishes your words — automatically.
          </motion.p>
        </div>

        {/* Comparison card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="card-solid rounded-2xl overflow-hidden"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-warm-100 bg-warm-50/50">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ED6A5E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#61C454]" />
            </div>
            <div className="flex items-center gap-2.5">
              {phase === "typing" && (
                <div className="flex items-end gap-[2px] h-3.5">
                  {[0.3, 0.6, 0.4, 0.8, 0.5].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: [`${h * 50}%`, `${(h + 0.3) * 60}%`, `${h * 50}%`] }}
                      transition={{ duration: 0.3 + i * 0.04, repeat: Infinity, repeatType: "reverse" }}
                      className="w-[3px] rounded-full bg-amber-500"
                    />
                  ))}
                </div>
              )}
              <span className="text-xs font-medium text-warm-400 tabular-nums">
                {phase === "typing" ? "Listening…" : phase === "editing" ? `Editing… ${editedIndices.size}/${ex.edits.length}` : "Polished"}
              </span>
            </div>
          </div>

          {/* Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Before */}
            <div ref={panelRef} className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-warm-100 relative min-h-[240px]">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-warm-400 mb-4">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"><path d="M5 12h14" /></svg>
                Before
              </span>
              <div className="text-[1.15rem] md:text-[1.25rem] leading-[1.8] text-warm-600 relative">
                {phase === "typing" ? (
                  <span>
                    {ex.raw.slice(0, typedLen)}
                    <span className="inline-block w-[2px] h-[1em] bg-amber-500 align-middle ml-0.5 animate-pulse" />
                  </span>
                ) : (
                  <span className="relative">
                    {rawWords.map((word, i) => {
                      const edited = editedIndices.has(i);
                      const removing = isRemoved(i);
                      const punct = hasPunct(i);
                      return (
                        <span key={i}>
                          <motion.span
                            ref={(el) => { wordRefs.current[i] = el; }}
                            animate={{
                              opacity: removing && edited ? 0.3 : 1,
                              color: removing && edited ? "#ea580c" : "#78716c",
                            }}
                            transition={{ duration: 0.3 }}
                            className={`${removing && edited ? "line-through decoration-amber-500 decoration-2" : ""}`}
                          >
                            {word}
                          </motion.span>
                           {punct && edited && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.3 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="text-amber-600 font-bold"
                            >
                              {ex.edits.find(([wi, t]) => wi === i && t === "punct")?.[2] ?? "."}
                            </motion.span>
                          )}
                          {i < rawWords.length - 1 ? " " : ""}
                        </span>
                      );
                    })}
                    {sparks.map((s) => <Sparkle key={s.id} x={s.x} y={s.y} />)}
                  </span>
                )}
              </div>
              {phase === "done" || phase === "hold" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 flex flex-wrap gap-1.5"
                >
                  {ex.edits
                    .filter(([_, t]) => t === "remove")
                    .slice(0, 1)
                    .map((_, i) => (
                      <span key={i} className="glass inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium text-warm-600">
                        {ex.edits.filter(([_, t]) => t === "remove").length} fillers removed
                      </span>
                    ))}
                  {ex.edits.some(([_, t]) => t === "punct") && (
                    <span className="glass inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium text-warm-600">
                      punctuation added
                    </span>
                  )}
                </motion.div>
              ) : null}
            </div>

            {/* After */}
            <div className="p-6 md:p-8 min-h-[240px] flex flex-col justify-center relative">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-amber-600 mb-4">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4.5 4.5L19 6" /></svg>
                After maple
              </span>
              <div className="text-[1.15rem] md:text-[1.25rem] leading-[1.8]">
                <AnimatePresence mode="wait">
                  {showResult || phase === "hold" ? (
                    <motion.span
                      key={`p-${exIdx}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-warm-900 font-semibold"
                    >
                      {ex.polished}
                    </motion.span>
                  ) : (
                    <motion.span key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} className="text-warm-400 italic">
                      Waiting for transcript…
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {(showResult || phase === "hold") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex items-center gap-2 text-xs text-warm-400"
                >
                  <span className="tabular-nums">{ex.polished.split(" ").length} words</span>
                  <span className="text-warm-300">·</span>
                  <span className="text-amber-600 font-medium tabular-nums">
                    -{rawWords.length - ex.polished.split(" ").length} words
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-warm-100 bg-warm-50/50">
            <span className="text-xs text-warm-400">Example {exIdx + 1} of {EXAMPLES.length}</span>
            <div className="flex items-center gap-2.5">
              {EXAMPLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setExIdx(i)}
                  className="h-6 w-8 flex items-center justify-center"
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      i === exIdx ? "h-1.5 w-7 bg-amber-500" : "h-1.5 w-1.5 bg-warm-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)]"
          >
            Try maple free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
