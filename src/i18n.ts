import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { REGIONS, RESOURCES } from "constants/localization";

i18n.use(initReactI18next).init({
  resources: RESOURCES,
  lng: REGIONS.en.key,
  fallbackLng: REGIONS.en.key,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
