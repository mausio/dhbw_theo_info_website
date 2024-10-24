import styled from 'styled-components';

export const GenericMainContainer = styled.div`
  width: 90vw;
  height: 100%;
  inset: 0;
  margin: 25px auto;
  border-radius: 5px;
  //background-color: var(--quarternary);
  backdrop-filter: brightness(100) opacity(1);
  padding: 0.25vh 3vw;

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);

  overflow: hidden;
`;

export const GenericImprintNotice = styled.div`
  width: 93.25vw;
  height: 55px;
  inset: 0;
  margin: 10px auto;
  border-radius: 5px;
  //background-color: var(--quarternary);
  backdrop-filter: brightness(100) opacity(1);
  padding: 10px 20px;

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  min-width: 70px;
  min-height: 30px;
  border: none;
  color: var(--black);
  backdrop-filter: brightness(0.8) opacity(0.2) saturate(0) contrast(0);
  text-transform: capitalize;
  font-weight: bold;
  scale: 1;

  padding: 0 5px;
  margin: 2px;

  border-radius: 10px;

  &:hover {
    backdrop-filter: brightness(1.1);
    transition: 0.1s;
  }

  box-shadow:
    rgb(0, 0, 0) 1px 1px 1px 0px,
    rgba(0, 0, 0, 0.5) -0.1px -0.1px 2px -1px;

  &:active {
    backdrop-filter: brightness(1);

    box-shadow:
      rgb(0, 0, 0) 3px 3px 1px 0px inset,
      rgba(0, 0, 0, 0.5) -0.1px -0.1px 2px -1px inset;

    border: 0.5px solid black;

    scale: 0.99;
    transition: ease-in 0.05s;
  }
`;

export const AlgorithmSection = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 25px;

  //background: color-mix(in srgb, var(--primary), white 92%);
  background: radial-gradient(white, color-mix(in srgb, var(--primary), white 90%) 95%);

  box-shadow: rgb(0, 0, 0, 0.5) 2px 2px 5px 0px inset;

  backdrop-filter: blur(20px);

  padding: 15px 25px;

  width: 500px;
`;
