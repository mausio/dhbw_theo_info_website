import { GenericMainContainer } from '../../styles/generic.style.ts';
import * as React from 'react';
import InsertionSortAnimationComponent from '../../components/insertionSortAnimation.component.tsx';
import { InsertionGrid } from '../../styles/insertion.style.ts';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
}`;

const InsertionPage = () => {
  return (
    <GenericMainContainer>
      <h1>Insertion Sort</h1>
      <InsertionGrid>
        <InsertionSortAnimationComponent />
        <SyntaxHighlighter language="javascript" style={dracula}>
          {codeString}
        </SyntaxHighlighter>
      </InsertionGrid>
    </GenericMainContainer>
  );
};

export default InsertionPage;
