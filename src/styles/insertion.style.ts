import styled from 'styled-components';

export const ChartContainer = styled.div`
  position: relative;
  height: 200px;
  width: 500px;
`;

export const BarContainer = styled.div`
  width: 8%;
  padding: 6px 5px 5px 5px;
  position: absolute;
  transition:
    height 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
  bottom: 0;
  text-align: center;
  border-radius: 5px;
`;

export const Bar = styled.div`
  background-color: #39576f;
  border-radius: 5px;
  width: 100%;
  transition:
    height 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
`;

export const BarNumber = styled.div`
  margin-top: 5px;
  font-size: 16px;
  color: black;
`;

export const Button = styled.button`
  margin-right: 10px;
`;

export const SpeedControl = styled.div`
  margin-top: 20px;
`;

export const Label = styled.label`
  margin-right: 10px;
`;
