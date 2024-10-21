import { Outlet, useNavigate } from 'react-router-dom';
import dhbwLogo from '../assets/dhbw_logo.png';
import {
  ClickableElementBinder,
  LanguageButton,
  LinkList,
  ListElement,
  Logo,
  LogoLinkButton,
  NavigationBarContainer,
  SubLinkList,
  SubListElement,
} from '../styles/nav.style.ts';
import { APP_ROUTES } from '../routes/routes.ts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GenericImprintNotice, GenericMainContainer } from '../styles/generic.style.ts';
import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';

const SingleElement = ({ childKey: key, childValue: value }) => {
  const navigate = useNavigate();

  const handleNavigate = (dest: string) => {
    navigate(dest);
  };

  return (
    <ListElement onClick={() => handleNavigate(value as string)} key={`${key}0`}>
      <p>{key}</p>
    </ListElement>
  );
};

const DropdownSingleElement = ({ childValue: value, childKey: key }) => {
  const navigate = useNavigate();

  const handleNavigate = (dest: string) => {
    navigate(dest);
  };

  return (
    <SubListElement onClick={() => handleNavigate(value)} key={`${key}09`}>
      <p>{value}</p>
    </SubListElement>
  );
};

const DropdownList = ({ childValue: value, childKey: key }) => {
  return (
    <SubLinkList key={`${key}3`}>
      {Object.entries(value).map(([subKey, subValue]) => {
        return <DropdownSingleElement childValue={subValue} childKey={subKey} key={`${key}05`} />;
      })}
    </SubLinkList>
  );
};

const DropdownElement = ({ childKey: key, childValue: value }) => {
  const [menu, setMenu] = useState<undefined | string>(undefined);
  const navigate = useNavigate();

  const handleNavigate = (dest: string) => {
    navigate(dest);
  };

  const handleDropdownClick = (e: React.MouseEvent, key: string) => {
    if (key == menu) {
      setMenu(null);
    } else {
      setMenu(key);
    }
  };

  const handleClickAway = () => {
    if (menu != null) {
      setMenu(null);
    }
  };

  return (
    <ClickAwayListener onClickAway={(e) => handleClickAway()}>
      <ClickableElementBinder onClick={(e) => handleDropdownClick(e, key)} key={`${key}2`}>
        <ListElement key={`${key}1`}>
          <p>{key}</p>
          <ArrowDropDownIcon />
        </ListElement>
        {key == menu && <DropdownList childKey={key} childValue={value} key={`${key}06`} />}
      </ClickableElementBinder>
    </ClickAwayListener>
  );
};

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
              return <SingleElement childKey={key} childValue={value} key={`${key}07`} />;
            case 'object':
              return <DropdownElement childValue={value} childKey={key} key={`${key}08`} />;
          }
        })}
      </>
    );
  };

  return (
    <>
      <NavigationBarContainer>
        <LogoLinkButton onClick={() => handleNavigate(APP_ROUTES.home)}>
          <Logo src={dhbwLogo as string} />
        </LogoLinkButton>

        <LinkList>
          {createLinks()}
          {/*TODO: Add translation for German*/}
          <LanguageButton>English</LanguageButton>x
        </LinkList>
      </NavigationBarContainer>
      <GenericMainContainer>
        <Outlet />
      </GenericMainContainer>
      <GenericImprintNotice>
        <p>2024 DHBW Karlsruhe</p>
        <ListElement onClick={() => handleNavigate(APP_ROUTES.imprint)}>{APP_ROUTES.imprint}</ListElement>
      </GenericImprintNotice>
    </>
  );
};

export default NavigationBar;
