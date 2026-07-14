import { redirect } from 'next/navigation';
import { getAllSlugs } from '@/lib/products';

/**
 * Root route — redirects to the first registered product.
 * As more products are added to the registry, this can be
 * replaced with a product catalogue page.
 */
export default function Home() {
  const slugs = getAllSlugs();
  if (slugs.length > 0) {
    redirect(`/${slugs[0]}`);
  }
  return null;
}
