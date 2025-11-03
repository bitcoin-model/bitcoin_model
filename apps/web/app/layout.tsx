import './global.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ThemeProvider } from '@bitcoin24/ui';
import { Providers } from '../src/providers/Providers';

export const metadata: Metadata = {
  title: 'Bitcoin24 Model',
  description: 'Scenario planning workspace for Bitcoin adoption strategies.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
