import styled from 'styled-components';

const BaseContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 15%;
  height: 30%;
  max-height: 1000px;
  min-height: 550px;
  width: 300px;
  padding: 0px 10px 35px 15px;
  margin: 0;

  display: grid;
  grid-template-rows: 1fr;

  transition: 0.6s ease-in-out;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.2);

  & h5 {
    color: #2c3e50;
    margin: 1rem 0;
  }

  & p {
    margin: 0.8rem 0;
    line-height: 1.4;
  }

  & ol, & ul {
    margin-left: 1.5rem;
  }

  & li {
    margin: 0.5rem 0;
  }
`;

// Inherits: BaseContainer + fixed positioning, grid layout
export const ExplanationContainer = styled(BaseContainer)`
  left: 5px;
  right: auto;
  grid-template-columns: 275px 25px;
`;

// Inherits: BaseContainer + fixed positioning, grid layout
export const TippsContainer = styled(BaseContainer)`
  right: 5px;
  left: auto;
  grid-template-columns: 25px 275px;
`;

const BaseTitle = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  cursor: pointer;
  padding: 10px 0;
  color: #2c3e50;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

// Inherits: BaseTitle + vertical text orientation
export const ExplanationTitle = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  cursor: pointer;
  padding: 10px 0;
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.5em;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  position: relative; 
left: 5px;
right: auto;
`;

// Inherits: BaseTitle + vertical text orientation
export const TippsTitle = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  cursor: pointer;
  padding: 10px 0;
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.5em;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
position: relative; 
left: auto;
right: 8px;
  transform: none;
`;
