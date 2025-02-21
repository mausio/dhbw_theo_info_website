import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { mergeSortAlgo } from '../../static/algorithms/mergeSort';
import * as React from 'react';
import MergeSortTaskComponent from '../../components/sorting/merge/mergeSortTask.component.tsx';
import MergeSortAnimation from '../../components/sorting/merge/mergeSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getMergeSortExplanation } from '../../static/explanations/mergeSort.explanation';

const MergeSortPage = () => {
  const { t } = useTranslation();
  const explanation: React.ReactNode = getMergeSortExplanation();

  const tipps: React.ReactNode | null = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <h1>Mergesort</h1>
        <GenericSortGrid>
          <MergeSortAnimation />
          <CodeBlockElement height={625} code={mergeSortAlgo} isFaderOn={true} />
          <TasksContainer>
            {/* <MergeSortTaskComponent /> */}
            <AlgorithmQuizComponent translationKey="sorting.merge" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="mergeSort" />
    </TippsAndExplanationWrapper>
  );
};

export default MergeSortPage;
