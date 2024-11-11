import styled from 'styled-components';

export const ChartContainer = styled.div`
  position: relative;
  margin: 7px auto;
`;

export const BarContainer = styled.div`
  width: 7%;
  padding: 5px 1.55% 4px 1.55%;
  margin: 0;
  position: absolute;
  transition: height 0.3s ease-in-out;
  bottom: 0;
  text-align: center;
  border-radius: 5px;
`;

export const Bar = styled.div`
  background-color: var(--contrastAccent);
  border-radius: 5px;
  width: 100%;
  transition: height 0.3s ease-in-out;
`;

export const BarNumber = styled.div`
  margin-top: 5px;
  font-size: 16px;
  color: black;
`;

export const ControlPanel = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;

  backdrop-filter: brightness(1.5);

  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px inset;

  background: color-mix(in srgb, var(--tertiary), white 20%);

  border-radius: 10px;

  margin: 15px 3px 15px 3px;
`;

export const ChartAligner = styled.div`
  width: 100%;
`;

export const ButtonPanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  margin: 15px 0 10px 0;
`;

export const SliderPanel = styled.div`
  width: 300px;
  background: white;
  margin-top: 15px;
  padding: 0 20px;
  border-radius: 50px;
  box-shadow: rgb(0, 0, 0, 0.8) 2px 2px 1px 0px;

  .MuiSlider-root {
    position: relative;
    top: 2px;
  }
`;

export const KeyIndexContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  margin: 5px auto 20px auto;
  padding: 6px 0;
  column-gap: 2px;

  box-shadow: rgb(0, 0, 0, 1) 1px 1px 2px 0px inset;
  background: color-mix(in srgb, var(--primary), white 20%);
  border-radius: 50px;

  p {
    width: 90%;
    min-height: 20px;
    background: transparent;
    border-radius: 8px;
    padding: 1px 7px;
    margin: 0;
    text-align: center;
    justify-self: center;
    align-self: center;
    backdrop-filter: blur(10px) brightness(10) opacity(0.9);
    box-shadow: rgb(0, 0, 0, 0.2) 1px 1px 1px 0px inset;
    border: 0.5px solid black;
    font-weight: normal;
  }
`;
