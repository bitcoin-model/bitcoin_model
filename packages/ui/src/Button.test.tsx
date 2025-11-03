import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders the provided label', () => {
    const { getByRole } = render(<Button>Label</Button>);
    expect(getByRole('button', { name: 'Label' })).toBeDefined();
  });
});
