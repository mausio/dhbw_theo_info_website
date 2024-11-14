import styled from 'styled-components';

export const HeapSortAnimationVisualsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const NodeTreeContainer = styled.div`
  width: 80%;
  height: 100%;

  padding: 2px;
  margin: 5px auto 5px auto;

  border-radius: 10px;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.28) 1px 1px 3px 1px;
`;

export const NodeValueIndexChart = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  margin: 12px auto 0 auto;
`;

export const SingleNodeValueIndexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  text-align: center;
  user-select: none;
`;

export const NodeChartValue = styled.p`
  margin: 0;
  padding: 2px 0;

  transition: 0.1s ease-in-out;
  font-weight: bold;

  color: black;
  border: 1px solid black;
`;
export const NodeChartIndex = styled.p`
  margin: 2px 0 0 0;

  font-size: 0.95rem;

  color: dimgray;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
`;
