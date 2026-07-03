import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES = [
  {
    title: "Your voice never leaves your Mac.",
    desc: "Transcription runs locally, in real time. No server ever sees your words. No account required. Just you.",
    color: "bg-amber-500",
    side: "left",
  },
  {
    title: "Polish that actually works.",
    desc: "Filler words dissolve. Punctuation lands where it belongs. Your rambling becomes prose you'd actually send.",
    color: "bg-amber-600",
    side: "right",
  },
  {
    title: "Works where you work.",
    desc: "Notion. Slack. Terminal. Linear. iMessage. Everywhere you can type, maple follows. No plugins needed.",
    color: "bg-orange-500",
    side: "left",
  },
  {
    title: "47 languages and counting.",
    desc: "Speak in any supported language. maple detects, adapts, and transcribes automatically.",
    color: "bg-amber-700",
    side: "right",
  },
  {
    title: "It learns your words.",
    desc: "Product names, code terms, inside jokes. Teach maple your vocabulary once — it remembers forever.",
    color: "bg-orange-600",
    side: "left",
  },
];

function LockIcon() {
  return (
    <div className="relative h-12 w-12 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-amber-100/50"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <svg viewBox="0 0 24 24" className="relative h-6 w-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    </div>
  );
}

function WaveformIcon() {
  return (
    <div className="flex items-end gap-[2px] h-8">
      {[...Array(7)].map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-amber-500"
          animate={{ height: [10, 28, 16, 36, 20, 30, 14][i] }}
          transition={{ duration: 0.7 + i * 0.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AppIcons() {
  const apps = [
    { label: "Notion", color: "bg-zinc-100" },
    { label: "Slack", color: "bg-purple-100" },
    { label: "Terminal", color: "bg-zinc-200" },
    { label: "Linear", color: "bg-amber-100" },
    { label: "iMessage", color: "bg-green-100" },
  ];
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {apps.map((app, i) => (
        <motion.span
          key={app.label}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          className={`${app.color} px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 text-center`}
        >
          {app.label}
        </motion.span>
      ))}
    </div>
  );
}

function GlobeIcon() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="h-11 w-11"
    >
      <svg viewBox="0 0 24 24" className="h-full w-full text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </motion.div>
  );
}

function BrainIcon() {
  return (
    <div className="relative h-12 w-12 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/50"
          style={{ width: 3 + i * 2, height: 3 + i * 2 }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.5, 0.3] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <svg viewBox="0 0 24 24" className="relative h-6 w-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18c-2.2-1.5-4.4-1-5.5 1-.5 1 .5 2.5 2 3 1 .4 2.5.4 3.5 0 1.5-.5 2.5-2 2-3-1.1-2-3.3-2.5-5.5-1z" />
        <path d="M12 18c2.2-1.5 4.4-1 5.5 1 .5 1-.5 2.5-2 3-1 .4-2.5.4-3.5 0-1.5-.5-2.5-2-2-3 1.1-2 3.3-2.5 5.5-1z" />
        <path d="M12 12c-1.5-1.5-4.5-1-6.5 1-1 1-1.5 3 .5 5 1 1 4 1.5 6 .5 2-1 2-3 1.5-4.5-.2-.7-.7-1.5-1.5-2z" />
        <path d="M12 12c1.5-1.5 4.5-1 6.5 1 1 1 1.5 3-.5 5-1 1-4 1.5-6 .5-2-1-2-3-1.5-4.5.2-.7.7-1.5 1.5-2z" />
      </svg>
    </div>
  );
}

const ICONS = [LockIcon, WaveformIcon, AppIcons, GlobeIcon, BrainIcon];

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900 text-center mb-16"
        >
          Everything maple does, while you do you.
        </motion.h2>

        <div className="relative max-w-4xl mx-auto space-y-12">
          {FEATURES.map((feature, i) => {
            const isHovered = hovered === i;
            const Icon = ICONS[i];
            const isLeft = feature.side === "left";

            return (
              <motion.div
                key={feature.title}
                className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <motion.div
                  className="glass rounded-2xl overflow-hidden cursor-pointer"
                  style={{ width: "420px" }}
                  animate={{
                    scale: isHovered ? 1.02 : 1,
                    boxShadow: isHovered
                      ? "0 12px 40px rgba(249,115,22,0.15), 0 1px 0 rgba(255,255,255,0.8) inset"
                      : "0 1px 3px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                    opacity: hovered !== null && !isHovered ? 0.7 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex items-center gap-3 px-5 py-4">
                    <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${feature.color}`} />
                    <h3 className="font-display text-lg font-semibold text-warm-900 tracking-tight flex-1">
                      {feature.title}
                    </h3>
                    <motion.span
                      animate={{ rotate: isHovered ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-warm-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.span>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 flex items-start gap-5">
                          <p className="text-sm leading-relaxed text-warm-500 flex-1">
                            {feature.desc}
                          </p>
                          <div className="shrink-0 pt-1">
                            <Icon />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-warm-500 leading-relaxed max-w-xl mx-auto">
            No learning curve. No tutorial. No setup wizard.
            <br />
            <span className="font-semibold text-warm-900">
              Download, press the shortcut, start talking.
            </span>
            <br />
            That&apos;s the whole thing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
