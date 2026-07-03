import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Your voice never leaves your Mac.",
    desc: "Transcription runs locally, in real time. No server ever sees your words. No account required. Just you.",
    icon: "lock",
  },
  {
    title: "Polish that actually works.",
    desc: "Filler words dissolve. Punctuation lands where it belongs. Your rambling becomes prose you'd actually send.",
    icon: "wave",
  },
  {
    title: "Works where you work.",
    desc: "Notion. Slack. Terminal. Linear. iMessage. Everywhere you can type, maple follows. No plugins needed.",
    icon: "apps",
  },
  {
    title: "47 languages and counting.",
    desc: "Speak in any supported language. maple detects, adapts, and transcribes automatically.",
    icon: "globe",
  },
  {
    title: "It learns your words.",
    desc: "Product names, code terms, inside jokes. Teach maple your vocabulary once — it remembers forever.",
    icon: "brain",
  },
  {
    title: "Zero setup. Zero friction.",
    desc: "No learning curve. No tutorial. No setup wizard. Download, press the shortcut, start talking.",
    icon: "bolt",
  },
];

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    lock: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    wave: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h2l2-6 4 12 4-12 4 12 2-6h2" />
      </svg>
    ),
    apps: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    brain: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-3.04z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-3.04z" />
      </svg>
    ),
    bolt: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900 mb-4"
        >
          Everything maple does,
          <br />
          while you do you.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-warm-500 max-w-md mb-16"
        >
          No plugins. No accounts. No learning curve. Just press a shortcut and talk.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-warm-200 border border-warm-200 rounded-2xl overflow-hidden">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="bg-warm-50 p-8 hover:bg-white transition-colors duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Icon name={feature.icon} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-warm-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-500">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
