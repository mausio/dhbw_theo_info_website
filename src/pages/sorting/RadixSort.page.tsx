import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { radixSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import * as React from 'react';
import RadixSortAnimation from '../../components/sorting/radix/radixSortAnimation.component.tsx';
import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import RadixSortNumberTask from '../../components/sorting/radix/radixSortNumberTask.component.tsx';
import RadixSortWordsTask from '../../components/sorting/radix/radixSortWordsTask.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getRadixSortExplanation } from '../../static/explanations/radixSort.explanation';

const RadixSortPage = () => {
  const { t } = useTranslation();
  const explanation: React.ReactNode = getRadixSortExplanation();

  const tipps: React.ReactNode = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <h1>Radix Sort</h1>
        <GenericSortGrid>
          <RadixSortAnimation />
          <CodeBlockElement height={600} code={radixSortAlgo} isFaderOn={false} />
          <TasksContainer>
            <RadixSortNumberTask />
            <RadixSortWordsTask />
            <AlgorithmQuizComponent translationKey="sorting.radix" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="radixSort" />
    </TippsAndExplanationWrapper>
  );
};

export default RadixSortPage;
