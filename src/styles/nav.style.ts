import styled from 'styled-components';

export const GenericImage = styled.img`
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
`;

export const NavigationBarContainer = styled.div`
  //position: sticky;
  //top: 4vh;
  //left: 2vw;
  margin: 25px auto;
  z-index: 1000;
  width: 96vw;
  height: 70px;
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
  position: relative;
  top: -1px;
  height: 40px;
  margin: 0 10px;
`;

export const LogoLinkButton = styled.a`
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
  border: none;
  background-color: transparent;
  text-transform: capitalize;
  font-weight: bold;
  padding: 0 2px;
`;

export const LanguageButton = styled(LinkButton)`
  color: var(--accent);
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

  padding: 0 5px;

  border-radius: 5px;

  &:hover {
    background: var(--secondary);

    backdrop-filter: brightness(1.1);
    transition: 0.1s;
  }

  &:active {
    background: var(--secondary);
    backdrop-filter: brightness(0.95);

    box-shadow:
      rgb(0, 0, 0) 3px 3px 1px 0px inset,
      rgba(0, 0, 0, 0.5) -0.1px -0.1px 2px -1px inset;

    scale: 0.99;

    p {
      scale: 0.98;
    }

    transition: ease-in 0.05s;
  }

  box-shadow: none;
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
