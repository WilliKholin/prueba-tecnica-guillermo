import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonLogout } from '../ButtonLogout';

describe('ButtonLogout', () => {
  it('renders the button with text "Logout"', () => {
    render(<ButtonLogout onLogout={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Logout');
  });

  it('calls onLogout when clicked', () => {
    const onLogoutMock = vi.fn();
    render(<ButtonLogout onLogout={onLogoutMock} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });
});
