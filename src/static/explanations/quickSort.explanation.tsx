import React from 'react';
import { useTranslation } from 'react-i18next';

export const getQuickSortExplanation = (): React.ReactNode => {
  const { t } = useTranslation();
  
  return (
    <>
      <p>{t('sorting.quick.description')}</p>
      <h5>{t('sorting.quick.process')}</h5>
      <ol>
        <li>{t('sorting.quick.steps.1')}</li>
        <li>{t('sorting.quick.steps.2')}</li>
        <li>{t('sorting.quick.steps.3')}</li>
        <li>{t('sorting.quick.steps.4')}</li>
      </ol>
      <h5>{t('sorting.quick.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td style={{ width: '50%' }}>{t('sorting.quick.case')}</td>
            <td style={{ width: '50%' }}>{t('sorting.quick.time')}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('sorting.quick.best')}</td>
            <td>{t('sorting.quick.bestTime')}</td>
          </tr>
          <tr>
            <td>{t('sorting.quick.average')}</td>
            <td>{t('sorting.quick.averageTime')}</td>
          </tr>
          <tr>
            <td>{t('sorting.quick.worst')}</td>
            <td>{t('sorting.quick.worstTime')}</td>
          </tr>
          <tr>
            <td>{t('sorting.quick.space')}</td>
            <td>{t('sorting.quick.spaceComplexity')}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; 