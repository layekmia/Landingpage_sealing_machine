import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-bengali',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Cash On Delivery Bangladesh',
    template: '%s | COD BD',
  },
  description: 'Premium products with Cash On Delivery across Bangladesh.',
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body>{children}</body>
    </html>
  );
}
