import { render, screen } from '@testing-library/react';
import { GeneralError } from '../GeneralError';

describe('GeneralError', () => {
  it('renders the error message', () => {
    const errorMessage = 'This is an error message';
    render(<GeneralError error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
