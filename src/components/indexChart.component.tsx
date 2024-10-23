import * as React from 'react';
import { BarContainer, ChartContainer } from '../styles/insertion.style.ts';

const IndexChart = ({ initialArray, positions, selectedIndex }) => {
  const renderBars = () => {
    console.log(initialArray);

    return initialArray.map((_, index) => {
      const isSelected = index === selectedIndex;

      return (
        <BarContainer
          style={{
            left: `${positions[index] * 51}px`,
            color: isSelected ? 'red' : 'gray',
          }}
          key={index}
        >
          {index + 1}
        </BarContainer>
      );
    });
  };

  return (
    <div>
      <ChartContainer style={{ height: '25px' }}>{renderBars()}</ChartContainer>
    </div>
  );
};

export default IndexChart;
