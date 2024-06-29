import { lazy } from "react";
import { PERMISSION_ACTIONS, PERMISSION_RESOURCES } from "constants/permission";
import { ROUTES } from "constants/routes";
import { IRoute } from "interfaces";
import { t } from "helpers/i18n";
import { SettingOutlined } from "@ant-design/icons";

const { READ, CREATE } = PERMISSION_ACTIONS;
const { PERMISSIONS } = ROUTES;

const permission = (action: string) => ({
  resource: PERMISSION_RESOURCES.PERMISSIONS,
  action,
});

const PermissionList = lazy(() => import("containers/Permission/PermissionList"));
const PermissionCreate = lazy(() => import("containers/Permission/PermissionCreate"));

const permissionRoutes: IRoute[] = [
  {
    name: t("permissionManagement"),
    path: PERMISSIONS.ROOT,
    icon: SettingOutlined,
    children: [PERMISSIONS.LIST, PERMISSIONS.CREATE],
    permissions: [permission(READ), permission(CREATE)],
  },
  {
    name: t("permissionList"),
    path: PERMISSIONS.LIST,
    component: PermissionList,
    permissions: [permission(READ)],
  },
  {
    name: t("createPermission"),
    path: PERMISSIONS.CREATE,
    component: PermissionCreate,
    permissions: [permission(CREATE)],
  },
];

export default permissionRoutes;
