import React from 'react';
import { useTranslation } from 'react-i18next';

export const getHeapSortExplanation = (): React.ReactNode => {
  const { t } = useTranslation();
  
  return (
    <>
      <p>{t('sorting.heap.description')}</p>
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
        <thead>
          <tr>
            <td style={{ width: '50%' }}>{t('sorting.heap.case')}</td>
            <td style={{ width: '50%' }}>{t('sorting.heap.time')}</td>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </>
  );
}; 