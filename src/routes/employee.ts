import { lazy } from "react";
import { PERMISSION_ACTIONS, PERMISSION_RESOURCES } from "constants/permission";
import { IRoute } from "interfaces";
import { UserOutlined } from "@ant-design/icons";
import { ROUTES } from "constants/routes";
import { t } from "helpers/i18n";

const { READ, CREATE, IMPORT } = PERMISSION_ACTIONS;
const { EMPLOYEES } = ROUTES;
const permission = (action: string) => ({
  resource: PERMISSION_RESOURCES.EMPLOYEES,
  action,
});

// Employee pages
const EmployeeCreate = lazy(() => import("containers/Employee/EmployeeCreate"));
const EmployeeList = lazy(() => import("containers/Employee/EmployeeList"));
const EmployeeImport = lazy(() => import("containers/Employee/EmployeeImport"));

const employeeRoutes: IRoute[] = [
  {
    name: t("employee"),
    path: EMPLOYEES.ROOT,
    icon: UserOutlined,
    children: [EMPLOYEES.LIST, EMPLOYEES.IMPORT],
    permissions: [permission(READ), permission(CREATE), permission(IMPORT)],
  },
  {
    name: t("employeeList"),
    path: EMPLOYEES.LIST,
    component: EmployeeList,
    permissions: [permission(READ)],
  },
  {
    name: t("importEmployee"),
    path: EMPLOYEES.IMPORT,
    component: EmployeeImport,
    permissions: [permission(IMPORT)],
  },
  {
    name: t("createEmployee"),
    path: EMPLOYEES.CREATE,
    component: EmployeeCreate,
    permissions: [permission(CREATE)],
  },
];

export default employeeRoutes;
