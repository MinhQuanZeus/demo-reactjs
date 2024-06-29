import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { IRoute } from "interfaces";

const { Content } = Layout;

interface AppContentProps {
  filteredRoutes: IRoute[];
}

const AppContent: React.FC<AppContentProps> = (props) => {
  const { filteredRoutes } = props;
  return (
    <Content className="app-content">
      <Suspense fallback={null}>
        <Routes>
          {filteredRoutes.map(({ component: Component, ...rest }) => {
            return <Route {...rest} key={rest.path} element={<>{Component && <Component />}</>} />;
          })}
        </Routes>
      </Suspense>
    </Content>
  );
};

export default AppContent;
