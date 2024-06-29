// Flags
import viFlag from "assets/images/flags/vi.svg";
import enFlag from "assets/images/flags/en.svg";
// Text translation files
import viTrans from "locales/vi/translation.json";
import enTrans from "locales/en/translation.json";
// Antd locale files
import viVN from "antd/lib/locale/vi_VN";
import enUS from "antd/lib/locale/en_US";
import { IRegion } from "interfaces";

export const RESOURCES = {
  vi: { translation: viTrans },
  en: { translation: enTrans },
};

export const REGIONS: IRegion = {
  vi: {
    key: "vi",
    name: "Tiếng Việt",
    flag: viFlag,
    antdLocale: viVN,
  },
  en: {
    key: "en",
    name: "English",
    flag: enFlag,
    antdLocale: enUS,
  },
};

export default {
  RESOURCES,
  REGIONS,
};
