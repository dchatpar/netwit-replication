import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "10x", label: "Faster lead response" },
  { value: "73%", label: "Reduction in manual tasks" },
  { value: "$2.4M", label: "Average annual savings" },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const s = gsap.utils.selector(ref);

      // Eyebrow
      s(".about-eyebrow").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });

      // Title
      s(".about-title").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });

      // Subtitle
      s(".about-sub").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });

      // Stat cards stagger
      s(".stat-card").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 30, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });

      // About image with float
      s(".about-image-section").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });

        // Continuous float animation
        gsap.to(el, {
          y: -15, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1,
          scrollTrigger: {
            trigger: el, start: "top bottom", end: "bottom top", scrub: 1
          }
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="section-py" style={{ background: "var(--bg)" }}>
      <div className="container">
        <p className="about-eyebrow section-eyebrow">Why NetWit?</p>
        <h2 className="about-title section-title">The AI agent platform<br />for enterprise revenue teams.</h2>
        <p className="about-sub section-sub">
          From first outreach to closed-won — NetWit agents run your entire revenue pipeline, 24/7, with human-level intelligence.
        </p>
        <div className="stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="about-image-section">
          <img src="/img/about.webp" alt="NetWit platform" />
          <div className="about-image-overlay">
            <p>Watch your pipeline fill itself — on autopilot.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
