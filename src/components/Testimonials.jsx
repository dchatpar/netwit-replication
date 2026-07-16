import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  { quote: "NetWit replaced our entire manual prospecting operation. We see 4x more qualified meetings every single week.", name: "Sarah Chen", role: "VP of Sales, TechCorp", avatar: "/img/avatar-sc.webp" },
  { quote: "We deployed 12 AI agents in one afternoon. Three months later, our conversion rate jumped 73%. This isn&apos;t the future — it&apos;s now.", name: "Marcus Johnson", role: "Head of Growth, ScaleAI", avatar: "/img/avatar-mj.webp" },
];

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const s = gsap.utils.selector(ref);

      // Card stagger
      s(".testi-card").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 50, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, ease: "power3.out", delay: i * 0.2,
          scrollTrigger: { trigger: el, start: "top 85%" }
        });

        // Avatar pop
        const avatar = el.querySelector(".testi-avatar");
        if (avatar) {
          gsap.fromTo(avatar, { scale: 0, rotation: -15, opacity: 0 }, {
            scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: "back.out(2)",
            delay: i * 0.2 + 0.3,
            scrollTrigger: { trigger: el, start: "top 88%" }
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={ref} className="section-py" style={{ background: "var(--bg)" }}>
      <div className="container">
        <p className="section-eyebrow">Social proof</p>
        <h2 className="section-title">What teams are <span className="text-accent">saying.</span></h2>
        <p className="section-sub">Real outcomes from real customers after 90 days.</p>
        <div className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testi-card">
              <p className="testi-quote" dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }} />
              <div className="testi-author">
                <img src={t.avatar} alt={t.name} className="testi-avatar" />
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
