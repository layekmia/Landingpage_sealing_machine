import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, getAllSlugs } from '@/lib/products';
import LandingPage from '@/app/components/LandingPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: [{ url: product.images[0] }],
      locale: 'bn_BD',
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return <LandingPage product={product} />;
}
