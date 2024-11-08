import styled from 'styled-components';

export const BarChartDivider = styled.div`
  border: 2px lightgray solid;
  border-radius: 10px;
  margin: 5px 0;
`;

export const CountingSortEntriesContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 50px;
`;

export const DiagramInput = styled.input`
  position: absolute;
  top: 0;
  margin: 0 1.55% 0 1.55%;
  text-align: center;
  padding: 4px 0 4px 0;
  border-radius: 5px;
  border: 2px dashed gray;

  @keyframes correct {
    0% {
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
    }
    8% {
      box-shadow: 0px 0px 10px 5px rgba(45, 255, 196, 0.8);
    }
    80% {
      box-shadow: 0px 0px 10px 5px rgba(45, 255, 196, 0.8);
    }
    100% {
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
    }
  }
  @keyframes wrong {
    0% {
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
    }
    8% {
      box-shadow: 0px 0px 10px 5px rgba(226, 0, 26, 0.57);
    }
    80% {
      box-shadow: 0px 0px 10px 5px rgba(226, 0, 26, 0.57);
    }
    100% {
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
    }
  }

  &:focus-visible,
  &:focus,
  &:active {
    border: black dashed 2px !important;
    outline: none;
  }

  &:disabled {
    border: darkgray dashed 2px !important;
  }
`;

export const SingleDiagram = styled.div`
  width: 40%;
`;

export const DiagramIterationWrapper = styled.div`
  width: 100%;
  position: relative;
  bottom: 5px;
  left: -1.8px;
  display: flex;
  flex-direction: row;
  margin: 0 auto 25px auto;
`;

export const FirstStepContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin: 25px 0;
  overflow: hidden;
`;

export const DiagramName = styled.p`
  margin-bottom: 0;
`;
