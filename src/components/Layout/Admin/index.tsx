import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { IRoute } from "interfaces";
import AppSider from "./AppSider";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import "./AdminLayout.scss";
import { useAuthorizationData } from "hooks/auth";
import routes from "routes";
import { useWindowDimensions } from "hooks/common";

let autoCollapseSider = true;

/**
 * This container is for lifting-up the `AppContent` to the parent node,
 * so we can avoid unnecessary re-calculation when resizing window
 * */
const AppLayoutContainer: React.FC<{
  filteredNavigation: IRoute[];
  children?: React.ReactNode;
}> = ({ children, filteredNavigation }) => {
  const { isTabletView } = useWindowDimensions();
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = () => {
    autoCollapseSider = false;
    setSiderCollapsed((collapsed) => !collapsed);
  };

  useEffect(() => {
    if (autoCollapseSider) {
      setSiderCollapsed(isTabletView);
    }
  }, [isTabletView]);

  return (
    <Layout className="app-layout">
      <AppSider filteredNavigation={filteredNavigation} collapsed={siderCollapsed} setCollapsed={setSiderCollapsed} />
      <Layout>
        <AppHeader onClickSiderIcon={toggleSider} />
        {children}
      </Layout>
    </Layout>
  );
};

const AdminLayout: React.FC = () => {
  const { filteredRoutes, filteredNavigation } = useAuthorizationData(routes);

  return (
    <AppLayoutContainer filteredNavigation={filteredNavigation}>
      <AppContent filteredRoutes={filteredRoutes} />
    </AppLayoutContainer>
  );
};

export default AdminLayout;
