import { render, screen } from '@testing-library/react';
import { LoggedName } from '../LoggedName';

describe('LoggedName', () => {
  it('renders the welcome message with the given name', () => {
    const testName = 'Frieren';
    render(<LoggedName name={testName} />);
    
    expect(screen.getByText(`Welcome, ${testName}!`)).toBeInTheDocument();
  });
});
