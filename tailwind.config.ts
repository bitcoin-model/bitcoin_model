import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0B0E11',
          surface: 'rgba(25, 32, 40, 0.85)'
        },
        accent: {
          primary: '#F7931A',
          secondary: '#2DD4BF',
          warning: '#F59E0B',
          error: '#F87171'
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8'
        },
        border: {
          subtle: 'rgba(148, 163, 184, 0.2)'
        }
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['"Space Grotesk"', ...fontFamily.sans]
      },
      boxShadow: {
        glass: '0 20px 45px rgba(0,0,0,0.35)'
      },
      backgroundImage: {
        'noise-gradient': 'linear-gradient(135deg, rgba(247,147,26,0.15), rgba(45,212,191,0.08))'
      }
    }
  },
  plugins: []
};

export default config;
