import { render, screen } from '@testing-library/react';
import { AppLayout } from '../AppLayout';

describe('AppLayout', () => {
  it('renders children inside the layout', () => {
    render(
      <AppLayout>
        <div data-testid="child">Frieren Layout</div>
      </AppLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Frieren Layout')).toBeInTheDocument();
  });

  it('renders correct container classes', () => {
    const { container } = render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );

    expect(container.firstChild).toHaveClass('w-full max-w-screen-sm mx-auto px-4');
    expect(container.firstChild.firstChild).toHaveClass('w-full max-w-screen-sm mx-auto p-4');
  });
});
