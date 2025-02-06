import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import * as React from 'react';
import { bucketSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import BucketSortAnimation from '../../components/sorting/bucket/bucketSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getBucketSortExplanation } from '../../static/explanations/bucketSort.explanation';

const BucketSortPage = () => {
  const { t } = useTranslation();
  const explanation: React.ReactNode = getBucketSortExplanation();

  const tipps: React.ReactNode = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <h1>Bucket Sort</h1>
        <GenericSortGrid>
          <BucketSortAnimation />
          <CodeBlockElement height={550} code={bucketSortAlgo} isFaderOn={false} />
          <TasksContainer>
            <AlgorithmQuizComponent translationKey="sorting.bucket" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="bucketSort" />
    </TippsAndExplanationWrapper>
  );
};

export default BucketSortPage;
