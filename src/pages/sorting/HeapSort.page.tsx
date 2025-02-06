import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { heapSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import * as React from 'react';
import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import HeapSortAnimation from '../../components/sorting/heapSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getHeapSortExplanation } from '../../static/explanations/heapSort.explanation';

const HeapSortPage = () => {
  const { t } = useTranslation();
  const explanation: React.ReactNode = getHeapSortExplanation();

  const tipps: React.ReactNode = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <h1>Heap Sort</h1>
        <GenericSortGrid>
          <HeapSortAnimation />
          <CodeBlockElement height={600} code={heapSortAlgo} isFaderOn={true} />
          <TasksContainer>
            <AlgorithmQuizComponent translationKey="sorting.heap" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="heapSort" />
    </TippsAndExplanationWrapper>
  );
};

export default HeapSortPage;
