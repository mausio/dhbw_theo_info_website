import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import { quickSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import QuickSortAnimation from '../../components/sorting/quick/quickSortAnimation.component.tsx';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import QuickSortPartitionTasks from '../../components/sorting/quick/quickSortPartitionTask.component.tsx';
import QuickSortEmptySpacesTask from '../../components/sorting/quick/quickSortEmptySpacesTask.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getQuickSortExplanation } from '../../static/explanations/quickSort.explanation';

const QuickSortPage = () => {
  const { t } = useTranslation();
  const explanation: React.ReactNode = getQuickSortExplanation();

  const tipps: React.ReactNode = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <h1>Quicksort</h1>
        <GenericSortGrid>
          <QuickSortAnimation />
          <CodeBlockElement height={500} code={quickSortAlgo} isFaderOn={false} />
          <TasksContainer>
            <QuickSortPartitionTasks />
            <QuickSortEmptySpacesTask />
            <AlgorithmQuizComponent translationKey="sorting.quick" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="quickSort" />
    </TippsAndExplanationWrapper>
  );
};

export default QuickSortPage;
