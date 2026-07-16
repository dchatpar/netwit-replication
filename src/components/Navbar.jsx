import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initNavbarAnimations } from "../animations";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  useEffect(() => {
    initNavbarAnimations();
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo">
            Net<span>W</span>it
          </a>
          <a href="#contact" className="btn-primary navbar-cta">
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
