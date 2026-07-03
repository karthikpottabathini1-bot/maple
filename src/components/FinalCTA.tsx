import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section id="download" className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 px-8 py-24 sm:px-16 text-center"
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 50%)" }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 70%)" }} />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-16 h-16 rounded-full bg-white/15 flex items-center justify-center"
            >
              <img
                src="/maple-leaf.png"
                alt=""
                className="h-10 w-10 object-contain"
                style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto mt-8 max-w-3xl text-balance font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white"
            >
              You were born to speak.
              <br />
              Not to type.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-lg text-white/90"
            >
              Free to start. No account needed. On every desktop.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-6"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-semibold text-amber-600 transition-all hover:bg-warm-50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                Download for macOS
              </a>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/70">
                <span className="font-medium text-white/90">
                  Available for Linux
                </span>
                <span className="text-white/40">·</span>
                <span className="font-medium text-white/70">
                  Coming soon for Windows
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-sm text-white/60"
            >
              38 MB &middot; Universal &middot; Apple Silicon
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
