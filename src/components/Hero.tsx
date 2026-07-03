import { motion } from "framer-motion";
import HeroForge from "./HeroForge";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-28 pb-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          {/* Left copy */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-warm-900"
            >
              Sweeter
              <br />
              than typing.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-warm-500"
            >
              maple turns your voice into clean, polished text in any app &mdash; faster than typing, with every word transcribed right on your device.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
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

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-sm text-warm-400"
            >
              38 MB &middot; Free to try &middot; Apple Silicon &amp; Intel
            </motion.p>
          </div>

          {/* Right — HeroForge demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="card-solid overflow-hidden rounded-2xl shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_30px_70px_-40px_rgba(24,24,27,0.15)]">
              <HeroForge />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
