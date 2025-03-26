import React from 'react';
import { useTranslation } from 'react-i18next';

export const getRadixSortExplanation = (): React.ReactNode => {
  const { t } = useTranslation();
  
  return (
    <>
      <p>{t('sorting.radix.description')}</p>
      <h5>{t('sorting.radix.process')}</h5>
      <ol>
        <li>{t('sorting.radix.steps.1')}</li>
        <li>{t('sorting.radix.steps.2')}</li>
        <li>{t('sorting.radix.steps.3')}</li>
        <li>{t('sorting.radix.steps.4')}</li>
      </ol>
      <h5>{t('sorting.radix.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td style={{ width: '50%' }}>{t('sorting.radix.case')}</td>
            <td style={{ width: '50%' }}>{t('sorting.radix.time')}</td>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </>
  );
}; 