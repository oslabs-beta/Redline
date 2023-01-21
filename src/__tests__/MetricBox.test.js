import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import MetricBox from '../components/MetricBox';
import { Units } from '../../types/types';

describe('Unit testing Metric Box', () => {
  const boxData = 100;
  const name = 'Test Metric';
  const metric = 'used_memory';
  beforeEach(() => {
    render(<MetricBox boxData={boxData} name={name} metric={metric} />);
  });

  test('Test Metric shows up in the document', () => {
    const text = screen.getByText(`${name}`);
    expect(text).toBeInTheDocument();
  });

  test('Data and units show up in the document', () => {
    const value = screen.getByText(`${boxData} ${Units[metric]}`);
    expect(value).toBeInTheDocument();
  });
});
