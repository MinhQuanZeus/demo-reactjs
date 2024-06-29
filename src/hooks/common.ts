import { getWindowDimensions } from "helpers/common";
import { useEffect, useState } from "react";
import { TABLET_WIDTH } from "constants/common";
import { IRoute } from "interfaces";
import { useLocation } from "react-router-dom";

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ...dimensions, isTabletView: dimensions.width <= TABLET_WIDTH };
};

export const useAppMenu = (items: IRoute[], collapsed: boolean) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const location = useLocation();
  let selectedKey = location.pathname;
  const selectedKeySplitArr = location.pathname.split("/");
  let i = 1;
  let newSelectedKey = "";

  const getParentKey = (key: string): IRoute | undefined => {
    const newParentKey = items.find((item) => item.children && item.children.includes(key));
    if (newParentKey) return newParentKey;
    else if (i < selectedKeySplitArr.length) {
      newSelectedKey += `/${selectedKeySplitArr[i++]}`;
      selectedKey = newSelectedKey;
      return getParentKey(selectedKey);
    }
  };
  useEffect(() => {
    const parentKey = getParentKey(selectedKey);
    const openKey = parentKey ? parentKey.path : "/";
    setOpenKeys([openKey]);
  }, [location, items, collapsed]);

  return { selectedKey, openKeys, onOpenChange };
};
