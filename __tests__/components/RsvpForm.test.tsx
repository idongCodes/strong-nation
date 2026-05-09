import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RsvpForm from '@/components/RsvpForm';

// Mock the global fetch function
global.fetch = jest.fn();

describe('RsvpForm Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the form correctly', () => {
    render(<RsvpForm />);
    expect(screen.getByLabelText(/First Name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join Us/i })).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<RsvpForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name \*/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name \*/i), { target: { value: 'Doe' } });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Join Us/i }));

    // Wait for the UI to update to the success state
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/RSVP Confirmed!/i);
    });

    // Check that fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/rsvp', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }));
  });

  it('handles submission errors gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<RsvpForm />);
    
    fireEvent.change(screen.getByLabelText(/First Name \*/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name \*/i), { target: { value: 'Smith' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Join Us/i }));

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/Error - Try Again/i);
    });
  });
});
