import { ProductConfig } from "@/lib/products/types";

interface Props {
  product: ProductConfig;
}

export default function UseCasesSection({ product }: Props) {
  const { useCasesTitle, useCases } = product;

  return (
    <section
      className="py-8"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container">
        <div className="mb-6">
          <h2 className="section-heading mb-1">{useCasesTitle}</h2>
          <div
            className="h-0.5 w-12 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </div>

        {/* Chip grid — wraps naturally */}
        <div className="flex flex-wrap gap-2.5">
          {useCases.map((useCase, i) => (
            <span key={i} className="chip">
              ✔ {useCase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
