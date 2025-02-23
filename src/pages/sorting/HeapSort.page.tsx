import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { heapSortAlgo } from '../../static/algorithms/heapSort';
import * as React from 'react';
import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import HeapSortAnimation from '../../components/sorting/heapSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import { getHeapSortExplanation } from '../../static/explanations/heapSort.explanation';
import TaskBadge from '../../components/general/taskBadge.component.tsx';

const HeapSortPage = () => {
  const { t } = useTranslation();
  const totalTasks = 1;
  const explanation: React.ReactNode = getHeapSortExplanation();

  const tipps: React.ReactNode = (<></>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 20px" }}>
          <h1>Heap Sort</h1>
          <TaskBadge pageIdentifier="heap" totalTasks={totalTasks} />
        </div>
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
