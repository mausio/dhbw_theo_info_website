import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import * as React from 'react';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import CountingSortAnimation from '../../components/sorting/counting/countingSortAnimation.component.tsx';
import { countingSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import CountingSortDeterminationTask from '../../components/sorting/counting/countingSortDeterminationTask.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';

const CountingSortPage = () => {
  const { t } = useTranslation();

  const explanation: React.ReactNode = (
    <>
      <p>
        {t('sorting.counting.description')}
      </p>
      <h5>{t('sorting.counting.process')}</h5>
      <ol>
        <li>{t('sorting.counting.steps.1')}</li>
        <li>{t('sorting.counting.steps.2')}</li>
        <li>{t('sorting.counting.steps.3')}</li>
        <li>{t('sorting.counting.steps.4')}</li>
        <li>{t('sorting.counting.steps.5')}</li>
      </ol>
      <h5>{t('sorting.counting.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.counting.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.counting.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.counting.best')}</td>
          <td>{t('sorting.counting.bestTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.counting.average')}</td>
          <td>{t('sorting.counting.averageTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.counting.worst')}</td>
          <td>{t('sorting.counting.worstTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.counting.space')}</td>
          <td>{t('sorting.counting.spaceComplexity')}</td>
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
        <h1>Counting Sort</h1>
        <GenericSortGrid>
          <CountingSortAnimation />
          <CodeBlockElement height={650} code={countingSortAlgo} isFaderOn={false} />
          <TasksContainer>
            <CountingSortDeterminationTask />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
    </TippsAndExplanationWrapper>
  );
};

export default CountingSortPage;
