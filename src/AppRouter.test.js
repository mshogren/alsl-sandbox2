import React from 'react';
import { render } from '@testing-library/react';
import AppRouter from './AppRouter';

test.todo('renders Home link');

test('renders Products link', () => {
  const { getByText } = render(<AppRouter />);
  const linkElement = getByText(/Products/i);
  expect(linkElement).toBeInTheDocument();
});

test.todo('renders Taxes link');

test.todo('renders Home component when link is clicked');

test.todo('renders Products component when link is clicked');

test.todo('renders Taxes component when link is clicked');
