import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import About from "./components/About";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Metrics from "./components/Metrics";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import {
  initHeroParallax,
  initNavbarAnimations,
  initVideoAutoplay,
  initMarqueeHover,
  initMagneticButtons,
  initFormAnimations,
  initHeroGlowPulse,
  initMarqueeReveal,
  initFooterReveal,
} from "./animations";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // ─── Lenis smooth scroll ───
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Kill any lingering ScrollTrigger instances before re-initialising
    // (prevents double-animation in StrictMode / React 18 dev re-mounts)
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // ─── Run all premium animations ───
    const cleanups = [
      initHeroParallax(),
      initNavbarAnimations(),
      initVideoAutoplay(),
      initMarqueeHover(),
      initMagneticButtons(),
      initFormAnimations(),
      initHeroGlowPulse(),
      initMarqueeReveal(),
      initFooterReveal(),
    ];

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      cleanups.forEach((fn) => fn && fn());
    };
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <About />
        <Features />
        <HowItWorks />
        <Metrics />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
