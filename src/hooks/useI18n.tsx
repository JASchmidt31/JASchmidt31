import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import de from '../../locales/de.json';
import en from '../../locales/en.json';

let initialized = false;

const useI18n = () => {
  useEffect(() => {
    if (!initialized) {
      i18n.use(initReactI18next).init({
        resources: {
          en: { translation: en },
          de: { translation: de }
        },
        lng: 'de',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        }
      });
      initialized = true;
    }
  }, []);
};

export default useI18n;
