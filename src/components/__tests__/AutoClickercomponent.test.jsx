import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AutoClickerComponent } from '../AutoClickerComponent';

describe('AutoClickerComponent', () => {
  it('renders the count and nextPurchase', () => {
    render(
      <AutoClickerComponent
        count={2}
        nextPurchase={100}
        points={50}
        onBuy={() => {}}
      />
    );

    expect(screen.getByText(/Autoclickers: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Price: 100/i)).toBeInTheDocument();
  });

  it('disables the button when not enough points', () => {
    render(
      <AutoClickerComponent
        count={1}
        nextPurchase={200}
        points={100}
        onBuy={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /buy autoclicker/i });
    expect(button).toBeDisabled();
  });

  it('enables the button when enough points', () => {
    render(
      <AutoClickerComponent
        count={1}
        nextPurchase={100}
        points={200}
        onBuy={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /buy autoclicker/i });
    expect(button).toBeEnabled();
  });

  it('calls onBuy when button is clicked', () => {
    const onBuyMock = vi.fn();

    render(
      <AutoClickerComponent
        count={1}
        nextPurchase={100}
        points={200}
        onBuy={onBuyMock}
      />
    );

    const button = screen.getByRole('button', { name: /buy autoclicker/i });
    fireEvent.click(button);

    expect(onBuyMock).toHaveBeenCalledTimes(1);
  });
});
