import React from 'react';
import { useTranslation } from 'react-i18next';

export const getMergeSortExplanation = (): React.ReactNode => {
  const { t } = useTranslation();
  
  return (
    <>
      <p>{t('sorting.merge.description')}</p>
      <h5>{t('sorting.merge.process')}</h5>
      <ol>
        <li>{t('sorting.merge.steps.1')}</li>
        <li>{t('sorting.merge.steps.2')}</li>
        <li>{t('sorting.merge.steps.3')}</li>
        <li>{t('sorting.merge.steps.4')}</li>
      </ol>
      <h5>{t('sorting.merge.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td style={{ width: '50%' }}>{t('sorting.merge.case')}</td>
            <td style={{ width: '50%' }}>{t('sorting.merge.time')}</td>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </>
  );
}; 