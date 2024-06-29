import React from "react";
import { Divider, Skeleton, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { browserHistory } from "browserHistory";

const { Title } = Typography;

interface AppContainerProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  hasBack?: boolean;
  loading?: boolean;
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const { title, className, children, hasBack, loading } = props;

  return (
    <div className="app-container">
      <div className="app-container-head flex">
        {hasBack && <ArrowLeftOutlined className="mr-2 cursor-pointer" onClick={() => browserHistory.back()} />}
        <Title className="app-title" level={4}>
          {title}
        </Title>
      </div>
      <Divider orientationMargin={0} style={{ margin: 0 }} />
      {loading && <Skeleton className="p-4" active />}
      {children && !loading && (
        <div
          className={classNames({
            "app-container-body": true,
            ...(className && { [className]: true }),
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AppContainer;
