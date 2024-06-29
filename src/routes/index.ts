import { lazy } from "react";
import { IRoute } from "interfaces";
import { t } from "helpers/i18n";
import { ROUTES } from "constants/routes";
import { HomeOutlined } from "@ant-design/icons";
import employeeRoutes from "routes/employee";
import permissionRoutes from "routes/permission";

const Home = lazy(() => import("containers/Home"));

const routes: IRoute[] = [
  {
    exact: true,
    path: ROUTES.HOME,
    name: t("Home"),
    component: Home,
    icon: HomeOutlined,
  },
  ...employeeRoutes,
  ...permissionRoutes,
];

export default routes;
