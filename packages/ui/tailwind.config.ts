import type { Config } from 'tailwindcss';
import preset from '@bitcoin24/config/tailwind-preset';

const config: Config = {
  presets: [preset],
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(247, 147, 26, 0.0)' },
          '50%': { boxShadow: '0 0 0 12px rgba(247, 147, 26, 0.1)' }
        }
      }
    }
  }
};

export default config;
