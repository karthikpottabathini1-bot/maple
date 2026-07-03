import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <nav className={`flex items-center gap-6 rounded-full px-5 py-3 bg-white/70 backdrop-blur-2xl border transition-shadow duration-300 ${scrolled ? "border-warm-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]" : "border-white/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"}`}>
          <a href="/" className="flex items-center shrink-0" aria-label="maple home">
            <img src="/maple-wordmark.png" alt="maple" className="h-10 w-auto" />
          </a>

          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-warm-500">
            <a href="#how" className="transition-colors hover:text-warm-900">How it works</a>
            <a href="#pricing" className="transition-colors hover:text-warm-900">Pricing</a>
          </div>

          <a
            href="#download"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-[0_0_24px_rgba(249,115,22,0.35)]"
          >
            Download
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full text-warm-900 hover:bg-warm-100/50"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 right-4 z-50 glass rounded-2xl p-6 sm:hidden"
          >
            <div className="flex flex-col gap-4">
              <a href="#how" onClick={() => setMobileOpen(false)} className="text-base font-medium text-warm-900 py-2">How it works</a>
              <a href="#pricing" onClick={() => setMobileOpen(false)} className="text-base font-medium text-warm-900 py-2">Pricing</a>
              <a href="#download" onClick={() => setMobileOpen(false)} className="rounded-full bg-amber-500 px-5 py-2.5 text-center text-sm font-semibold text-white">Download</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
