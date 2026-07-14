import { ProductConfig } from "@/lib/products/types";

interface Props {
  product: ProductConfig;
}

export default function BenefitsSection({ product }: Props) {
  const { benefitsTitle, benefits } = product;

  return (
    <section
      className="py-8"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container">
        {/* Heading with accent line */}
        <div className="mb-6">
          <h2 className="section-heading mb-1">{benefitsTitle}</h2>
          <div
            className="h-0.5 w-12 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </div>

        {/* Benefits list */}
        <ul className="flex flex-col gap-3">
          {benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <span
                className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold"
                style={{
                  background: "var(--color-success-light)",
                  color: "var(--color-success)",
                }}
              >
                ✓
              </span>
              <span
                className="text-base leading-snug font-medium"
                style={{ color: "var(--color-secondary)" }}
              >
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
