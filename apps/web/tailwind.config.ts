import type { Config } from 'tailwindcss';
import preset from '@bitcoin24/config/tailwind-preset';
import animate from 'tailwindcss-animate';

const config: Config = {
  presets: [preset],
  content: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        dashboard: 'repeat(auto-fit, minmax(320px, 1fr))'
      }
    }
  },
  plugins: [animate]
};

export default config;
