import styled from 'styled-components';

export const IterationTitle = styled.p`
  font-weight: bold;
  margin: 0 0 15px 5px;
  padding: 0;
  color: white;
  user-select: none;
`;

export const SingleIterationContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  position: relative;
  padding: 15px 20px;
  user-select: none;

  border-radius: 10px;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px inset;
  background: color-mix(in srgb, var(--tertiary), white 20%);
`;

export const IterationsContainer = styled.div`
  width: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 150px;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  user-select: none;

  margin: 35px 0 25px 0;
`;

export const SortableContainer = styled.div`
  width: fit-content;
  height: 65px;
  padding: 0;
  user-select: none;

  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;

  border-radius: 5px;
  background: transparent;
`;

export const SortableArrayContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: auto;
  height: auto;

  column-gap: 5px;
  margin: 20px 0;
  justify-content: center;
`;

export const ButtonIterationContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  user-select: none;
`;

export const RecursionContainer = styled.div`
  transition: 1s ease;

  margin: 25px 0;
  padding: 10px 10px;
  border-radius: 15px;

  box-shadow:
    rgb(0, 0, 0, 0.4) 1px 1px 4px 0px inset,
    rgb(0, 0, 0, 0.1) -1px -1px 2px 0 inset;

  background: white;
`;
