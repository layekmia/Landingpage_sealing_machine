'use client';

import { useState } from 'react';
import { ProductConfig } from '@/lib/products/types';

interface Props {
  product: ProductConfig;
}

export default function FaqSection({ product }: Props) {
  const { faqs } = product;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      className="py-10"
      style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="section-container">
        <div className="mb-6">
          <h2 className="section-heading mb-1">সচরাচর জিজ্ঞাসা</h2>
          <div className="h-0.5 w-12 rounded-full" style={{ background: 'var(--color-primary)' }} />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  border: isOpen
                    ? '1.5px solid var(--color-primary)'
                    : '1.5px solid var(--color-border)',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                }}
              >
                {/* Question row */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                  style={{ background: 'transparent' }}
                >
                  <span
                    className="text-base font-semibold flex-1 leading-snug"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200"
                    style={{
                      background: isOpen ? 'var(--color-primary)' : 'var(--color-bg)',
                      color: isOpen ? '#fff' : 'var(--color-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      border: '1.5px solid var(--color-border)',
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.25s ease',
                  }}
                >
                  <p
                    className="px-5 pb-5 text-base leading-relaxed"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer trust */}
        <div
          className="mt-8 rounded-2xl p-5 text-center"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="font-semibold mb-1" style={{ color: 'var(--color-secondary)' }}>
            আরও প্রশ্ন আছে?
          </p>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            অর্ডার করুন — আমরা ফোন করে সব তথ্য জানাব।
          </p>
        </div>
      </div>
    </section>
  );
}
