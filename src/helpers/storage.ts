import { LOCAL_STORAGE_KEYS } from "constants/storage";

export const getAccessToken = () => {
  return sessionStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || "";
};

export const saveAccessToken = (token: string) => {
  sessionStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token || "");
};
