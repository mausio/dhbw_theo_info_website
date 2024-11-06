import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import InsertionSortAnimationComponent from '../../components/sorting/insertion/insertionSortAnimation.component.tsx';
import InsertionSortIterationTaskComponent from '../../components/sorting/insertion/insertionSortIterationTask.component.tsx';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { insertionSortAlgo } from '../../algorithms/sorting.algorithms.ts';

const InsertionSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Insertion Sort</h1>

      <GenericSortGrid>
        <InsertionSortAnimationComponent />
        <CodeBlockElement code={insertionSortAlgo} isFaderOn={false} />
        <TasksContainer>
          <InsertionSortIterationTaskComponent />
        </TasksContainer>
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default InsertionSortPage;
