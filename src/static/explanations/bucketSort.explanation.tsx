import React from 'react';
import { useTranslation } from 'react-i18next';

export const getBucketSortExplanation = (): React.ReactNode => {
  const { t } = useTranslation();
  
  return (
    <>
      <p>{t('sorting.bucket.description')}</p>
      <h5>{t('sorting.bucket.process')}</h5>
      <ol>
        <li>{t('sorting.bucket.steps.1')}</li>
        <li>{t('sorting.bucket.steps.2')}</li>
        <li>{t('sorting.bucket.steps.3')}</li>
        <li>{t('sorting.bucket.steps.4')}</li>
      </ol>
      <h5>{t('sorting.bucket.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td style={{ width: '50%' }}>{t('sorting.bucket.case')}</td>
            <td style={{ width: '50%' }}>{t('sorting.bucket.time')}</td>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </>
  );
}; 