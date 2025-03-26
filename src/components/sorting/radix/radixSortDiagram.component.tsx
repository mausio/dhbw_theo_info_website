import { FractionElement, Row, SingleDiagram } from '../../../styles/sorting/radixSort.style.ts';
import * as React from 'react';

const RadixSortDiagram = ({
  radixData: radixData,
  isShuffling: isShuffling,
  isColorFaderOn: isColorFaderOn,
  selectedColumn: selectedColumn,
  selectedRow: selectedRow,
}) => {
  const buildElements = (originalValue, concatArray) => {
    const maxValue = Math.max(...radixData);

    return concatArray.map((element, index) => (
      <FractionElement
        key={`element-${originalValue}-${index}`}
        style={{
          borderLeft: 0 < index && index < 4 && '1.5px dotted black',
          backgroundColor:
            selectedColumn == index
              ? 'rgba(255, 171, 41, 0.8)'
              : isShuffling
                ? `rgba(68, 97, 131,${(originalValue + 1000) / (maxValue + 4000)})`
                : 'white',
          transition: isColorFaderOn && 'background-color 0.5s ease-in',
        }}
      >
        {element}
      </FractionElement>
    ));
  };

  const buildRows = () => {
    return radixData.map((splitter, rowIndex) => {
      if (typeof splitter != 'number' || typeof splitter == 'undefined') {
        return <Row key={`empty-row-${rowIndex}`} style={{}} />;
      }

      const stringNumberArray = splitter.toString().split('');
      const cleanedNumberArray = stringNumberArray.slice(-4);
      const filledArray = Array(4 - cleanedNumberArray.length).fill('0');
      const concatArray = filledArray.concat(cleanedNumberArray);

      return (
        <Row
          key={`row-${splitter}-${rowIndex}`}
          style={{
            boxShadow: selectedRow == rowIndex && 'black 0 0 0 3px',
          }}
        >
          {buildElements(splitter, concatArray)}
        </Row>
      );
    });
  };

  return <SingleDiagram style={{ position: 'relative' }}>{buildRows()}</SingleDiagram>;
};

export default RadixSortDiagram;
