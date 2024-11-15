import { GenericMainContainer, GenericSortGrid } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import * as React from 'react';
import { bucketSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import BucketSortAnimation from '../../components/sorting/bucket/bucketSortAnimation.component.tsx';

const BucketSortPage = () => {
  return (
    <GenericMainContainer>
      <h1>Bucket Sort</h1>
      <GenericSortGrid>
        <BucketSortAnimation />
        <CodeBlockElement height={550} code={bucketSortAlgo} isFaderOn={false} />
      </GenericSortGrid>
    </GenericMainContainer>
  );
};

export default BucketSortPage;
