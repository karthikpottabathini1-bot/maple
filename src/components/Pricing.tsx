import { motion } from "framer-motion";

const FREE = ["On-device transcription", "Cloud formatting included", "macOS, Windows & Linux"];
const PRO = ["Everything in Free", "Unlimited transcription & formatting", "Custom vocabulary", "Priority AI models", "30-day free trial"];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900">
            Pick your pace.
          </h2>
          <p className="mt-4 text-lg text-warm-500 max-w-md">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-6">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="card-solid rounded-2xl p-8 flex flex-col"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-500">Free</h3>
            <p className="mt-4 font-display text-5xl font-extrabold tracking-tight text-warm-900">$0</p>
            <p className="mt-1 text-warm-500">forever</p>
            <p className="mt-4 text-sm text-warm-500">For trying it out, casual use, seeing if it fits your flow.</p>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-8 flex flex-col relative overflow-hidden border-2 border-amber-500/30 bg-white shadow-[0_8px_40px_rgba(249,115,22,0.08)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-600">Pro</h3>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600">Launch offer</span>
            </div>
            <p className="mt-4 flex items-baseline gap-2 font-display text-5xl font-extrabold tracking-tight text-warm-900">
              $3.99<span className="text-base font-medium text-warm-500">/mo</span>
            </p>
            <p className="mt-1 text-sm text-warm-400 line-through">$8.99 /mo</p>
            <p className="mt-4 text-sm text-warm-500">For making it your daily driver. Unlimited everything.</p>
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
            <p className="mt-3 text-xs text-warm-400">Launch pricing — locks in for your first year</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
