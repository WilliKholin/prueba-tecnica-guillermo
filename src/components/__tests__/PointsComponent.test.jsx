import { render, screen, fireEvent } from '@testing-library/react';
import { PointsComponent } from '../PointsComponent';

describe('PointsComponent', () => {
  it('displays the current points', () => {
    render(<PointsComponent points={42} onGainPoint={() => {}} />);
    expect(screen.getByText('Points: 42')).toBeInTheDocument();
  });

  it('calls onGainPoint when the button is clicked', () => {
    const onGainPointMock = vi.fn();
    render(<PointsComponent points={0} onGainPoint={onGainPointMock} />);
    const button = screen.getByRole('button', { name: /gain points/i });
    fireEvent.click(button);
    expect(onGainPointMock).toHaveBeenCalledTimes(1);
  });
});
