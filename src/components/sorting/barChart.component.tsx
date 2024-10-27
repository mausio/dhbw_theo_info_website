import * as React from 'react';
import { Bar, BarContainer, BarNumber, ChartContainer } from '../../styles/insertion.style.ts';

const BarChart = ({ bars, selectedIndex, comparingIndex }) => {
  const renderBars = () => {
    return bars.map((bar, index) => {
      const isSelected = index === selectedIndex;
      const isComparing = index === comparingIndex;

      return (
        <BarContainer
          style={{
            left: `${index * 10}%`,
            backgroundColor: isSelected ? 'lightslategray' : isComparing ? 'lightsteelblue' : 'transparent',
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
              fontWeight: isSelected ? 'bold' : isComparing ? 'bold' : 'normal',
              color: isSelected ? 'white' : isComparing ? 'white' : 'black',
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
