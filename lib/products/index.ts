import { ProductConfig } from './types';
import { sealingMachine } from './sealing-machine';

/**
 * Central product registry.
 * To add a new product:
 *   1. Create lib/products/my-product.ts satisfying ProductConfig
 *   2. Import it here and add to the map
 *   3. A route /my-product-slug is automatically created via app/[slug]/page.tsx
 */
const PRODUCT_REGISTRY: Record<string, ProductConfig> = {
  'sealing-machine': sealingMachine,
  // 'next-product': nextProduct,  ← add more here
};

/** Returns the ProductConfig for a given slug, or null if not found. */
export function getProduct(slug: string): ProductConfig | null {
  return PRODUCT_REGISTRY[slug] ?? null;
}

/** Returns all registered slugs (used for generateStaticParams). */
export function getAllSlugs(): string[] {
  return Object.keys(PRODUCT_REGISTRY);
}
