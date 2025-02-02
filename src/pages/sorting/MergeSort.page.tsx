import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { mergeSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import * as React from 'react';
import MergeSortTaskComponent from '../../components/sorting/merge/mergeSortTask.component.tsx';
import MergeSortAnimation from '../../components/sorting/merge/mergeSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';

const MergeSortPage = () => {
  const { t } = useTranslation();

  const explanation: React.ReactNode = (
    <>
      <p>
        {t('sorting.merge.description')}
      </p>
      <h5>{t('sorting.merge.process')}</h5>
      <ol>
        <li>{t('sorting.merge.steps.1')}</li>
        <li>{t('sorting.merge.steps.2')}</li>
        <li>{t('sorting.merge.steps.3')}</li>
        <li>{t('sorting.merge.steps.4')}</li>
      </ol>
      <h5>{t('sorting.merge.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.merge.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.merge.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.merge.best')}</td>
          <td>{t('sorting.merge.bestTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.merge.average')}</td>
          <td>{t('sorting.merge.averageTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.merge.worst')}</td>
          <td>{t('sorting.merge.worstTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.merge.space')}</td>
          <td>{t('sorting.merge.spaceComplexity')}</td>
        </tr>
      </table>
    </>
  );

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
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
    </TippsAndExplanationWrapper>
  );
};

export default MergeSortPage;
