import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { heapSortAlgo } from '../../algorithms/sorting.algorithms.ts';
import * as React from 'react';
import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import HeapSortAnimation from '../../components/sorting/heapSortAnimation.component.tsx';

const HeapSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Heap Sort</h1>
      <GenericSortGrid>
        <HeapSortAnimation />
        <CodeBlockElement height={600} code={heapSortAlgo} isFaderOn={true} />
        <TasksContainer>
          {/*<RadixSortNumberTask />*/}
          {/*<RadixSortWordsTask />*/}
        </TasksContainer>
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default HeapSortPage;
