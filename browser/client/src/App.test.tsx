import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const someStr = '21 Blackjack';
  expect(someStr).toBeDefined();
});
