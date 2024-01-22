import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import * as languages from './languages';

void i18n
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: languages.en,
      'en-US': languages.enUS,
      'pt-BR': languages.ptBR,
      'pt-PT': languages.pt,
    },
    fallbackLng: 'pt',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
