import localizationConstants from "constants/localization";
import { LOCAL_STORAGE_KEYS } from "constants/storage";

const { LOCALIZATION } = LOCAL_STORAGE_KEYS;
const { REGIONS } = localizationConstants;

export const getCurrentLanguage = () => {
  return localStorage.getItem(LOCALIZATION) || REGIONS.vi.key;
};

export const changeLanguage = (language: string) => {
  if (language === getCurrentLanguage()) return;
  localStorage.setItem(LOCALIZATION, language);
  window.location.reload();
};
