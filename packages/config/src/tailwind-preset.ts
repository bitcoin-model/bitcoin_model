import type { Config } from 'tailwindcss';

export const colors = {
  'bg-base': 'var(--color-bg-base)',
  'bg-surface': 'var(--color-bg-surface)',
  'surface-elevated': 'var(--color-surface-elevated)',
  primary: 'var(--color-primary)',
  accent: 'var(--color-accent)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
  success: 'var(--color-success)',
  'text-primary': 'var(--color-text-primary)',
  'text-secondary': 'var(--color-text-secondary)',
  border: 'var(--color-border)',
  muted: 'var(--color-muted)'
};

export const fontFamily = {
  display: ['var(--font-display)', 'sans-serif'],
  body: ['var(--font-body)', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace']
};

export const shadow = {
  glass: 'var(--shadow-glass)',
  focus: '0 0 0 2px var(--color-primary)',
  'inner-glow': 'var(--shadow-inner-glow)'
};

export const blur = {
  glass: 'var(--blur-glass)'
};

export const transitions = {
  theme: 'var(--transition-theme)'
};

const preset: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [],
  theme: {
    extend: {
      colors,
      fontFamily,
      boxShadow: shadow,
      backdropBlur: blur,
      transitionDuration: {
        theme: transitions.theme
      },
      screens: {
        xs: '540px',
        sm: '768px',
        md: '1024px',
        lg: '1280px',
        xl: '1440px'
      }
    }
  }
};

export default preset;
