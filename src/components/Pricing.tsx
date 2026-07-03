import { motion } from "framer-motion";

const FREE = ["On-device transcription","Cloud formatting included","macOS, Windows & Linux"];
const PRO  = ["Everything in Free","Unlimited transcription & formatting","Custom vocabulary","Priority AI models","30-day free trial"];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900 text-center"
        >
          Pick your pace.
        </motion.h2>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-500">Free</h3>
            <p className="mt-4 font-display text-5xl font-extrabold tracking-tight text-warm-900">$0</p>
            <p className="mt-2 text-warm-500">forever</p>
            <p className="mt-3 text-sm text-warm-500">For trying it out, casual use, seeing if it fits your flow.</p>
            <ul className="mt-8 space-y-3 flex-1">
              {FREE.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-warm-500">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4.5 4.5L19 6" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#download" className="mt-8 inline-flex items-center justify-center rounded-full border border-warm-200 px-6 py-3 text-sm font-semibold text-warm-900 transition-all hover:bg-warm-50">Download</a>
            <p className="mt-3 text-xs text-warm-400">2,500 words per week</p>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-amber rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-600">Pro</h3>
              <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">Launch offer</span>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <p className="font-display text-6xl font-extrabold tracking-tight text-warm-900">$3.99</p>
              <div className="pb-2">
                <span className="text-lg font-medium text-warm-400 line-through decoration-amber-500 decoration-2">$8.99</span>
                <span className="ml-1.5 text-sm font-medium text-warm-500">/mo</span>
              </div>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600 w-fit">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              Save 55% — locks in for your first year
            </p>
            <p className="mt-3 text-sm text-warm-500">For making it your daily driver. Unlimited everything.</p>
            <ul className="mt-8 space-y-3 flex-1">
              {PRO.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-warm-800 font-medium">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4.5 4.5L19 6" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#download" className="mt-8 inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-amber-600 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)]">
              Start free trial
              <svg width="16" height="16" className="ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <p className="mt-3 text-xs text-warm-400">30-day free trial · Cancel anytime</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
