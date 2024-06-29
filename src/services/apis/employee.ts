import { AnyObject, IBaseApiResponse } from "interfaces";
import apiClient from "services/request";
import { API_ROUTES } from "constants/routes";
import { getResponseData } from "helpers/request";
import { IImportEmployeeResponse } from "interfaces/Employee";

const importEmployee = (data: AnyObject): Promise<IBaseApiResponse<IImportEmployeeResponse>> =>
  apiClient.post(API_ROUTES.EMPLOYEES.IMPORT, data).then(getResponseData);

export default {
  importEmployee,
};
