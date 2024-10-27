import { GenericMainContainer, GenericSortGrid } from '../styles/generic.style.ts';
import * as React from 'react';
import InsertionSortAnimationComponent from '../components/sorting/insertionSortAnimation.component.tsx';
import InsertionTaskComponent from '../components/sorting/insertionTask.component.tsx';
import CodeBlockElement from '../components/general/codeBlock.component.tsx';

const codeString = `
// input array A index starts at 1
function InsertionSort(A) {
    for (let p = 2; p <= A.length; p++) {
      let key = A[p];
      let i = p - 1;
      while (i > 0 && A[i] > key) {
        A[i + 1] = A[i];
        i--;
      }
      A[i + 1] = key;
    }
}
`;

const InsertionPage = () => {
  return (
    <GenericMainContainer>
      <h1>Insertion Sort</h1>
      <GenericSortGrid>
        <InsertionSortAnimationComponent />
        <CodeBlockElement code={codeString} />
        <InsertionTaskComponent />
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default InsertionPage;
