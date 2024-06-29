import { IUserLogin } from "interfaces";
import { createContext } from "react";

interface StoreContextType {
  user?: IUserLogin;
}

const storeContextInitValue: StoreContextType = {
  user: undefined,
};

export const StoreContext = createContext<StoreContextType>(storeContextInitValue);
