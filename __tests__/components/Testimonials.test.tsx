import { render, screen, waitFor } from '@testing-library/react';
import Testimonials from '@/components/Testimonials';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Testimonials Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders "No reviews yet" when there are no reviews', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ([]),
    });

    render(<Testimonials />);
    
    await waitFor(() => {
      expect(screen.getByText(/No reviews yet. Be the first to share your experience!/i)).toBeInTheDocument();
    });
  });

  it('renders reviews correctly when data is fetched', async () => {
    const mockReviews = [
      { id: '1', name: 'Alice', text: 'Great workout!', rating: 5 },
      { id: '2', name: 'Bob', text: 'Loved the energy.', rating: 4 },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockReviews,
    });

    render(<Testimonials />);
    
    await waitFor(() => {
      expect(screen.getByText(/"Great workout!"/i)).toBeInTheDocument();
      expect(screen.getByText(/- Alice/i)).toBeInTheDocument();
      expect(screen.getByText(/"Loved the energy."/i)).toBeInTheDocument();
      expect(screen.getByText(/- Bob/i)).toBeInTheDocument();
    });
  });
});
