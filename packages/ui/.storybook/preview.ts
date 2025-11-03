import type { Preview } from '@storybook/react';
import '../src/theme/global.css';
import { ThemeProvider } from '../src/providers/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen bg-[var(--color-bg-base)] p-6 text-[var(--color-text-primary)]">
          <Story />
        </div>
      </ThemeProvider>
    )
  ]
};

export default preview;
