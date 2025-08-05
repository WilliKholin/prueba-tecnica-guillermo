import { render, screen } from '@testing-library/react';
import { RankingComponent } from '../RankingComponent';

const mockRanking = [
  { name: 'Frieren', maxPointsObtained: 150 },
  { name: 'Aika', maxPointsObtained: 120 },
];

describe('RankingComponent', () => {
  it('renders the heading', () => {
    render(<RankingComponent ranking={mockRanking} />);
    expect(screen.getByRole('heading', { name: /ranking - max points obtained/i })).toBeInTheDocument();
  });

  it('renders the correct number of RankingItem components', () => {
    render(<RankingComponent ranking={mockRanking} />);
    expect(screen.getByText('#1 - Frieren')).toBeInTheDocument();
    expect(screen.getByText('#2 - Aika')).toBeInTheDocument();
  });
});
