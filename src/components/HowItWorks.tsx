import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Keycap({ label, sym, pressed }: { label: string; sym: string; pressed: boolean }) {
  return (
    <motion.div
      animate={{
        y: pressed ? 4 : 0,
        scale: pressed ? 0.94 : 1,
        boxShadow: pressed
          ? "0 1px 2px rgba(0,0,0,0.1), 0 0 0 3px rgba(249,115,22,0.25)"
          : "0 1px 0 rgba(0,0,0,0.08), 0 3px 8px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.04)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-white border border-warm-200 select-none"
    >
      <span className="text-[10px] font-medium text-warm-400 uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-semibold text-warm-800 mt-0.5">{sym}</span>
    </motion.div>
  );
}

const PHRASES = [
  "Let's ship the redesign before the end of the sprint tomorrow.",
  "Can we circle back on the architecture decision?",
];

export default function HowItWorks() {
  const [pressed, setPressed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typeText = useCallback((text: string, done: () => void) => {
    let i = 0;
    setDisplayed("");
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        done();
      }
    }, 30);
  }, []);

  const startCycle = useCallback(() => {
    setPressed(true);
    setPlaying(true);

    typeText(PHRASES[phraseIdx], () => {
      const t = setTimeout(() => {
        setPressed(false);
        setPlaying(false);
        setPhraseIdx((prev) => (prev + 1) % PHRASES.length);

        const restart = setTimeout(() => {
          startCycle();
        }, 800);
        cycleRef.current = restart;
      }, 2000);
      cycleRef.current = t;
    });
  }, [phraseIdx, typeText]);

  useEffect(() => {
    const t = setTimeout(startCycle, 600);
    return () => {
      clearTimeout(t);
      if (cycleRef.current) clearTimeout(cycleRef.current);
    };
  }, []);

  return (
    <section id="how" className="py-24 relative z-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
          {/* Left: text */}
          <div className="pt-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900"
            >
              It&apos;s one
              <br />
              motion.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg leading-relaxed text-warm-500 max-w-xs"
            >
              No windows to switch. No buttons to click. Just press the shortcut,
              say what&apos;s on your mind, and let go.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 space-y-4"
            >
              {[
                { k: "fn key", v: "Global shortcut from any app" },
                { k: "< 1 second", v: "Latency from speech to text" },
                { k: "Zero setup", v: "No account, no config, just works" },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-semibold text-warm-900 text-sm">{k}</span>
                  <span className="text-warm-400 text-sm">{v}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: keycaps + popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Keycaps */}
            <div className="flex items-center gap-2.5">
              <Keycap label="fn" sym="fn" pressed={pressed} />
            </div>

            {/* Glow ring when pressed */}
            <AnimatePresence>
              {pressed && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-56 h-1 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)",
                    boxShadow: "0 0 20px rgba(249,115,22,0.2)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Popup card */}
            <div className="relative w-[340px]" style={{ minHeight: "140px" }}>
              <AnimatePresence>
                {playing && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="card-solid rounded-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2.5 border-b border-warm-200/50 bg-white/30 px-4 py-3">
                      <div className="flex items-end gap-[2px] h-4">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="w-[3px] rounded-full bg-amber-500"
                            animate={{ height: [8, 20, 14, 26, 18][i] }}
                            transition={{ duration: 0.5 + i * 0.08, repeat: Infinity, repeatType: "reverse" }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-amber-600">Listening…</span>
                    </div>

                    {/* Text */}
                    <div className="px-4 py-5 min-h-[70px]">
                      <p className="text-base leading-relaxed text-warm-800">
                        {displayed}
                        <span className="inline-block w-[2px] h-[1em] bg-amber-500 align-middle ml-0.5 animate-pulse" />
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-warm-200/50 px-4 py-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l4.5 4.5L19 6" />
                        </svg>
                        {displayed.length === 0 ? "Listening…" : "Polished"}
                      </div>
                      <span className="text-xs text-warm-400 tabular-nums">
                        {displayed.split(" ").filter(Boolean).length} words
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
