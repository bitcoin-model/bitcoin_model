import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Home from './index';

describe('Home page', () => {
  it('renders active scenario information', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Bitcoin24 Modeling Portal/)).toBeInTheDocument();
  });
});
