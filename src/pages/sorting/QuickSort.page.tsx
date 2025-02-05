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

const QuickSortPage = () => {
  const { t } = useTranslation();

  const explanation: React.ReactNode = (
    <>
      <p>
        {t('sorting.quick.description')}
      </p>
      <h5>{t('sorting.quick.process')}</h5>
      <ol>
        <li>{t('sorting.quick.steps.1')}</li>
        <li>{t('sorting.quick.steps.2')}</li>
        <li>{t('sorting.quick.steps.3')}</li>
        <li>{t('sorting.quick.steps.4')}</li>
      </ol>
      <h5>{t('sorting.quick.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.quick.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.quick.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.quick.best')}</td>
          <td>{t('sorting.quick.bestTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.quick.average')}</td>
          <td>{t('sorting.quick.averageTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.quick.worst')}</td>
          <td>{t('sorting.quick.worstTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.quick.space')}</td>
          <td>{t('sorting.quick.spaceComplexity')}</td>
        </tr>
      </table>
    </>
  );

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
