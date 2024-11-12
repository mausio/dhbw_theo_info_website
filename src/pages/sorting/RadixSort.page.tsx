import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { radixSortAlgo } from '../../algorithms/sorting.algorithms.ts';
import * as React from 'react';
import RadixSortAnimation from '../../components/sorting/radix/radixSortAnimation.component.tsx';
import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';

const RadixSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Radix Sort</h1>
      <GenericSortGrid>
        <RadixSortAnimation />
        <CodeBlockElement height={600} code={radixSortAlgo} isFaderOn={false} />
        <TasksContainer>{}</TasksContainer>
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default RadixSortPage;
