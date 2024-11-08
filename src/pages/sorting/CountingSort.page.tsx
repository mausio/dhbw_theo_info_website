import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import CountingSortAnimation from '../../components/sorting/counting/countingSortAnimation.component.tsx';
import { countingSortAlgo } from '../../algorithms/sorting.algorithms.ts';
import CountingSortDeterminationTask from '../../components/sorting/counting/countingSortDeterminationTask.component.tsx';

const CountingSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Counting Sort</h1>

      <GenericSortGrid>
        <CountingSortAnimation />
        <CodeBlockElement height={650} code={countingSortAlgo} isFaderOn={false} />
        <TasksContainer>
          <CountingSortDeterminationTask />
        </TasksContainer>
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default CountingSortPage;
