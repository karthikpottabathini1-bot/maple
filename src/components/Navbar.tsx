import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-warm-200/40 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center shrink-0" aria-label="maple home">
              <img src="/maple-wordmark.png" alt="maple" className="h-7 w-auto" />
            </a>

            <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-warm-500">
              <a href="#how" className="transition-colors hover:text-warm-900">How it works</a>
              <a href="#pricing" className="transition-colors hover:text-warm-900">Pricing</a>
            </div>

            <a
              href="#download"
              className="hidden sm:inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-[0_0_24px_rgba(249,115,22,0.3)]"
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
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-50 bg-white border-b border-warm-200 px-6 py-6 sm:hidden"
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
