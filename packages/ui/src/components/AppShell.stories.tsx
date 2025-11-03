import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';
import { Card } from './Card';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  args: {
    header: <div className="flex w-full items-center justify-between text-sm"><span className="font-display text-lg">Bitcoin24</span><span className="text-[var(--color-text-secondary)]">Demo Session</span></div>,
    sidebar: (
      <div className="flex flex-col gap-4 text-sm text-[var(--color-text-secondary)]">
        <span className="font-semibold text-[var(--color-text-primary)]">Navigation</span>
        <ul className="space-y-2">
          <li>Dashboard</li>
          <li>Macro Model</li>
          <li>Scenario Library</li>
        </ul>
      </div>
    ),
    children: (
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Active Scenario" description="BTC Maxi Projection">
          <p className="text-sm">Quick metrics and guardrails render inside glassmorphism cards.</p>
        </Card>
        <Card title="Price Feed" description="Latest Bitcoin Price">
          <p className="text-sm">Real-time data fetched via React Query is displayed here.</p>
        </Card>
      </div>
    )
  }
};
