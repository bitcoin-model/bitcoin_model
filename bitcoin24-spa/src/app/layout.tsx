import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bitcoin24 - 21-Year Bitcoin Strategy Simulator',
  description: 'Helping you drive Bitcoin adoption with 21-year macro forecasts and micro models.',
  keywords: ['Bitcoin', 'investment', 'strategy', 'forecast', 'crypto', 'portfolio'],
  authors: [{ name: 'Bitcoin24 Team' }],
  openGraph: {
    title: 'Bitcoin24',
    description: '21-year Bitcoin strategy simulator',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

