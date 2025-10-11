import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bitcoin24.app'),
  title: {
    default: 'Bitcoin24 - 21-Year Bitcoin Investment Strategy Simulator',
    template: '%s | Bitcoin24',
  },
  description:
    'Helping you drive Bitcoin adoption with 21-year macro forecasts and micro models. Simulate individual, corporate, institutional, and nation-state Bitcoin strategies.',
  keywords: [
    'Bitcoin',
    'investment',
    'strategy',
    'forecast',
    'crypto',
    'portfolio',
    'BTC',
    'calculator',
    'simulator',
  ],
  authors: [
    { name: 'Michael J. Saylor' },
    { name: 'Shirish Jajodia' },
    { name: 'Chaitanya Jain' },
  ],
  creator: 'Bitcoin24 Team',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: ['zh_CN', 'en_US', 'ja_JP'],
    url: 'https://bitcoin24.app',
    siteName: 'Bitcoin24',
    title: 'Bitcoin24 - 21-Year Bitcoin Investment Strategy Simulator',
    description: 'Simulate 21-year Bitcoin investment strategies for individuals, corporations, institutions, and nation-states.',
    images: [
      {
        url: '/bitcoin.png',
        width: 800,
        height: 600,
        alt: 'Bitcoin24',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin24',
    description: '21-year Bitcoin investment strategy simulator',
    images: ['/bitcoin.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
