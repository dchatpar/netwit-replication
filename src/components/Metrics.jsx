import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: 500, suffix: "+", label: "Enterprise clients onboarded" },
  { value: 99.9, suffix: "%", label: "Uptime SLA guaranteed" },
  { value: 150, suffix: "+", label: "Native integrations" },
  { value: 4, suffix: "x", label: "Faster deployment" },
];

export default function Metrics() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const s = gsap.utils.selector(ref);

      // Card entrance with skew/rotation - scoped query
      s(".metric-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.92, rotateZ: i % 2 === 0 ? -2 : 2 },
          {
            opacity: 1, y: 0, scale: 1, rotateZ: 0,
            duration: 0.8, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%" }
          }
        );
      });

      // Counter animations - properly scoped with closure-based proxy
      s(".metric-counter").forEach((el, i) => {
        const m = METRICS[i];
        const target = m.value;
        const isDecimal = target % 1 !== 0;
        const hasPlus = m.suffix === "+" || m.suffix === "x";
        const hasPercent = m.suffix === "%";
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate() {
            let text = isDecimal ? proxy.val.toFixed(1) : Math.round(proxy.val);
            if (hasPlus && !hasPercent) text += "+";
            if (hasPercent) text += "%";
            el.textContent = text;
          }
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" ref={ref} className="section-py" style={{ background: "#050505" }}>
      <div className="container">
        <p className="section-eyebrow">By the numbers</p>
        <h2 className="section-title">Numbers that <span className="text-accent">matter.</span></h2>
        <p className="section-sub">Real results from 500+ enterprise deployments across 40 countries.</p>
        <div className="metrics-grid">
          {METRICS.map((m) => (
            <div key={m.label} className="metric-card">
              <div className="metric-value-row">
                <span className="metric-counter">0</span>
                <span className="metric-suffix">{m.suffix}</span>
              </div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
