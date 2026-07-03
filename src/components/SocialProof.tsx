import { motion } from "framer-motion";

const LOGOS = ["Stripe", "Linear", "Vercel", "Notion", "Figma", "GitHub"];

export default function SocialProof() {
  return (
    <section className="py-16 relative z-10">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-sm text-warm-400"
        >
          Used by writers, engineers, and founders at
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-35"
        >
          {LOGOS.map((name) => (
            <span key={name} className="font-display text-lg font-semibold tracking-tight text-warm-900">
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
