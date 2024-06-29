import { IRoute } from "interfaces";
import { useContext } from "react";
import { filterHasPermissions } from "helpers/auth";
import { StoreContext } from "contexts";

export const useAuthorizationData = (items: IRoute[]) => {
  const { user } = useContext(StoreContext);

  // Get navigation which match permissions to build menu
  const filteredNavigation = filterHasPermissions(items, user?.permissions || []);

  // Only get routes which is link to a component
  const filteredRoutes = filteredNavigation.filter((item) => !item.children && item.component);

  return {
    filteredNavigation,
    filteredRoutes,
  };
};
