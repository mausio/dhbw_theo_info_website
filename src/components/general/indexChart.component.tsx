import * as React from 'react';
import { BarContainer, ChartContainer } from '../../styles/sorting/insertion.style.ts';

const IndexChart = ({ initialArray, comparingIndex, selectedIndex, pivotIndex, start, end }) => {
  const renderBars = () => {
    return initialArray.map((_, index) => {
      const isSelected = index === selectedIndex;
      const isComparing = index === comparingIndex;
      const isPivot = index === pivotIndex;
      const isBetweenStartAndEnd = start == null || end == null ? false : start <= index && index <= end;
      const isStart = index === start;
      const isEnd = index === end;

      return (
        <BarContainer
          style={{
            left: `${index * 10}%`,
            color: isSelected ? 'lightslategray' : isComparing ? 'lightsteelblue' : isPivot ? 'palevioletred' : 'gray',
            background: isBetweenStartAndEnd ? 'lightgray' : 'transparent',
            padding: '6px 1.55% 5px 1.55%',
            borderRadius: 0,
            borderTopLeftRadius: isStart ? 5 : 0,
            borderBottomLeftRadius: isStart ? 5 : 0,
            borderTopRightRadius: isEnd ? 5 : 0,
            borderBottomRightRadius: isEnd ? 5 : 0,
          }}
          key={index}
        >
          {index + 1}
        </BarContainer>
      );
    });
  };

  return <ChartContainer style={{ height: '25px' }}>{renderBars()}</ChartContainer>;
};

export default IndexChart;
