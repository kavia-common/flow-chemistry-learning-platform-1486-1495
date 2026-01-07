import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard shell title', () => {
  render(<App />);
  expect(screen.getByText(/Flow Chemistry Dashboard/i)).toBeInTheDocument();
});
