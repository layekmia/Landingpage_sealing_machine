export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Pricing {
  original: number;
  current: number;
  currency: string; // e.g. '৳'
}

export interface DeliveryConfig {
  insideDhaka: number;
  outsideDhaka: number;
}

/**
 * ProductConfig — the complete data contract for a single landing page product.
 * All UI components accept this interface. To add a new product, create a new
 * config object satisfying this interface and register it in lib/products/index.ts.
 */
export interface ProductConfig {
  /** URL slug: e.g. "sealing-machine" → domain.com/sealing-machine */
  slug: string;

  /** Full product name (used in order summary, meta etc.) */
  name: string;

  /** Optional badge shown in hero (e.g. "🔥 বেস্টসেলার") */
  badge?: string;

  /** Hero headline — short, punchy Bangla sentence */
  headline: string;

  /** Hero subheadline — 1-2 sentence product description */
  subheadline: string;

  /** Product image paths relative to /public (first image = hero image) */
  images: string[];

  /** Optional video path relative to /public */
  videoSrc?: string;

  /** Poster image for video (path relative to /public) */
  videoPoster?: string;

  pricing: Pricing;
  delivery: DeliveryConfig;

  /** Section title for benefits */
  benefitsTitle: string;

  /** List of benefit strings (short phrases) */
  benefits: string[];

  /** Section title for use cases */
  useCasesTitle: string;

  /** List of use case labels (e.g. "Chips", "Biscuit") */
  useCases: string[];

  reviews: Review[];
  faqs: Faq[];

  /** Text for hero CTA button */
  ctaText: string;

  /** Text for order form submit button */
  formCtaText: string;

  seo: {
    title: string;
    description: string;
  };
}
