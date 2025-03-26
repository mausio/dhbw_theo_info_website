import { Outlet, useNavigate } from 'react-router-dom';
import dhbwLogo from '../../assets/dhbw_logo.png';
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
  ResetButton,
} from '../../styles/general/nav.style.ts';
import { APP_ROUTES } from '../../routes/routes.ts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GenericImprintNotice } from '../../styles/general/generic.style.ts';
import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { containsNot, removeNotFromString } from '../../utils/string.utils.ts';
import i18next from '../../translation/i18next.ts';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user.context';

const SingleElement = ({ childKey: key, childValue: value }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (dest: string) => {
    navigate(dest);
  };

  return (
    <ListElement disabled={containsNot(key)} onClick={() => handleNavigate(value as string)} key={`single-${key}`}>
      <p>{t(`navigation.${removeNotFromString(key)}`)}</p>
    </ListElement>
  );
};

const DropdownSingleElement = ({ parentKey: parentKey, childValue: value, childKey: key }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (dest: string) => {
    navigate(dest);
  };

  const buildName = () => {
    return `${value} ${parentKey}`;
  };

  return (
    <SubListElement disabled={containsNot(value)} onClick={() => handleNavigate(value)} key={`dropdown-item-${parentKey}-${key}`}>
      <p>{t(`navigation.${removeNotFromString(value)}`)}</p>
    </SubListElement>
  );
};

const DropdownList = ({ childValue: value, childKey: key }) => {
  return (
    <SubLinkList key={`sublink-${key}`}>
      {Object.entries(value).map(([subKey, subValue]) => {
        return <DropdownSingleElement parentKey={key} childValue={subValue} childKey={subKey} key={`dropdown-element-${key}-${subKey}`} />;
      })}
    </SubLinkList>
  );
};

const DropdownElement = ({ childKey: key, childValue: value }) => {
  const [menu, setMenu] = useState<undefined | string>(undefined);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <ClickableElementBinder onClick={(e) => handleDropdownClick(e, key)} key={`clickable-${key}`}>
        <ListElement disabled={containsNot(key)} key={`list-element-${key}`}>
          <p>{t(`navigation.${removeNotFromString(key)}`)}</p>
          <ArrowDropDownIcon />
        </ListElement>
        {key == menu && <DropdownList childKey={key} childValue={value} key={`dropdown-list-${key}`} />}
      </ClickableElementBinder>
    </ClickAwayListener>
  );
};

const NavigationBar = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState<'de' | 'en'>('en');
  const { resetDefaultUser } = useUser();
  const navigate = useNavigate();

  function languageChange() {
    i18next.changeLanguage(lang == 'en' ? 'de' : 'en');
    setLang(lang == 'en' ? 'de' : 'en');
  }

  const handleNavigate = (dest: string) => {
    navigate(dest);
  };

  const createLinks = () => {
    return (
      <>
        {Object.entries(APP_ROUTES).map(([key, value]) => {
          if(containsNot(key)) return null;

          switch (typeof value) {
            case 'string':
              return <SingleElement childKey={key} childValue={value} key={`route-single-${key}`} />;
            case 'object':
              return <DropdownElement childValue={value} childKey={key} key={`route-dropdown-${key}`} />;
          }
        })}
      </>
    );
  };

  return (
    <>
      <NavigationBarContainer>
        <LogoLinkButton onClick={() => handleNavigate(APP_ROUTES.home)}>
          <Logo src={dhbwLogo} />
        </LogoLinkButton>

        <LinkList>
          {createLinks()}
          {/*TODO: Add translation for German*/}
          <LanguageButton onClick={() => languageChange()}>{lang == 'en' ? 'English' : 'Deutsch'}</LanguageButton>
        </LinkList>
      </NavigationBarContainer>
      <Outlet />
      <GenericImprintNotice>
        <p>2025 DHBW Karlsruhe</p>
        <ResetButton onClick={resetDefaultUser}>{t('navigation.reset')}</ResetButton>
        <ListElement onClick={() => handleNavigate(APP_ROUTES.imprint)}>{t('navigation.imprint')}</ListElement>
      </GenericImprintNotice>
    </>
  );
};

export default NavigationBar;
