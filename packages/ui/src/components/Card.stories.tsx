import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  },
  args: {
    title: 'Data Snapshot',
    description: 'Key highlights from the active Bitcoin scenario.'
  }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[360px]">
      <Card {...args}>
        <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <li>• Annualized return: 72%</li>
          <li>• Treasury allocation: 45%</li>
          <li>• Discounted cash flow variance: 12%</li>
        </ul>
      </Card>
    </div>
  )
};
