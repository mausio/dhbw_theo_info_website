import Lottie from 'react-lottie';

import dino from '../lotties/dino.json';
import { DinoContainer } from '../styles/fourOfour.style.ts';

const FourOfourPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dino,
  };

  return (
    <>
      <h1 style={{ marginBottom: '0' }}>This page could not be found :/</h1>
      <DinoContainer>
        <div>
          <Lottie
            options={defaultOptions}
            isClickToPauseDisabled={true}
            height={600}
            width={600}
            style={{ margin: '0', position: 'relative', zIndex: '1' }}
            speed={1.05}
          />
        </div>
      </DinoContainer>
    </>
  );
};

export default FourOfourPage;
