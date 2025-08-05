import { render, screen } from '@testing-library/react';
import { RankingItem } from '../RankingItem';

describe('RankingItem', () => {
  const user = { name: 'Alice', maxPoints: 150 };
  const index = 0;

  it('renders the correct ranking and user info', () => {
    render(<RankingItem user={user} index={index} />);

    expect(screen.getByText(`#${index + 1} - ${user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${user.maxPoints} pts`)).toBeInTheDocument();
  });
});