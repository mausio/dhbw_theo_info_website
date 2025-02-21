import React from 'react';
import styled from 'styled-components';

const BaseTape = styled.img`
  position: absolute;
  width: 120px;
  height: auto;
  z-index: 100;
  opacity: 0.9;
`;

export const DuctTapeLeftTop = styled(BaseTape)`

  transform: rotate(-45deg);
`;

export const DuctTapeRightTop = styled(BaseTape)`

  transform: rotate(45deg);
`;

export const DuctTapeLeftBottom = styled(BaseTape)`

  transform: rotate(-135deg);
`;

export const DuctTapeRightBottom = styled(BaseTape)`

  transform: rotate(135deg);
`; 

