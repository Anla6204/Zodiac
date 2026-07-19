import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ChartDisplay from './ChartDisplay';
import '../../i18n';

test('renders chart display with success message', () => {
  render(<ChartDisplay encryptedData="fake-encrypted-data" />);
  expect(screen.getByText(/Natal Chart Generated Successfully/i)).toBeInTheDocument();
});
