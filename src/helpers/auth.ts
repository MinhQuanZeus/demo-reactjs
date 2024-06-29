import { IRoute } from "interfaces";
import { PERMISSION_ALL } from "constants/permission";

const permission = (resource: string, action?: string) => {
  return [resource, action].filter((x) => !!x).join(":");
};

export const checkPermission = (permissions: string[], resource: string, action?: string) => {
  const perform = permission(resource, action);
  const performAllAction = permission(resource, PERMISSION_ALL);
  const allPerforms = [perform, performAllAction];

  return !!(permissions && permissions.find((p) => allPerforms.includes(p)));
};

export const filterHasPermissions = (items: IRoute[], currentPermissions: string[]) => {
  return items.filter((item) => {
    const { permissions, children } = item;
    if (!permissions) return true;
    const intersection = permissions.find((x) => {
      const { resource, action } = x;
      if (children) {
        if (!currentPermissions) return false;
        return currentPermissions.some((p) => {
          return p.startsWith(permission(resource, action)) || p.startsWith(permission(resource, PERMISSION_ALL));
        });
      }
      return checkPermission(currentPermissions, resource, action);
    });
    return !!intersection;
  });
};
