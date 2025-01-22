import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import InsertionSortAnimationComponent from '../../components/sorting/insertion/insertionSortAnimation.component.tsx';
import InsertionSortIterationTaskComponent from '../../components/sorting/insertion/insertionSortIterationTask.component.tsx';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { insertionSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';

const InsertionSortPage = () => {
  const { t } = useTranslation();

  const explanation: React.ReactNode = (
    <>
      <p>
        {t('sorting.insertion.description')}
      </p>
      <h5>{t('sorting.insertion.process')}</h5>
      <ol>
        <li>{t('sorting.insertion.steps.1')}</li>
        <li>{t('sorting.insertion.steps.2')}</li>
        <li>{t('sorting.insertion.steps.3')}</li>
        <li>{t('sorting.insertion.steps.4')}</li>
        <li>{t('sorting.insertion.steps.5')}</li>
      </ol>
      <h5>{t('sorting.insertion.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.insertion.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.insertion.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.best')}</td>
          <td>O(n)</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.average')}</td>
          <td>O(n²)</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.worst')}</td>
          <td>O(n²)</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.space')}</td>
          <td>O(1)</td>
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
        <h1>Insertion Sort</h1>
        <GenericSortGrid>
          <InsertionSortAnimationComponent />
          <CodeBlockElement code={insertionSortAlgo} isFaderOn={false} height="400px" />
          <TasksContainer>
            <InsertionSortIterationTaskComponent />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
    </TippsAndExplanationWrapper>
  );
};

export default InsertionSortPage;
