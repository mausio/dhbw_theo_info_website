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
  height: 80px;
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
  height: 50px;
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
  list-style: none;
  column-gap: 10px;
  margin: 0px 20px;
`;

export const LinkButton = styled.button`
  border: none;
  background-color: transparent;
  text-transform: capitalize;
  font-weight: bold;
  padding: 0 2px;
`;

export const LinkListButton = styled(LinkButton)``;

export const LanguageButton = styled(LinkButton)`
  color: var(--accent);
`;

export const ListElement = styled.div`
  padding: 5px;

  border-radius: 5px;

  &:active {
  }

  &:hover {
    background: var(--secondary);
    color: var(--quarternary);

    button {
      color: var(--quarternary);
      transition: ease-out 0.05s;
    }

    transition: ease-out 0.05s;
  }

  transition: ease-in 0.3s;

  &:hover ol {
    display: block;
  }
`;

export const SubLinkList = styled.ol`
  display: none;
  position: absolute;
  width: 80px;
  height: 140px;
  background: var(--secondary);
  border-radius: 5px;
  z-index: 1100;
`;

export const LinkerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto 0;
`;

export const TopSpacer = styled.div`
  padding: 0 0;
  width: 100%;
`;
