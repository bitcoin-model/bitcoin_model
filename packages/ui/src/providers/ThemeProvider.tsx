'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { PropsWithChildren, useEffect } from 'react';
import { createThemeStyle } from '../theme/tokens';

type ThemeProviderProps = PropsWithChildren<{ defaultTheme?: 'light' | 'dark' }>;

export const ThemeProvider = ({ children, defaultTheme = 'dark' }: ThemeProviderProps) => {
  useEffect(() => {
    const styleTagId = 'bitcoin24-theme-styles';
    let styleTag = document.getElementById(styleTagId) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleTagId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `:root {${createThemeStyle('light')}}\n[data-theme='dark'] {${createThemeStyle('dark')}}`;

    return () => {
      if (styleTag?.parentNode) {
        styleTag.parentNode.removeChild(styleTag);
      }
    };
  }, []);

  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
};
