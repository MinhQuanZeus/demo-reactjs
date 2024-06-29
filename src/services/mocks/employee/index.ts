import importEmployee from "./json/importEmployee.json";
import { API_ROUTES } from "constants/routes";
import { AnyObject } from "interfaces";

const mockEmployee = (mock: any) => {
  mock.onPost(API_ROUTES.EMPLOYEES.IMPORT).reply((data: AnyObject) => {
    return [200, importEmployee];
  });
};

export default mockEmployee;
