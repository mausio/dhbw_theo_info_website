import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { radixSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import * as React from 'react';
import RadixSortAnimation from '../../components/sorting/radix/radixSortAnimation.component.tsx';
import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import RadixSortNumberTask from '../../components/sorting/radix/radixSortNumberTask.component.tsx';
import RadixSortWordsTask from '../../components/sorting/radix/radixSortWordsTask.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';

const RadixSortPage = () => {
  const { t } = useTranslation();

  const explanation: React.ReactNode = (
    <>
      <p>
        {t('sorting.radix.description')}
      </p>
      <h5>{t('sorting.radix.process')}</h5>
      <ol>
        <li>{t('sorting.radix.steps.1')}</li>
        <li>{t('sorting.radix.steps.2')}</li>
        <li>{t('sorting.radix.steps.3')}</li>
        <li>{t('sorting.radix.steps.4')}</li>
      </ol>
      <h5>{t('sorting.radix.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.radix.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.radix.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.radix.best')}</td>
          <td>{t('sorting.radix.bestTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.radix.average')}</td>
          <td>{t('sorting.radix.averageTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.radix.worst')}</td>
          <td>{t('sorting.radix.worstTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.radix.space')}</td>
          <td>{t('sorting.radix.spaceComplexity')}</td>
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
        <h1>Radix Sort</h1>
        <GenericSortGrid>
          <RadixSortAnimation />
          <CodeBlockElement height={600} code={radixSortAlgo} isFaderOn={false} />
          <TasksContainer>
            <RadixSortNumberTask />
            <RadixSortWordsTask />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
    </TippsAndExplanationWrapper>
  );
};

export default RadixSortPage;
