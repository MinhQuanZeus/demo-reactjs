import React, { lazy, useEffect } from "react";
import "./App.scss";
import { StoreContext } from "contexts";
import { authServices } from "services";
import { IUserLogin } from "interfaces";
import { browserHistory } from "browserHistory";
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import AdminLayout from "components/Layout/Admin";

const Page500 = lazy(() => import("containers/Errors/Page500"));
const Page404 = lazy(() => import("containers/Errors/Page404"));
const Page403 = lazy(() => import("containers/Errors/Page403"));

function App() {
  const [user, setUser] = React.useState<IUserLogin>();
  const login = async () => {
    const response = await authServices.login({ email: "", password: "" });
    setUser(response.data);
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <StoreContext.Provider value={{ user }}>
      <HistoryRouter history={browserHistory as any}>
        <Routes>
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/*" element={<AdminLayout />} />
        </Routes>
      </HistoryRouter>
    </StoreContext.Provider>
  );
}

export default App;
