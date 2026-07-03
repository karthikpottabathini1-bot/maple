import { motion } from "framer-motion";

const STATS = [
  { value: "150+", label: "Words per minute" },
  { value: "<1s", label: "Speech-to-text latency" },
  { value: "47", label: "Supported languages" },
  { value: "100%", label: "On-device processing" },
];

export default function Stats() {
  return (
    <section className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-warm-900">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-warm-400 leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
