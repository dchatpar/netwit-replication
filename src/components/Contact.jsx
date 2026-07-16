import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const s = gsap.utils.selector(ref);

      // Form container reveal
      s("#contact-form-inner").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });

      // Stagger form fields
      s(".form-group").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });

      // Submit button
      s(".form-submit").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          delay: 0.5,
          scrollTrigger: { trigger: el, start: "top 92%" }
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="section-py" style={{ background: "var(--bg)" }}>
      <div className="container">
        <p className="section-eyebrow">Get started</p>
        <h2 className="section-title">Ready to go <span className="text-accent">agentic?</span></h2>
        <p className="section-sub" style={{ maxWidth: "480px" }}>Get a personalized demo in 24 hours. No commitment, no credit card required.</p>

        <form id="contact-form-inner" className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First name</label>
              <input id="firstName" type="text" className="form-input" placeholder="First name" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last name</label>
              <input id="lastName" type="text" className="form-input" placeholder="Last name" required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="workEmail">Work email</label>
            <input id="workEmail" type="email" className="form-input" placeholder="you@company.com" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="company">Company</label>
            <input id="company" type="text" className="form-input" placeholder="Company name" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="teamSize">Team size</label>
            <select id="teamSize" className="form-select" required defaultValue="">
              <option value="" disabled>Select team size</option>
              <option>1 – 10</option>
              <option>11 – 50</option>
              <option>51 – 200</option>
              <option>201 – 500</option>
              <option>500+</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="useCase">Use case</label>
            <textarea id="useCase" className="form-textarea" placeholder="Tell us about your needs..." rows={4} />
          </div>
          <button type="submit" className="btn-primary form-submit">Request Free Demo</button>
        </form>
      </div>
    </section>
  );
}
