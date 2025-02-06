import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import CountingSortAnimation from '../../components/sorting/counting/countingSortAnimation.component.tsx';
import { countingSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import CountingSortDeterminationTask from '../../components/sorting/counting/countingSortDeterminationTask.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getCountingSortExplanation } from '../../static/explanations/countingSort.explanation';

const CountingSortPage = () => {
  const { t } = useTranslation();
  const explanation: React.ReactNode = getCountingSortExplanation();

  const tipps: React.ReactNode = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <h1>Counting Sort</h1>
        <GenericSortGrid>
          <CountingSortAnimation />
          <CodeBlockElement height={650} code={countingSortAlgo} isFaderOn={false} />
          <TasksContainer>
            <CountingSortDeterminationTask />
            <AlgorithmQuizComponent translationKey="sorting.counting" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="countingSort" />
    </TippsAndExplanationWrapper>
  );
};

export default CountingSortPage;
