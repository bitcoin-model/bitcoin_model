export const colorTokens = {
  light: {
    '--color-bg-base': '#F8FAFC',
    '--color-bg-surface': 'rgba(255, 255, 255, 0.9)',
    '--color-surface-elevated': 'rgba(248, 250, 252, 0.65)',
    '--color-primary': '#F7931A',
    '--color-accent': '#2DD4BF',
    '--color-warning': '#F59E0B',
    '--color-danger': '#F87171',
    '--color-success': '#34D399',
    '--color-text-primary': '#0B0E11',
    '--color-text-secondary': '#475569',
    '--color-border': 'rgba(148, 163, 184, 0.35)',
    '--color-muted': 'rgba(148, 163, 184, 0.2)'
  },
  dark: {
    '--color-bg-base': '#0B0E11',
    '--color-bg-surface': 'rgba(25, 32, 40, 0.85)',
    '--color-surface-elevated': 'rgba(16, 23, 32, 0.88)',
    '--color-primary': '#F7931A',
    '--color-accent': '#2DD4BF',
    '--color-warning': '#F59E0B',
    '--color-danger': '#F87171',
    '--color-success': '#22D3EE',
    '--color-text-primary': '#F8FAFC',
    '--color-text-secondary': '#94A3B8',
    '--color-border': 'rgba(148, 163, 184, 0.2)',
    '--color-muted': 'rgba(148, 163, 184, 0.1)'
  }
};

export const elevationTokens = {
  '--shadow-glass': '0 20px 45px rgba(0,0,0,0.35)',
  '--shadow-inner-glow': 'inset 0 0 0 1px rgba(255,255,255,0.04)'
};

export const blurTokens = {
  '--blur-glass': '12px'
};

export const transitionTokens = {
  '--transition-theme': '200ms'
};

export const fontTokens = {
  '--font-display': '"Space Grotesk"',
  '--font-body': 'Inter',
  '--font-mono': '"JetBrains Mono"'
};

export const spacingTokens = {
  '--spacing-xs': '4px',
  '--spacing-sm': '8px',
  '--spacing-md': '16px',
  '--spacing-lg': '24px',
  '--spacing-xl': '32px'
};

export const radiusTokens = {
  '--radius-sm': '8px',
  '--radius-md': '16px',
  '--radius-lg': '24px'
};

export const gradientTokens = {
  '--gradient-hero': 'linear-gradient(135deg, rgba(247,147,26,0.85) 0%, rgba(45,212,191,0.65) 100%)'
};

export const reducedMotionTokens = {
  '--motion-duration': '0.4s',
  '--motion-ease': 'cubic-bezier(0.16, 1, 0.3, 1)'
};

export type ThemeMode = keyof typeof colorTokens;

export const createThemeStyle = (mode: ThemeMode): string => {
  const colors = colorTokens[mode];
  const combined = {
    ...colors,
    ...elevationTokens,
    ...blurTokens,
    ...transitionTokens,
    ...fontTokens,
    ...spacingTokens,
    ...radiusTokens,
    ...gradientTokens,
    ...reducedMotionTokens
  };

  return Object.entries(combined)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
};
