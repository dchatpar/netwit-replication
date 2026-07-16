import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { tag: "AI SDR", title: "Autonomous Prospecting", desc: "AI agents that research, outreach, and qualify leads around the clock. Free your team to do what humans do best — close.", media: "/videos/feature-1.mp4", reversed: false },
  { tag: "Workflow Engine", title: "Build Any Process Visually", desc: "Drag-and-drop workflows for every B2B process. From lead routing to email sequences to CRM updates — all visual, all automated.", media: "/videos/feature-2.mp4", reversed: true },
  { tag: "Analytics", title: "Real-Time Intelligence", desc: "Full pipeline visibility with AI-powered insights that tell you exactly what&apos;s working and what to fix next. No guesswork.", media: "/videos/feature-3.mp4", reversed: false },
];

export default function Features() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use scoped selector - queries only within this component's subtree
      const s = gsap.utils.selector(ref);

      s(".feat-tag").forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: i * 0.15
        });
      });

      s(".feat-title").forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: 0.1 + i * 0.15
        });
      });

      s(".feat-desc").forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: 0.2 + i * 0.15
        });
      });

      s(".feat-media").forEach((el) => {
        gsap.to(el, {
          opacity: 1, scale: 1, duration: 1, ease: "power1",
          scrollTrigger: { trigger: el, start: "top 82%", scrub: 2 }
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="section-py" style={{ background: "#050505" }}>
      <div className="container">
        <p className="section-eyebrow">Core Platform</p>
        <h2 className="section-title">Everything your team needs.<br />Nothing they don&apos;t.</h2>
        <div className="features-list">
          {FEATURES.map((f) => (
            <div key={f.tag} className={`feat-row${f.reversed ? " reversed" : ""}`}>
              <div className="feat-media">
                <video src={f.media} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="feat-info">
                <span className="feat-tag section-eyebrow">{f.tag}</span>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc" dangerouslySetInnerHTML={{ __html: f.desc }} />
                <a href="#contact" className="feat-link">Learn more <span>→</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
