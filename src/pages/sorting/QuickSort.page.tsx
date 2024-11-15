import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import { quickSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import QuickSortAnimation from '../../components/sorting/quick/quickSortAnimation.component.tsx';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import QuickSortPartitionTasks from '../../components/sorting/quick/quickSortPartitionTask.component.tsx';
import QuickSortEmptySpacesTask from '../../components/sorting/quick/quickSortEmptySpacesTask.component.tsx';

const InsertionSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Quicksort</h1>
      <GenericSortGrid>
        <QuickSortAnimation />
        <CodeBlockElement code={quickSortAlgo} isFaderOn={false} />
        <TasksContainer>
          <QuickSortPartitionTasks />
          <QuickSortEmptySpacesTask />
        </TasksContainer>
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default InsertionSortPage;
