import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import { heapSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import * as React from 'react';
import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import HeapSortAnimation from '../../components/sorting/heapSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';

const HeapSortPage = () => {
  const { t } = useTranslation();

  const explanation: React.ReactNode = (
    <>
      <p>
        {t('sorting.heap.description')}
      </p>
      <h5>{t('sorting.heap.process')}</h5>
      <ol>
        <li>{t('sorting.heap.steps.1')}</li>
        <li>{t('sorting.heap.steps.2')}</li>
        <li>{t('sorting.heap.steps.3')}</li>
        <li>{t('sorting.heap.steps.4')}</li>
        <li>{t('sorting.heap.steps.5')}</li>
      </ol>
      <h5>{t('sorting.heap.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.heap.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.heap.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.heap.best')}</td>
          <td>{t('sorting.heap.bestTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.heap.average')}</td>
          <td>{t('sorting.heap.averageTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.heap.worst')}</td>
          <td>{t('sorting.heap.worstTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.heap.space')}</td>
          <td>{t('sorting.heap.spaceComplexity')}</td>
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
        <h1>Heap Sort</h1>
        <GenericSortGrid>
          <HeapSortAnimation />
          <CodeBlockElement height={600} code={heapSortAlgo} isFaderOn={true} />
          <TasksContainer>
            {/*<RadixSortNumberTask />*/}
            {/*<RadixSortWordsTask />*/}
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
    </TippsAndExplanationWrapper>
  );
};

export default HeapSortPage;
