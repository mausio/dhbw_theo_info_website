import Confetti from 'react-confetti';
import * as React from 'react';

const ConfettiComponent = ({ run, recycle }) => {
  return (
    <Confetti
      recycle={recycle}
      height={window.innerHeight}
      numberOfPieces={200}
      colors={[
        '#e2001a',
        '#80deea',
        '#4dd0e1',
        '#26c6da',
        '#00bcd4',
        '#00acc1',
        '#0097a7',
        '#00838f',
        '#006064',
        '#0077b6',
        '#0072bb',
        '#006db3',
        '#0066a1',
        '#005f91',
        '#00557f',
        '#004d6d',
        '#004358',
        '#003c4e',
        '#002b4a',
        '#39576f',
        '#5b6971',
        '#2b2b2b',
        '#000000',
      ]}
      width={window.innerWidth}
      run={run}
    />
  );
};

export default ConfettiComponent;
