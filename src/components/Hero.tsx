import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const PHRASES = [
  "We should circle back on the architecture decision before the sprint ends tomorrow. The edge cases look solid.",
  "I think the onboarding flow needs to feel more personal. Let's simplify the first three screens.",
  "Can we ship the redesign before Friday? The stakeholders are getting excited about the preview.",
  "Let me write up the release notes real quick. The team pushed some great improvements this week.",
];

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isListening, setIsListening] = useState(true);
  const [barValues, setBarValues] = useState([0.3, 0.6, 0.4, 0.8, 0.5]);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const typeText = useCallback((text: string, done: () => void) => {
    let i = 0;
    setDisplayed("");
    setIsListening(true);
    typingRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        if (typingRef.current !== null) clearInterval(typingRef.current);
        setIsListening(false);
        const timeout = setTimeout(done, 2200);
        return () => clearTimeout(timeout);
      }
    }, 30);
  }, []);

  useEffect(() => {
    typeText(PHRASES[phraseIdx], () => {
      setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
    });
    return () => { if (typingRef.current !== null) clearInterval(typingRef.current); };
  }, [phraseIdx, typeText]);

  // Animate waveform bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBarValues([
        0.2 + Math.random() * (isListening ? 0.7 : 0.15),
        0.3 + Math.random() * (isListening ? 0.6 : 0.12),
        0.15 + Math.random() * (isListening ? 0.75 : 0.14),
        0.25 + Math.random() * (isListening ? 0.65 : 0.1),
        0.2 + Math.random() * (isListening ? 0.7 : 0.13),
      ]);
    }, 120);
    return () => clearInterval(interval);
  }, [isListening]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section className="relative min-h-[105vh] flex items-center pt-28 pb-20 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-6 w-full"
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div>
            <motion.div variants={item}>
              <img
                src="/maple-leaf.png"
                alt=""
                className="h-20 w-20 object-contain animate-subtle-spin"
                style={{ filter: "drop-shadow(0 4px 12px rgba(249,115,22,0.2))" }}
              />
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance font-display text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[0.93] tracking-[-0.04em] text-warm-900"
            >
              Sweeter
              <br />
              than typing.
            </motion.h1>

            <motion.p variants={item} className="mt-5 max-w-md text-lg leading-relaxed text-warm-500">
              maple turns your voice into clean, polished text in any app &mdash; faster than typing, with every word transcribed right on your device.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.4)]"
              >
                Download for macOS
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#how" className="inline-flex items-center gap-1.5 font-medium text-warm-500 transition-colors hover:text-warm-900">
                See it in action
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </a>
            </motion.div>

            <motion.p variants={item} className="mt-6 text-sm text-warm-400">
              38 MB &middot; Free to try &middot; Apple Silicon &amp; Intel
            </motion.p>
          </div>

          {/* Right - demo card */}
          <motion.div
            variants={item}
            initial={{ opacity: 0, x: 60, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="glass overflow-hidden rounded-2xl shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_30px_70px_-40px_rgba(24,24,27,0.2)] transition-all duration-300 hover:-translate-y-1">
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-warm-200/60 bg-white/30 px-5 py-3.5">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ED6A5E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#61C454]" />
                </span>
                <span className="h-4 w-px bg-warm-200/50" />
                <div className="flex items-center gap-2">
                  {/* Waveform bars */}
                  <div className="flex items-end gap-[2px] h-5">
                    {barValues.map((v, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-amber-500 transition-all duration-100"
                        style={{ height: `${v * 100}%`, opacity: isListening ? 1 : 0.3 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-warm-400">
                    {isListening ? "Listening…" : "Idle"}
                  </span>
                </div>
              </div>

              {/* Text area */}
              <div className="px-6 py-7 relative min-h-[8rem]">
                <p className="text-[1.3rem] leading-relaxed text-warm-800">
                  {displayed}
                  <span className={`inline-block w-[2px] h-[1em] bg-amber-500 align-middle ml-0.5 ${isListening ? "animate-pulse" : "opacity-0"}`} />
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-warm-200/60 px-5 py-3">
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l4.5 4.5L19 6" />
                  </svg>
                  Polished
                </div>
                <span className="text-xs text-warm-400 tabular-nums">
                  {displayed.split(" ").filter(Boolean).length} words
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
