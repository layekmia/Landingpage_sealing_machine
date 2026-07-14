import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { ProductConfig } from "@/lib/products/types";

interface Props {
  product: ProductConfig;
}

export default function HeroSection({ product }: Props) {
  const { headline, subheadline, badge, images, pricing, delivery, ctaText } =
    product;

  return (
    <section className="bg-surface">
      {/* Product Image */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "4/3", maxHeight: "420px" }}
      >
        <Image
          src={images[0]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 520px) 100vw, 520px"
          className="object-cover"
          style={{ objectPosition: "center" }}
        />
        {/* Gradient overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="section-container py-6">
        {/* Badge */}
        {badge && (
          <div className="mb-3">
            <span className="badge">{badge}</span>
          </div>
        )}

        {/* Headline */}
        <h1
          className="text-2xl font-bold leading-snug mb-2"
          style={{ color: "var(--color-secondary)" }}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        <p
          className="text-base leading-relaxed mb-5"
          style={{ color: "var(--color-muted)" }}
        >
          {subheadline}
        </p>

        {/* Pricing Card */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            background: "var(--color-primary-light)",
            border: "1.5px solid rgb(232 93 4 / 0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-1">
            <span
              className="text-sm line-through font-medium"
              style={{ color: "var(--color-muted)" }}
            >
              {pricing.currency}
              {pricing.original}
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
              }}
            >
              {Math.round(
                ((pricing.original - pricing.current) / pricing.original) * 100,
              )}
              % ছাড়
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              মাত্র
            </span>
            <span
              className="text-4xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              {pricing.currency}
              {pricing.current}
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        {/* <div
          className="flex flex-col gap-1 mb-6 px-1"
          style={{ color: "var(--color-muted)" }}
        >
          <div className="flex items-center gap-2 text-sm">
            <span>🚚</span>
            <span>
              ঢাকার ভিতরে:{" "}
              <strong style={{ color: "var(--color-secondary)" }}>
                {pricing.currency}
                {delivery.insideDhaka}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🚚</span>
            <span>
              ঢাকার বাইরে:{" "}
              <strong style={{ color: "var(--color-secondary)" }}>
                {pricing.currency}
                {delivery.outsideDhaka}
              </strong>
            </span>
          </div>
        </div> */}

        {/* CTA */}
        <a href="#order-form" className="btn-primary animate-fade-in-up">
          {ctaText}
        </a>

        {/* Trust micro-copy */}
        <p
          className="text-center text-xs mt-3 flex items-center justify-center gap-1"
          style={{ color: "var(--color-muted-light)" }}
        >
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          Cash On Delivery &nbsp;·&nbsp; সারা বাংলাদেশ
        </p>
      </div>
    </section>
  );
}
