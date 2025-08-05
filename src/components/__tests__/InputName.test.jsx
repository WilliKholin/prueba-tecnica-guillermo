import { render, screen, fireEvent } from '@testing-library/react';
import { InputName } from '../InputName';
import { vi } from 'vitest';

describe('InputName', () => {
  it('renders with the correct initial value', () => {
    render(<InputName name="Frieren" setName={() => {}} />);
    expect(screen.getByPlaceholderText('Your name...').value).toBe('Frieren');
  });

  it('calls setName on input change', () => {
    const setNameMock = vi.fn();
    render(<InputName name="" setName={setNameMock} />);
    const input = screen.getByPlaceholderText('Your name...');
    
    fireEvent.change(input, { target: { value: 'AikaFuwa' } });
    expect(setNameMock).toHaveBeenCalledWith('AikaFuwa');
  });
});
