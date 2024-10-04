import { Outlet, useNavigate } from 'react-router-dom';
import dhbwLogo from '../assets/dhbw_logo.png';
import {
  LanguageButton,
  LinkButton,
  LinkerContainer,
  LinkList,
  ListElement,
  Logo,
  LogoLinkButton,
  NavigationBarContainer,
  SubLinkList,
  TopSpacer,
} from '../styles/nav.style.ts';
import { APP_ROUTES } from '../routes/routes.ts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GenericImprintNotice, GenericMainContainer } from '../styles/generic.style.ts';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (dest: string) => {
    navigate(dest);
  };

  const createLinks = () => {
    return (
      <>
        {Object.entries(APP_ROUTES).map(([key, value]) => {
          switch (typeof value) {
            case 'string':
              return (
                <ListElement key={key}>
                  <LinkerContainer>
                    <LinkButton onClick={() => handleNavigate(value)}>{key}</LinkButton>
                  </LinkerContainer>
                </ListElement>
              );
            case 'object':
              return (
                <ListElement key={key}>
                  <LinkerContainer>
                    <LinkButton>{key}</LinkButton>
                    <ArrowDropDownIcon />
                  </LinkerContainer>
                  <SubLinkList />
                </ListElement>
              );
          }
        })}
      </>
    );
  };

  return (
    <>
      <NavigationBarContainer>
        <LogoLinkButton>
          <Logo src={dhbwLogo} />
        </LogoLinkButton>

        <LinkList>
          {createLinks()}
          <LanguageButton>English</LanguageButton>
        </LinkList>
      </NavigationBarContainer>
      <TopSpacer />
      <GenericMainContainer>
        <Outlet />
      </GenericMainContainer>
      <GenericImprintNotice>
        <p>2024 DHBW Karlsruhe</p>
        <p>Impressum</p>
      </GenericImprintNotice>
    </>
  );
};

export default NavigationBar;
