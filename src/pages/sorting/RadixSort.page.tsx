import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { mergeSortAlgo } from '../../algorithms/sorting.algorithms.ts';
import * as React from 'react';

const RadixSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Radix Sort</h1>
      <GenericSortGrid>
        <RadixSortAnimation />
        <CodeBlockElement code={mergeSortAlgo} isFaderOn={true} />
        <TasksContainer>{/*<MergeSortTaskOne />*/}</TasksContainer>
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default RadixSortPage;
