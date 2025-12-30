import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import '../../visual-components/styles/globals.scss';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const merriweather = Merriweather({
  variable: '--font-merriweather',
  weight: '700',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Admin Bereich',
  description: 'Admin Bereich der Garage Stucki AG',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${merriweather.variable}`}>{children}</body>
    </html>
  );
}
