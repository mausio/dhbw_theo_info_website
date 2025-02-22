import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import * as React from 'react';
import { bucketSortAlgo } from '../../static/algorithms/bucketSort';
import BucketSortAnimation from '../../components/sorting/bucket/bucketSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getBucketSortExplanation } from '../../static/explanations/bucketSort.explanation';
import TaskBadge from '../../components/general/taskBadge.component.tsx';

const BucketSortPage = () => {
  const { t } = useTranslation();
  const totalTasks = 1;
  const explanation: React.ReactNode = getBucketSortExplanation();

  const tipps: React.ReactNode = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 20px" }}>
          <h1>Bucket Sort</h1>
          <TaskBadge pageIdentifier="bucket" totalTasks={totalTasks} />
        </div>
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
