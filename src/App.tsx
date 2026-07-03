import AmbientCanvas from "./components/AmbientCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoTicker from "./components/LogoTicker";
import BeforeAfter from "./components/BeforeAfter";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import AutoEdits from "./components/AutoEdits";
import Pricing from "./components/Pricing";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-6 relative z-10">
      <div className="h-px bg-gradient-to-r from-transparent via-warm-200 to-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-warm-50 overflow-x-hidden relative">
      <AmbientCanvas />
      <div className="grain" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Divider />
        <LogoTicker />
        <Divider />
        <BeforeAfter />
        <Divider />
        <HowItWorks />
        <Divider />
        <Features />
        <AutoEdits />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
