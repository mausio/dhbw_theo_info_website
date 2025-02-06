import React from 'react';
import { useTranslation } from 'react-i18next';

export const getInsertionSortExplanation = (): React.ReactNode => {
  const { t } = useTranslation();
  
  return (
    <>
      <p>
        {t('sorting.insertion.description')}
      </p>
      <h5>{t('sorting.insertion.process')}</h5>
      <ol>
        <li>{t('sorting.insertion.steps.1')}</li>
        <li>{t('sorting.insertion.steps.2')}</li>
        <li>{t('sorting.insertion.steps.3')}</li>
        <li>{t('sorting.insertion.steps.4')}</li>
        <li>{t('sorting.insertion.steps.5')}</li>
      </ol>
      <h5>{t('sorting.insertion.complexity')}</h5>
      <table style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '50%' }}>{t('sorting.insertion.case')}</td>
          <td style={{ width: '50%' }}>{t('sorting.insertion.time')}</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.best')}</td>
          <td>O(n)</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.average')}</td>
          <td>O(n²)</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.worst')}</td>
          <td>O(n²)</td>
        </tr>
        <tr>
          <td>{t('sorting.insertion.space')}</td>
          <td>O(1)</td>
        </tr>
      </table>
    </>
  );
}; 