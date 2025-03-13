import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import '../visual-components/styles/globals.scss';
import Script from 'next/script';

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
  title: 'Garage Stucki AG',
  description: 'Willkommen bei Ihrem KGM-Partner in der Region Oberaargau.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <Script src="https://cloud.umami.is/script.js" defer data-website-id="42e8edaa-5be5-4997-b7f7-ef7e1dcd96a8" />
      <body className={`${inter.variable} ${merriweather.variable}`}>{children}</body>
    </html>
  );
}
