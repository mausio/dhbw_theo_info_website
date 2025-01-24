import * as React from 'react';
import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener'; // Import ClickAwayListener
import { useTranslation } from 'react-i18next';
import {
  ExplanationContainer,
  ExplanationTitle,
  TippsContainer,
  TippsTitle,
} from '../../styles/general/tippsAndExplanation.style.ts';

interface TippsAndExplanationProps {
  children: React.ReactNode;
  tipps: React.ReactNode;
  explanation: React.ReactNode;
}

const TippsAndExplanationWrapper: React.FC<TippsAndExplanationProps> = ({ children, tipps, explanation }) => {
  const { t } = useTranslation();
  const [hideExplanation, setHideExplanation] = useState<boolean>(true);
  const [hideTipps, setHideTipps] = useState<boolean>(true);

  const toggleExplanation = () => setHideExplanation(!hideExplanation);
  const toggleTipps = () => setHideTipps(!hideTipps);

  const handleExplanationClickAway = () => {
    if (!hideExplanation) {
      setHideExplanation(true);
    }
  };

  const handleTippsClickAway = () => {
    if (!hideTipps) {
      setHideTipps(true);
    }
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleExplanationClickAway}>
        <ExplanationContainer
          onClick={toggleExplanation}
          style={{
            left: hideExplanation ? '-290px' : '5px',
            transition: 'left 0.3s ease',
          }}
        >
          <div>{explanation}</div>
          <ExplanationTitle>{t('general.explanation')}</ExplanationTitle>
        </ExplanationContainer>
      </ClickAwayListener>
      {children}
      {tipps && React.Children.toArray(tipps).some(child => {
        // Check if the child is a valid React element and not an empty fragment or div
        return React.isValidElement(child) && !(child.type === React.Fragment && React.Children.count(child.props.children) === 0) && !(child.type === 'div' && React.Children.count(child.props.children) === 0);
      }) && (
        <ClickAwayListener onClickAway={handleTippsClickAway}>
          <TippsContainer
            onClick={toggleTipps}
            style={{
              left: 'auto',
              right: hideTipps ? '-290px' : '5px',
              transition: 'right 0.3s ease',
            }}
          >
            <TippsTitle>{t('general.tipps')}</TippsTitle>
            <div>{tipps}</div>
          </TippsContainer>
        </ClickAwayListener>
      )}
    </>
  );
};

export default TippsAndExplanationWrapper;
