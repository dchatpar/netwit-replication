import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: "01", icon: "🔌", title: "Connect", desc: "Plug NetWit into your stack — Salesforce, HubSpot, Slack, 150+ connectors. Five minutes, zero code." },
  { num: "02", icon: "⚙️", title: "Configure", desc: "Set your ICP, sequences, and triggers. NetWit learns your brand voice and selling style automatically." },
  { num: "03", icon: "🚀", title: "Deploy", desc: "Launch your agents. Watch them prospect, engage, and qualify 24/7. Scale without scaling headcount." },
];

export default function HowItWorks() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const s = gsap.utils.selector(ref);

      // Chip bounce
      s(".hiw-chip").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.5 }, {
          opacity: 1, scale: 1, duration: 1.2, ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });

      // Step cards with rotation entrance
      s(".step-card").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60, rotationX: 15 },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 0.8, ease: "power3.out", delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%" }
          }
        );

        // Big number counter-rotate
        const bigNum = el.querySelector(".step-num-big");
        if (bigNum) {
          gsap.fromTo(bigNum, { rotationX: 90, opacity: 0 }, {
            rotationX: 0, opacity: 1, duration: 0.6, ease: "power3.out",
            delay: i * 0.12 + 0.2,
            scrollTrigger: { trigger: el, start: "top 88%" }
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={ref} className="section-py" style={{ background: "var(--bg)" }}>
      <div className="container">
        <p className="section-eyebrow">How It Works</p>
        <h2 className="section-title">Three steps.<br /><span className="text-accent">Infinite results.</span></h2>
        <p className="section-sub">From setup to scale in under 24 hours. No complex onboarding, no months-long implementation.</p>
        <div className="hiw-chip-wrap">
          <div className="hiw-chip">
            <div className="hiw-chip-dot" />
            <span>No credit card required</span>
          </div>
        </div>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div key={s.num} className="step-card">
              <div className="step-num-big">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
