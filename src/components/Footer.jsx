export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-logo">
              Net<span style={{ color: "var(--brand)" }}>W</span>it
            </div>
            <p>The AI agent platform for enterprise revenue teams. Vancouver-based. Global reach.</p>
          </div>

          <div>
            <h4 className="footer-col-title">Product</h4>
            <div className="footer-links">
              {["Agentic AI", "Workflow Engine", "Analytics", "Integrations", "API"].map((l) => (
                <a key={l} href="#">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Company</h4>
            <div className="footer-links">
              {["About", "Blog", "Careers", "Press", "Contact"].map((l) => (
                <a key={l} href="#">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Legal</h4>
            <div className="footer-links">
              {["Privacy Policy", "Terms of Service", "Security", "GDPR"].map((l) => (
                <a key={l} href="#">{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2024 NetWit Inc. All rights reserved.</p>
          <div className="footer-socials">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a key={s} href="#">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
