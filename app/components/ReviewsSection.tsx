import { ProductConfig } from "@/lib/products/types";

interface Props {
  product: ProductConfig;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="star" aria-hidden="true">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection({ product }: Props) {
  const { reviews } = product;

  return (
    <section
      className="py-8"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container">
        <div className="mb-6">
          <h2 className="section-heading mb-1">ক্রেতাদের মতামত</h2>
          <div
            className="h-0.5 w-12 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </div>

        <div className="flex flex-col gap-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="card p-5"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <StarRating rating={review.rating} />
              <p
                className="mt-2.5 mb-3 text-base leading-relaxed font-medium"
                style={{ color: "var(--color-secondary)" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                {/* Avatar placeholder */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold leading-none"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-muted-light)" }}
                  >
                    {review.location}
                  </p>
                </div>
                <span
                  className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--color-success-bg)",
                    color: "var(--color-success)",
                  }}
                >
                  ✓ Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
