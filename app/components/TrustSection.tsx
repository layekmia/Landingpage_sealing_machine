/**
 * TrustSection — COD trust signals.
 * These are universal for all Bangladesh COD products, so they're
 * intentionally static. If a product needs custom trust items,
 * add a `trustItems` field to ProductConfig.
 */
export default function TrustSection() {
  const items = [
    {
      icon: "💳",
      title: "Cash On Delivery",
      desc: "আগে পণ্য হাতে পান, তারপর টাকা দিন",
    },
    {
      icon: "🚚",
      title: "সারা বাংলাদেশ",
      desc: "সকল জেলায় Home Delivery",
    },
    {
      icon: "📦",
      title: "নিরাপদ Packaging",
      desc: "পণ্য সুরক্ষিতভাবে পাঠানো হয়",
    },
  ];

  return (
    <section
      className="py-8"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container">
        <div className="grid grid-cols-3 gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2 rounded-2xl p-3"
              style={{
                background: "var(--color-bg)",
                border: "1.5px solid var(--color-border)",
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <p
                className="text-xs font-bold leading-snug"
                style={{ color: "var(--color-secondary)" }}
              >
                {item.title}
              </p>
              <p
                className="text-xs leading-snug"
                style={{ color: "var(--color-muted)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
