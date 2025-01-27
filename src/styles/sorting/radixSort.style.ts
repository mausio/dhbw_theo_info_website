import { GenericSortGrid } from '../general/generic.style.ts';
import styled from 'styled-components';

export const RadixSortGrid = styled(GenericSortGrid)`
  grid-template-areas:
    'animation nothing'
    'code code'
    'task task';
  user-select: none;
`;

export const DiagrammsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin: 0 auto;
  padding: 0;

  border-radius: 10px;

  height: fit-content;

  user-select: none;


`;

export const SingleDiagram = styled.div`
  height: auto;
  width: 160px;
  padding: 8px;

  display: grid;

  grid-template-columns: 1fr;

  row-gap: 8px;

  border-radius: 10px;
  border: 1px solid gray;

  background: radial-gradient(white, color-mix(in srgb, var(--primary), white 85%) 95%);

  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 4px 0px inset;

  user-select: none;
`;

export const FractionElement = styled.p`
  height: 100%;
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;

  user-select: none;
`;

export const Row = styled.div`
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;

  border-radius: 4px;
  border: 1.5px solid black;
  background-color: white;
  box-shadow: rgb(0, 0, 0, 0.25) 0px 0px 2px 1px;
  //border: 0.1px solid black;

  transition: 0.3s ease-in-out;

  user-select: none;
`;

export const Spacer = styled.div`
  height: auto;
  border: 2px solid lightgray;
  border-radius: 5px;
  margin: 30px 10px;
`;
