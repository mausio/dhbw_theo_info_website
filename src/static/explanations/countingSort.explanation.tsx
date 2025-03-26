import React from 'react';
import { useTranslation } from 'react-i18next';

export const getCountingSortExplanation = (): React.ReactNode => {
  const { t } = useTranslation();
  
  return (
    <>
      <p>{t('sorting.counting.description')}</p>
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
        <thead>
          <tr>
            <td style={{ width: '50%' }}>{t('sorting.counting.case')}</td>
            <td style={{ width: '50%' }}>{t('sorting.counting.time')}</td>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </>
  );
}; 