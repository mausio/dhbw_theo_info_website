import { GenericMainContainer } from '../../styles/generic.style.ts';
import * as React from 'react';
import InsertionSortAnimationComponent from '../../components/insertionSortAnimation.component.tsx';

const InsertionPage = () => {
  return (
    <GenericMainContainer>
      <h1>Insertion Sort</h1>
      <br />
      <br />
      <InsertionSortAnimationComponent />
      <br />
      <br />
    </GenericMainContainer>
  );
};

export default InsertionPage;
