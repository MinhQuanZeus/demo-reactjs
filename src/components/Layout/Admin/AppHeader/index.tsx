import React, { useContext } from "react";
import { Avatar, Layout } from "antd";
import defaultAvatar from "assets/images/defaultAvatar.png";
import classNames from "classnames";
import { StoreContext } from "contexts";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader: React.FC<{ onClickSiderIcon: () => void }> = ({ onClickSiderIcon }) => {
  const { user } = useContext(StoreContext);

  return (
    <Header
      className={classNames({
        "app-header": true,
      })}
    >
      <MenuOutlined data-testid="sider-icon" className="app-icon" onClick={onClickSiderIcon} />
      <span className="app-user">
        <Avatar src={defaultAvatar} />
        <span className="label">{`${user?.firstName} ${user?.lastName}`}</span>
      </span>
    </Header>
  );
};

export default AppHeader;
