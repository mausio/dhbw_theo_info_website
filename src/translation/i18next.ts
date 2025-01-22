import i18next from 'i18next';

import deutsch from './deutsch.json';
import english from './english.json';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: english,
  },
  de: {
    translation: deutsch,
  },
};

i18next.use(initReactI18next).init({ resources, lng: 'en' });

export default i18next;
