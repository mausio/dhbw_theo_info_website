import * as React from 'react';
import { Bar, BarContainer, BarNumber, ChartContainer } from '../../styles/sorting/insertionSort.style.ts';

const BarChart = ({
  bars: bars,
  selectedIndex: selectedIndex,
  comparingIndex: comparingIndex,
  pivotIndex: pivotIndex,
  height: height,
  barsHeight: barsHeight,
  doNotShowNumber: doNotShowNumber,
  fullLength: fullLength,
}) => {
  const renderBars = () => {
    return bars.map((bar, index) => {
      const isSelected = index === selectedIndex;
      const isComparing = index === comparingIndex;
      const isPivot = index === pivotIndex;

      return (
        <BarContainer
          style={{
            width: fullLength && `${70 / bars.length}%`,
            left: fullLength ? `${(index / bars.length) * 100}%` : `${index * 10}%`,
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
              height: `${bar * (barsHeight ? barsHeight : 15)}px`,
            }}
          />
          {!doNotShowNumber && (
            <BarNumber
              style={{
                fontWeight: isSelected ? 'bold' : isComparing || isPivot ? 'bold' : 'normal',
                color: isSelected ? 'white' : isComparing || isPivot ? 'white' : 'black',
              }}
            >
              {bar}
            </BarNumber>
          )}
        </BarContainer>
      );
    });
  };

  return (
    <div>
      <ChartContainer style={{ height: height ? height : 250 }}>{renderBars()}</ChartContainer>
    </div>
  );
};

export default BarChart;
