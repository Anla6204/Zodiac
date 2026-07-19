import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import BirthForm from './BirthForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../i18n'; // import i18n setup

const queryClient = new QueryClient();

const renderWithClient = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

test('renders form fields and submit button', () => {
  renderWithClient(<BirthForm />);
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Get Natal Chart/i })).toBeInTheDocument();
});

test('shows validation error when submitting empty form', async () => {
  renderWithClient(<BirthForm />);
  const submitButton = screen.getByRole('button', { name: /Get Natal Chart/i });
  
  fireEvent.click(submitButton);
  
  const errorMessages = await screen.findAllByText(/This field is required/i);
  expect(errorMessages.length).toBeGreaterThan(0);
});
