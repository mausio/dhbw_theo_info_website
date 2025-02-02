import styled from 'styled-components';

export const DivideAndConquerContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const Cell = styled.div`
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export const ArrayInput = styled.input`
  height: 30px;
  padding: 5px;
  margin: 5px 5px;

  font-size: 1.1rem;
  font-weight: bolder;
  text-align: center;

  border-radius: 10px;
  border: gray dashed 2px;
  background: transparent;

  transition: 0.3s ease-out;

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
    filter: opacity(0.7);
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

export const EmptySpacer = styled.div`
  background: transparent;
  height: 58px;
  width: 100%;
`;
