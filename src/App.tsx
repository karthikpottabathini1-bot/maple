import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import AutoEdits from "./components/AutoEdits";
import Pricing from "./components/Pricing";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-warm-50 overflow-x-hidden relative">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <LogoStrip />
        <Stats />
        <HowItWorks />
        <Features />
        <AutoEdits />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
