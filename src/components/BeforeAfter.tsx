import { motion } from "framer-motion";

const BEFORE = ["~40 wpm", "typos and backspace", "lose your train of thought"];
const AFTER  = ["~150 wpm", "speak then done", "stay in flow"];

export default function BeforeAfter() {
  return (
    <section className="py-16 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900"
        >
          Your fingers have a speed limit. Your voice doesn&apos;t.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="inline-block rounded-full bg-warm-200/50 px-3 py-1 text-xs font-medium text-warm-500">Without maple</span>
            <div className="mt-6 space-y-4">
              {BEFORE.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-warm-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
                  <span className="text-warm-500">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-amber rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600">With maple</span>
            <div className="mt-6 space-y-4">
              {AFTER.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4.5 4.5L19 6" /></svg>
                  <span className="text-warm-900 font-medium">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
