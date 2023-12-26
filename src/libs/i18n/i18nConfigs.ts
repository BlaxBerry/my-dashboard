import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { APP_SUPPORTED_LANGUAGE_DEFAULT } from "@/utils/constants";
import translationEn from "./locales/en.json";
import translationJa from "./locales/ja.json";
import translationZh from "./locales/zh.json";

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources: {
      en: { translation: translationEn },
      ja: { translation: translationJa },
      zh: { translation: translationZh },
    },

    lng: APP_SUPPORTED_LANGUAGE_DEFAULT,
    fallbackLng: APP_SUPPORTED_LANGUAGE_DEFAULT,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    /*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
  });

export default i18n;
