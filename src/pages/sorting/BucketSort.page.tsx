import { GenericMainContainer, GenericSortGrid, TasksContainer } from '../../styles/general/generic.style.ts';
import CodeBlockElement from '../../components/general/codeBlock.component.tsx';
import * as React from 'react';
import { bucketSortAlgo } from '../../static/algorithms/sorting.algorithms.ts';
import BucketSortAnimation from '../../components/sorting/bucket/bucketSortAnimation.component.tsx';
import TippsAndExplanationWrapper from '../../components/general/tippsAndExplanation.component.tsx';
import { useTranslation } from 'react-i18next';
import CommentSection from '../../components/general/commentSection.component.tsx';
import AlgorithmQuizComponent from '../../components/general/algorithmQuiz.component.tsx';

const BucketSortPage = () => {
  const { t } = useTranslation();

  const explanation: React.ReactNode = (
    <>
      <p>
        {t('sorting.bucket.description')}
      </p>
      <h5>{t('sorting.bucket.process')}</h5>
      <ol>
        <li>{t('sorting.bucket.steps.1')}</li>
        <li>{t('sorting.bucket.steps.2')}</li>
        <li>{t('sorting.bucket.steps.3')}</li>
        <li>{t('sorting.bucket.steps.4')}</li>
      </ol>
      <h5>{t('sorting.bucket.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.bucket.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.bucket.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.bucket.best')}</td>
          <td>{t('sorting.bucket.bestTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.bucket.average')}</td>
          <td>{t('sorting.bucket.averageTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.bucket.worst')}</td>
          <td>{t('sorting.bucket.worstTime')}</td>
        </tr>
        <tr>
          <td>{t('sorting.bucket.space')}</td>
          <td>{t('sorting.bucket.spaceComplexity')}</td>
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
        <h1>Bucket Sort</h1>
        <GenericSortGrid>
          <BucketSortAnimation />
          <CodeBlockElement height={550} code={bucketSortAlgo} isFaderOn={false} />
          <TasksContainer>
            <AlgorithmQuizComponent translationKey="sorting.bucket" />
          </TasksContainer>
        </GenericSortGrid>
      </GenericMainContainer>
      <CommentSection algorithmId="bucketSort" />
    </TippsAndExplanationWrapper>
  );
};

export default BucketSortPage;
