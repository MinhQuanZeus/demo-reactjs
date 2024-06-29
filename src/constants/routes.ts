export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
  },
  EMPLOYEES: {
    ROOT: "/employees",
    LIST: "/employees/list",
    CREATE: "/employees/create",
    IMPORT: "/employees/import",
  },
  PERMISSIONS: {
    ROOT: "/permissions",
    LIST: "/permissions/list",
    CREATE: "/permissions/create",
  },
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: "v1/auth/login",
  },
  EMPLOYEES: {
    IMPORT: "v1/employee/import",
  },
};
