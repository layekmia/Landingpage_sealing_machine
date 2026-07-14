import { ProductConfig } from "@/lib/products/types";

import HeroSection from "./HeroSection";
import GallerySection from "./GallerySection";
import BenefitsSection from "./BenefitsSection";
import UseCasesSection from "./UseCasesSection";
import ReviewsSection from "./ReviewsSection";
import TrustSection from "./TrustSection";
import OrderFormSection from "./OrderFormSection";
import FaqSection from "./FaqSection";
import StickyBar from "./StickyBar";

interface Props {
  product: ProductConfig;
}

/**
 * LandingPage — the engine that assembles all sections.
 * Only accepts a ProductConfig; contains zero hardcoded product data.
 */
export default function LandingPage({ product }: Props) {
  return (
    <>
      <main className="pb-sticky">
        <HeroSection product={product} />
        <GallerySection product={product} />
        <BenefitsSection product={product} />
        <UseCasesSection product={product} />
        <ReviewsSection product={product} />
        <TrustSection />
        <OrderFormSection product={product} />
        <FaqSection product={product} />
      </main>
      <StickyBar product={product} />
    </>
  );
}
