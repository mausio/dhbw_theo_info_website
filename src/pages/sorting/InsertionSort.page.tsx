import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import InsertionSortAnimationComponent from '../../components/sorting/insertion/insertionSortAnimation.component.tsx';
import InsertionSortIterationTaskComponent from '../../components/sorting/insertion/insertionSortIterationTask.component.tsx';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { insertionSortAlgo } from '../../static/algorithms/insertionSort.ts';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';
import CommentSection from '../../components/general/commentSection.component.tsx';
import TaskBadge from '../../components/general/taskBadge.component.tsx';
import { useUser } from '../../context/user.context';
import { getInsertionSortExplanation } from '../../static/explanations/insertionSort.explanation';

const InsertionSortPage = () => {
  const { t } = useTranslation();
  const totalTasks = 2;
  const explanation: React.ReactNode = getInsertionSortExplanation();

  const tipps: React.ReactNode = (
    <>
    </>
  );

  return (
    <TippsAndExplanationWrapper tipps={tipps} explanation={explanation}>
      <GenericMainContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "20px 20px" }}>
          <h1>Insertion Sort</h1>
          <TaskBadge pageIdentifier="insertion" totalTasks={totalTasks} />
        </div>
        <GenericSortGrid>
          <InsertionSortAnimationComponent />
          <CodeBlockElement code={insertionSortAlgo} isFaderOn={false} height={500} />
          <TasksContainer>
            <InsertionSortIterationTaskComponent />
            <AlgorithmQuizComponent translationKey="sorting.insertion" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>

      <CommentSection algorithmId="insertionSort" />
    </TippsAndExplanationWrapper>
  );
};

export default InsertionSortPage;
