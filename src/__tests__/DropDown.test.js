import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import DropDown from '../components/DropDown';

test('renders dropdown menu', () => {
  const axis = 'y axis';
  render(
    <DropDown
      setStateFn={() => {
        1 + 1;
      }}
      axis={axis}
      axisState={undefined}
    />
  );

  const elem = screen.getByText(`Select ${axis}`);
  expect(elem).toBeDefined();
  expect(elem).toBeInTheDocument();
});
