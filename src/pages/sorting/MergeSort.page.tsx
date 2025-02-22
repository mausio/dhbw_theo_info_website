import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { mergeSortAlgo } from '../../static/algorithms/mergeSort';
import * as React from 'react';
import MergeSortAnimation from '../../components/sorting/merge/mergeSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getMergeSortExplanation } from '../../static/explanations/mergeSort.explanation';
import TaskBadge from '../../components/general/taskBadge.component.tsx';

const MergeSortPage = () => {
  const { t } = useTranslation();
  const totalTasks = 1;
  const explanation: React.ReactNode = getMergeSortExplanation();

  const tipps: React.ReactNode | null = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 20px" }}>
          <h1>Mergesort</h1>
          <TaskBadge pageIdentifier="merge" totalTasks={totalTasks} />
        </div>
        <GenericSortGrid>
          <MergeSortAnimation />
          <CodeBlockElement height={625} code={mergeSortAlgo} isFaderOn={true} />
          <TasksContainer>
            <AlgorithmQuizComponent translationKey="sorting.merge" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="mergeSort" />
    </TippsAndExplanationWrapper>
  );
};

export default MergeSortPage;
