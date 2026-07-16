import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Easing presets ─── */
export const EASE = {
  premium: "power3.out",
  snappy: "power2.out",
  smooth: "expo.out",
  bounce: "back.out(1.4)",
};

/* ─── Hero Parallax ─── */
export function initHeroParallax() {
  const heroBg = document.querySelector(".hero-bg");
  const heroVideo = document.querySelector(".hero-bg video");
  const heroContent = document.querySelector(".hero-content");

  if (!heroBg) return () => {};

  // Scroll-based parallax
  gsap.to(heroBg, {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Video subtle scale on scroll
  if (heroVideo) {
    gsap.fromTo(
      heroVideo,
      { scale: 1.15 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }

  // Content fade on scroll
  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0.3,
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "60% top",
        scrub: true,
      },
    });
  }

  // Mouse-move parallax (subtle)
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const xPct = (clientX / window.innerWidth - 0.5) * 2;
    const yPct = (clientY / window.innerHeight - 0.5) * 2;

    gsap.to(heroBg, {
      x: xPct * 20,
      y: yPct * 12,
      duration: 1.2,
      ease: "power2.out",
    });
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  return () => window.removeEventListener("mousemove", handleMouseMove);
}

/* ─── Navbar Premium Effects ─── */
export function initNavbarAnimations() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return () => {};

  // Animate navbar in on load
  gsap.fromTo(
    navbar,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
  );

  // Scroll-triggered frosted glass
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle("scrolled", scrolled);

    if (scrolled) {
      gsap.to(navbar, {
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px)",
        borderBottomColor: "rgba(255,255,255,0.08)",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(navbar, {
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "blur(0px)",
        borderBottomColor: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

/* ─── Section Title Reveals ─── */
export function initSectionReveal(selector, opts = {}) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  els.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30, skewY: 1 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: opts.duration || 0.9,
        ease: opts.ease || "power3.out",
        scrollTrigger: {
          trigger: el,
          start: opts.start || "top 88%",
          ...opts.scrollTrigger,
        },
      }
    );
  });
}

/* ─── Staggered Grid Reveals ─── */
export function initStaggerReveal(selector, opts = {}) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  gsap.fromTo(
    els,
    { opacity: 0, y: opts.y || 40, scale: opts.scale || 1 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: opts.stagger || 0.1,
      duration: opts.duration || 0.8,
      ease: opts.ease || "power3.out",
      scrollTrigger: {
        trigger: els[0],
        start: opts.start || "top 85%",
        ...opts.scrollTrigger,
      },
    }
  );
}

/* ─── Counter Animation ─── */
export function animateCounter(el, target, opts = {}) {
  const isDecimal = target % 1 !== 0;
  const hasPlus = opts.suffix === "+" || opts.suffix === "x";
  const hasPercent = opts.suffix === "%";

  gsap.fromTo(
    { val: 0 },
    { val: target },
    {
      val: target,
      duration: opts.duration || 2.2,
      ease: opts.ease || "power2.out",
      scrollTrigger: {
        trigger: el,
        start: opts.start || "top 88%",
        ...opts.scrollTrigger,
      },
      onUpdate() {
        const v = this.targets()[0].val;
        let text = isDecimal ? v.toFixed(1) : Math.round(v);
        if (hasPlus && !hasPercent) text += "+";
        if (hasPercent) text += "%";
        el.textContent = text;
      },
    }
  );
}

/* ─── Video Autoplay on Scroll ─── */
export function initVideoAutoplay() {
  const videos = document.querySelectorAll("section video");

  videos.forEach((video) => {
    // Set video to muted autoplay
    video.muted = true;
    video.playsInline = true;

    ScrollTrigger.create({
      trigger: video,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        video.play().catch(() => {});
      },
      onLeave: () => {
        video.pause();
      },
      onEnterBack: () => {
        video.play().catch(() => {});
      },
      onLeaveBack: () => {
        video.pause();
      },
    });
  });
}

/* ─── Marquee Pause on Hover ─── */
export function initMarqueeHover() {
  const track = document.querySelector(".marquee-track");
  if (!track) return;

  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
}

/* ─── Magnetic Button Effect ─── */
export function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn-primary, .btn-outline");

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    });
  });
}

/* ─── Testimonial Avatar Pop ─── */
export function initTestimonialAnimations() {
  const avatars = document.querySelectorAll(".testi-avatar");
  avatars.forEach((avatar) => {
    gsap.fromTo(
      avatar,
      { scale: 0, rotation: -15, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: avatar,
          start: "top 88%",
        },
      }
    );
  });
}

/* ─── Form Field Animations ─── */
export function initFormAnimations() {
  const inputs = document.querySelectorAll(".form-input, .form-select, .form-textarea");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      gsap.to(input, {
        borderColor: "rgba(124,58,237,0.6)",
        boxShadow: "0 0 0 3px rgba(124,58,237,0.12)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
    input.addEventListener("blur", () => {
      gsap.to(input, {
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Submit button pulse on hover
  const submitBtn = document.querySelector(".form-submit");
  if (submitBtn) {
    submitBtn.addEventListener("mouseenter", () => {
      gsap.to(submitBtn, { scale: 1.03, duration: 0.3, ease: "back.out(2)" });
    });
    submitBtn.addEventListener("mouseleave", () => {
      gsap.to(submitBtn, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    });
  }
}

/* ─── Feature Row Reveal with Clip ─── */
export function initFeatureReveal() {
  const featRows = document.querySelectorAll(".feat-row");

  featRows.forEach((row) => {
    const info = row.querySelector(".feat-info");
    const media = row.querySelector(".feat-media");

    if (info) {
      gsap.fromTo(
        info.children,
        { opacity: 0, x: row.classList.contains("reversed") ? 40 : -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
        }
      );
    }

    if (media) {
      gsap.fromTo(
        media,
        { clipPath: "inset(0 100% 0 0)", scale: 1.05 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
          },
        }
      );
    }
  });
}

/* ─── Hero Video Glow Pulse ─── */
export function initHeroGlowPulse() {
  const gradient = document.querySelector(".hero-gradient");
  if (!gradient) return;

  gsap.to(gradient, {
    opacity: 0.6,
    scale: 1.15,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

/* ─── Step Card Sequential Reveal ─── */
export function initStepReveal() {
  const steps = document.querySelectorAll(".step-card");

  steps.forEach((step, i) => {
    gsap.fromTo(
      step,
      { opacity: 0, y: 60, rotationX: 15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.12,
        scrollTrigger: {
          trigger: step,
          start: "top 88%",
        },
      }
    );

    // Big number counter-rotate effect
    const bigNum = step.querySelector(".step-num-big");
    if (bigNum) {
      gsap.fromTo(
        bigNum,
        { rotationX: 90, opacity: 0 },
        {
          rotationX: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.12 + 0.2,
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
          },
        }
      );
    }
  });
}

/* ─── About Image Float ─── */
export function initAboutImageFloat() {
  const imgSection = document.querySelector(".about-image-section");
  if (!imgSection) return;

  gsap.to(imgSection, {
    y: -15,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    scrollTrigger: {
      trigger: imgSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

/* ─── Metric Card Entrance ─── */
export function initMetricReveal() {
  const cards = document.querySelectorAll(".metric-card");

  cards.forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
        scale: 0.92,
        rotateZ: i % 2 === 0 ? -2 : 2,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
        },
      }
    );
  });
}

/* ─── Logo Marquee Reveal ─── */
export function initMarqueeReveal() {
  const marquee = document.querySelector(".marquee-section");
  if (!marquee) return;

  gsap.fromTo(
    marquee,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: marquee,
        start: "top 90%",
      },
    }
  );
}

/* ─── Footer Reveal ─── */
export function initFooterReveal() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  gsap.fromTo(
    footer.children,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
      },
    }
  );
}
