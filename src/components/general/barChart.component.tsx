import * as React from 'react';
import { Bar, BarContainer, BarNumber, ChartContainer } from '../../styles/sorting/insertionSort.style.ts';

const BarChart = ({ bars, selectedIndex, comparingIndex, pivotIndex }) => {
  const renderBars = () => {
    return bars.map((bar, index) => {
      const isSelected = index === selectedIndex;
      const isComparing = index === comparingIndex;
      const isPivot = index === pivotIndex;

      return (
        <BarContainer
          style={{
            left: `${index * 10}%`,
            backgroundColor: isSelected
              ? 'lightslategray'
              : isComparing
                ? 'lightsteelblue'
                : isPivot
                  ? 'palevioletred'
                  : 'transparent',
          }}
          key={index}
        >
          <Bar
            style={{
              height: `${bar * 20}px`,
            }}
          />
          <BarNumber
            style={{
              fontWeight: isSelected ? 'bold' : isComparing || isPivot ? 'bold' : 'normal',
              color: isSelected ? 'white' : isComparing || isPivot ? 'white' : 'black',
            }}
          >
            {bar}
          </BarNumber>
        </BarContainer>
      );
    });
  };

  return (
    <div>
      <ChartContainer>{renderBars()}</ChartContainer>
    </div>
  );
};

export default BarChart;
