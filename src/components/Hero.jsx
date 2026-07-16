import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHeroParallax, initHeroGlowPulse } from "../animations";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Clip-path square wipe reveal ───
      gsap.fromTo(
        ".hero-clip",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power4.inOut", delay: 0.1 }
      );

      // ─── Text staggers with slight overshoot ───
      gsap.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.8 });
      gsap.to(".hero-h1 .line", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 1.0,
      });
      gsap.to(".hero-sub", { opacity: 1, y: 0, duration: 0.9, delay: 1.45, ease: "power2.out" });
      gsap.to(".hero-cta", { opacity: 1, y: 0, duration: 0.7, delay: 1.75, ease: "back.out(1.5)" });

      // ─── Hero parallax + mouse-move + glow ───
      initHeroParallax();
      initHeroGlowPulse();
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={ref} className="hero">
      {/* Background */}
      <div className="hero-bg">
        <video src="/videos/hero.mp4" autoPlay loop muted playsInline />
        <div className="hero-gradient" />
      </div>

      {/* Clip-path container for reveal */}
      <div className="hero-clip" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="container">
          <div className="hero-content">
            <p className="hero-eyebrow">Autonomous AI Agents</p>
            <h1 className="hero-h1">
              <span className="line">AUTONOMOUS</span>
              <span className="line" style={{ color: "var(--accent)" }}>AGENTS</span>
              <span className="line">FOREVER</span>
            </h1>
            <p className="hero-sub">
              Multi-agent AI systems that prospect, engage, and close — 24/7. No humans required.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary">Request Demo</a>
              <a href="#how" className="btn-outline">See How It Works</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
