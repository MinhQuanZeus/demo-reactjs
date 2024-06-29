import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, MenuProps } from "antd";
import classNames from "classnames";
import { IRoute } from "interfaces";
import { useAppMenu } from "hooks/common";
import { ROUTES } from "constants/routes";
import { MenuInfo } from "rc-menu/lib/interface";

const { Sider, Footer } = Layout;

interface AppSiderProps {
  filteredNavigation: IRoute[];
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AppSider: React.FC<AppSiderProps> = (props) => {
  const navigate = useNavigate();
  // Get selectedKey, openKey from route & pathname
  const { filteredNavigation, collapsed } = props;

  const { selectedKey, openKeys, onOpenChange } = useAppMenu(filteredNavigation, collapsed);

  const items: MenuProps["items"] = useMemo(() => {
    return filteredNavigation
      .map((item) => {
        if (!item.icon) return null;
        const childs = !!item.children
          ? filteredNavigation
              .filter((child) => item.children?.includes(child.path!) && !child.children)
              .map((childRoute) => ({
                key: childRoute.path,
                label: childRoute.name,
              }))
          : undefined;
        return {
          key: item.path,
          label: item.name,
          children: childs,
          icon: item.icon ? <item.icon /> : undefined,
        };
      })
      .filter((obj) => !!obj);
  }, [filteredNavigation]);

  const onNavigate = (data: MenuInfo) => {
    navigate(data.key);
  };

  return (
    <Sider
      className={classNames({
        "app-sider": true,
        collapsed,
      })}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200}
    >
      <div className="app-logo">
        <Link to={ROUTES.HOME}>
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>

      <Menu
        className="app-menu"
        theme="light"
        mode="inline"
        openKeys={[selectedKey, ...openKeys]}
        selectedKeys={[selectedKey]}
        items={items}
        onClick={onNavigate}
        onOpenChange={onOpenChange}
      />

      {!collapsed && <Footer className="app-footer">QuanTM © {process.env.REACT_APP_VERSION}</Footer>}
    </Sider>
  );
};

export default AppSider;
