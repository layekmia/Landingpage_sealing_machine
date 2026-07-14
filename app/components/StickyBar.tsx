'use client';

import { useEffect, useState } from 'react';
import { ProductConfig } from '@/lib/products/types';

interface Props {
  product: ProductConfig;
}

export default function StickyBar({ product }: Props) {
  const [visible, setVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    // Show bar after scrolling past initial viewport
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Hide bar when order form is visible
    const formEl = document.getElementById('order-form');
    if (!formEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const show = visible && !formInView;

  return (
    <div
      className="sticky-bar"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: show ? 'auto' : 'none',
      }}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        {/* Price display */}
        <div className="flex-1">
          <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-muted)' }}>
            মাত্র
          </p>
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-xl font-bold"
              style={{ color: 'var(--color-primary)' }}
            >
              {product.pricing.currency}{product.pricing.current}
            </span>
            <span
              className="text-xs line-through"
              style={{ color: 'var(--color-muted-light)' }}
            >
              {product.pricing.currency}{product.pricing.original}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleClick}
          className="btn-primary"
          style={{ width: 'auto', padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
        >
          🛒 অর্ডার করুন
        </button>
      </div>
    </div>
  );
}
