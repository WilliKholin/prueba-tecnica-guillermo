import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonJoin } from '../ButtonJoin';

describe('ButtonJoin', () => {
  it('renders the button with text "Join"', () => {
    render(<ButtonJoin onJoin={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Join');
  });

  it('calls onJoin when clicked', () => {
    const onJoinMock = vi.fn();
    render(<ButtonJoin onJoin={onJoinMock} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onJoinMock).toHaveBeenCalledTimes(1);
  });
});
