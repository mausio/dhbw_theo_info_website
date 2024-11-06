import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { mergeSortAlgo } from '../../algorithms/sorting.algorithms.ts';
import * as React from 'react';
import MergeSortTaskOne from '../../components/sorting/merge/mergeSortTask.component.tsx';
import MergeSortAnimation from '../../components/sorting/merge/mergeSortAnimation.component.tsx';

const MergeSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Mergesort</h1>
      <GenericSortGrid>
        <MergeSortAnimation />
        <CodeBlockElement code={mergeSortAlgo} isFaderOn={true} />
        <TasksContainer>
          <MergeSortTaskOne />
        </TasksContainer>
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default MergeSortPage;
