import styled from 'styled-components';

export const GenericImage = styled.img`
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
`;

export const NavigationBarContainer = styled.div`
  margin: 25px auto;
  position: relative;
  z-index: 1000;
  width: 80%;
  min-width: 300px;
max-width: 1100px; 
  height: 70px;
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--quarternary) 0.5px solid;
  background-color: var(--quarternary);

  -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
`;

export const Logo = styled(GenericImage)`
  user-select: none;
  position: relative;
  top: -1px;
  height: 40px;
  padding: 5px;

  width: 100px;

  border-radius: 5px;

  scale: 0.99;
  transition: 0.1s ease-out;

  &:hover {
    backdrop-filter: brightness(1.25);
    filter: saturate(1.1);
    scale: 1.02;
    transition: 0.2s ease-out;
  }

  &:active {
    backdrop-filter: brightness(1);

    box-shadow:
      rgb(100, 100, 100, 0.9) 2px 2px 1px 0px inset,
      rgba(50, 50, 50, 0.6) -0.2px -0.2px 1px -1px inset,
      rgb(25, 25, 25, 0) 1.5px 1.5px 1px 0px,
      rgba(0, 0, 0, 0) -0.1px -0.1px 2px -1px;

    scale: 0.99;
    transition: ease-in 0.1s;
  }
`;

export const LogoLinkButton = styled.a`
  user-select: none;
  width: auto;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;

  padding: 20px;
`;

export const LinkList = styled.ol`
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  column-gap: 10px;
  margin-right: 20px;
`;

export const LinkButton = styled.button`
  user-select: none;
  border: none;
  background-color: transparent;
  text-transform: capitalize;
  font-weight: bold;
  padding: 0 2px;
`;

export const ListElement = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  min-height: 30px;
  border: none;
  background-color: transparent;
  text-transform: capitalize;
  font-weight: bold;
  box-shadow: none;

  padding: 0 5px;
  border-radius: 5px;

  scale: 0.99;
  transition: 0.1s ease-out;

  &:disabled {
    filter: opacity(0.75) contrast(0.1) saturate(0) grayscale(2);

    backdrop-filter: none;
    scale: 0.99;
    transition: none;
    box-shadow: none;

    &:hover {
      backdrop-filter: none;
      scale: 0.99;
      transition: none;
      box-shadow: none;
    }

    &:active {
      backdrop-filter: none;
      scale: 0.99;
      transition: none;
      box-shadow: none;

      animation: 0.15s shake 2;

      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-6px);
        }
        75% {
          transform: translateX(6px);
        }
      }
    }
  }

  &:hover {
    //background: var(--secondary);

    backdrop-filter: brightness(0.7);
    scale: 1.01;
    transition: 0.2s ease-out;
  }

  &:active {
    //background: var(--secondary);
    backdrop-filter: brightness(0.7);
    box-shadow:
      rgb(0, 0, 0) 3px 3px 1px 0px inset,
      rgba(0, 0, 0, 0.5) -0.1px -0.1px 2px -1px inset;

    scale: 0.99;

    p {
      scale: 0.98;
    }

    transition: ease-in 0.05s;
  }
`;

export const LanguageButton = styled(ListElement)`
  color: var(--accent);
`;

export const SubLinkList = styled.ol`
  display: block;
  position: absolute;
  width: 90px;
  height: auto;
  background: var(--quarternary);
  border-radius: 5px;
  z-index: 1100;
  margin: 0;
  padding: 0;
  -webkit-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
`;

export const ClickableElementBinder = styled.div`
  user-select: none;
  min-width: 90px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
`;

export const SubListElement = styled(ListElement)`
  justify-content: start;
  p {
    align-self: start;
    text-align: start;
    margin-left: 5px;
  }
  width: 100%;
  min-height: 15px;
`;

export const ResetButton = styled.button`
  background: none;
  border: none;
  color: white;
  background-color: purple;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 10px;
  opacity: 0.7;
  transition: 0.2s ease-in-out;

  scale: 1.5;

  &:hover {
    scale: 1.6;
  }

  &:active {
    scale: 1.4;
  }
`;
