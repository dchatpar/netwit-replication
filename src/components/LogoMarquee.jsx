const BRANDS = [
  { name: "Salesforce", color: "#00A1E0" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Zendesk", color: "#03363D" },
  { name: "Intercom", color: "#1F8DED" },
];

export default function LogoMarquee() {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="marquee-section">
      <div className="container">
        <p className="marquee-label">Trusted by leading revenue teams</p>
      </div>
      <div className="marquee-track-wrap">
        <div className="marquee-track">
          {doubled.map((b, i) => (
            <span
              key={i}
              className="marquee-item"
              style={{ color: b.color }}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
