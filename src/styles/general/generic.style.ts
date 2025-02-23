import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  user-select: none;
  width: auto;
  min-width: 65px;
  min-height: 30px;
  color: var(--black);
  backdrop-filter: brightness(0.8) opacity(0.2) saturate(0) contrast(0);
  text-transform: capitalize;
  font-weight: bold;
  scale: 1;
  padding: 0 5px;
  margin: 2px;
  border-radius: 10px;
  border: 0.1px solid var(--primary);
  box-shadow:
    rgb(0, 0, 0, 0) 2px 2px 1px 0px inset,
    rgba(0, 0, 0, 0) -0.2px -0.2px 1px -1px inset,
    rgb(0, 0, 0, 0.9) 1.5px 1.5px 1px 0px,
    rgba(0, 0, 0, 0.5) -0.1px -0.1px 2px -1px;
  transition: ease-in 0.1s;

  &:hover {
    backdrop-filter: brightness(1.1);
    transition: 0.1s;
  }

  &:disabled {
    scale: 1;
    &:active {
      scale: 1;
      backdrop-filter: brightness(0.8) opacity(0.2) saturate(0) contrast(0);
      box-shadow:
        rgb(0, 0, 0, 0) 2px 2px 1px 0px inset,
        rgba(0, 0, 0, 0) -0.2px -0.2px 1px -1px inset,
        rgb(0, 0, 0, 0.9) 1.5px 1.5px 1px 0px,
        rgba(0, 0, 0, 0.5) -0.1px -0.1px 2px -1px;
    }
  }

  &:active {
    backdrop-filter: brightness(1);
    box-shadow:
      rgb(0, 0, 0, 0.9) 2px 2px 1px 0px inset,
      rgba(0, 0, 0, 0.6) -0.2px -0.2px 1px -1px inset,
      rgb(0, 0, 0, 0) 1.5px 1.5px 1px 0px,
      rgba(0, 0, 0, 0) -0.1px -0.1px 2px -1px;
    scale: 0.99;
    transition: ease-in 0.1s;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
`;

export const MarkedText = styled.span`
  background: lightgray;
  border-radius: 2px;
  padding: 1px 5px;
`;

export const MarkedRedText = styled(MarkedText)`
  color: var(--accent);
`;

export const GenericMainContainer = styled.div`
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px 15px 20px 15px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 10px 10px 15px 10px;
    margin: 15px auto;
  }

  width: 80%;
  min-width: 300px;
  max-width: 1100px; 
  height: 100%;
  inset: 0;
  margin: 25px auto;
  padding: 10px 20px 25px 20px;
  border-radius: 5px;
  //background-color: var(--quarternary);
  backdrop-filter: brightness(100) opacity(1);

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);

`;

export const GenericImprintNotice = styled.div`
  @media (max-width: 768px) {
    width: 90%;
    padding: 8px 15px;
    margin: 15px auto;
    height: auto;
    min-height: 45px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 10px;
    margin: 10px auto;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
    height: auto;
    min-height: 60px;
  }

  width: 80%;
  min-width: 300px;
  max-width: 1100px;
  height: 55px;
  inset: 0;
  margin: 10px auto;
  padding: 10px 20px;
  border-radius: 5px;
  //background-color: var(--quarternary);
  backdrop-filter: brightness(100) opacity(1);

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

export const AlgorithmSection = styled.div`
  height: 500px;
  grid-area: animation;
  width: auto;
  min-width: 300px;
  max-width: 500px;

  display: flex;
  flex-direction: column;

  justify-content: space-between;

  border-radius: 25px;

  border: 1px solid darkgray;
  //background: color-mix(in srgb, var(--primary), white 92%);
  background: radial-gradient(white, color-mix(in srgb, var(--primary), white 90%) 95%);
  box-shadow: rgb(0, 0, 0, 0.5) 2px 2px 5px 0px inset;

  backdrop-filter: blur(20px);

  padding: 10px 15px;

    @media (max-width: 480px) {
    min-width: 200px;
  }
`;

export const GenericSortGrid = styled.div`
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'animation'
      'code'
      'spacer'
      'task';
    column-gap: min(20px, 30px);
    row-gap: min(15px, 30px);
  }

  position: relative;
  width: 100%;
  max-width: 1000px; // Slightly smaller than container
  margin: 30px auto;
  
  display: grid;
  grid-template-columns: minmax(auto, 1fr) minmax(auto, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'animation code'
    'spacer spacer'
    'task task';
  column-gap: min(40px, 50px);
  row-gap: min(20px, 50px);3

  transition: ease 1s;


    @media (max-width: 480px) {
width: 100%;
min-width: 200px;
}
`;

export const CodeContainer = styled.div`
  overflow: hidden;
  position: relative;
  grid-area: code;
  width: auto;

    min-width: 350px;
  max-width: 500px;


  height: auto;
  border-radius: 25px;

  padding: 10px 15px;

  border: 1px solid black;
  box-shadow: rgb(0, 0, 0, 0.6) 3px 3px 5px 1px inset;
  background-color: color-mix(in srgb, var(--contrastAccent), black 50%);
  letter-spacing: 0.06rem;

  line-height: 1.4;

  .table-row {
    display: table-row;
  }

  .table-cell {
    display: table-cell;
    padding-right: 1rem;
    font-size: 0.9rem;
    color: #6b7280;
    text-align: left;
    user-select: none;
    filter: brightness(1.25) saturate(1.1);
  }

  .CodeBlock_LineContent {
    white-space: pre;
  }
`;

export const SingleTaskContainer = styled.div`
  position: relative;
  transition: 1s ease;
  width: auto;
  height: auto;
  overflow: hidden;
  border-radius: 25px;
  border: 1px solid darkgray;
  background: radial-gradient(white, color-mix(in srgb, var(--primary), white 95%) 95%);
  box-shadow: rgb(0, 0, 0, 0.5) 2px 2px 5px 0px inset;
  padding: 0 25px;

  pre {
    width: auto;
    code {
      background: transparent !important;
    }
  }

  @media (max-width: 480px) {
    padding: 0 15px;
    
    h2 {
      font-size: 1.2rem;
      margin: 15px 0;
    }

    p {
      font-size: 0.85rem;
      margin: 8px 0;
    }

    ${MarkedText}, ${MarkedRedText} {
      font-size: 0.85rem;
      padding: 1px 3px;
    }

    ${Button} {
      font-size: 0.8rem;
      min-width: 50px;
      min-height: 25px;
    }
  }

  @media (max-width: 950px){
  display: none;
  
  }
`;

export const Fader = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  height: 200px;
  width: 100%;
  transition: ease 0.5s;
`;

export const TasksContainer = styled.div`
  width: 100%;
  display: flex;
  grid-area: task;
  flex-direction: column;
  row-gap: 50px;

  @media (max-width: 480px) {
    row-gap: 30px;

    h2 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
    }

    ${MarkedText}, ${MarkedRedText} {
      font-size: 0.9rem;
    }
  }
`;

export const BraceSpan = styled.span`
  font-weight: lighter;
  font-size: 60px;
  position: relative;
  bottom: 3px;
  padding-left: 2px;
  letter-spacing: 0;
  color: white;
`;

export const ButtonTaskContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  user-select: none;
`;
