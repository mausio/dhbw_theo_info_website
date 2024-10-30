import { GenericMainContainer, GenericSortGrid } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import { quickSort } from '../../algorithms/sorting.algorithms.ts';
import QuickSortAnimation from '../../components/sorting/quick/quickSortAnimation.component.tsx';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import QuickSortTaskOne from '../../components/sorting/quick/quickSortTask.component.tsx';

const InsertionSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Quicksort</h1>
      <GenericSortGrid>
        <QuickSortAnimation />
        <CodeBlockElement code={quickSort} isFaderOn={false} />
        <QuickSortTaskOne />
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default InsertionSortPage;
