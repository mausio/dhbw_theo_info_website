import * as React from 'react';
import { BarContainer, ChartContainer } from '../../styles/sorting/insertionSort.style.ts';

const IndexChart = ({
  initialArray,
  comparingIndex,
  selectedIndex,
  pivotIndex,
  start,
  end,
  fullLength: fullLength,
}) => {
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
            width: fullLength && `${70 / initialArray.length}%`,
            left: fullLength ? `${(index / initialArray.length) * 100}%` : `${index * 10}%`,
            color: isSelected ? 'lightslategray' : isComparing ? 'lightsteelblue' : isPivot ? 'indianred' : 'gray',
            background: isBetweenStartAndEnd ? 'lightgray' : 'transparent',
            borderRadius: 0,
            borderTopLeftRadius: isStart ? 6 : 0,
            borderBottomLeftRadius: isStart ? 6 : 0,
            borderTopRightRadius: isEnd ? 6 : 0,
            borderBottomRightRadius: isEnd ? 6 : 0,
            fontWeight: isPivot || isSelected || isComparing ? 'bolder' : 'normal',
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
