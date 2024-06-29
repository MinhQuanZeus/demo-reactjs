import { IBaseApiResponse, ILogin, IUserLogin } from "interfaces";
import apiClient from "services/request";
import { API_ROUTES } from "constants/routes";
import { getResponseData } from "helpers/request";

const login = (data: ILogin): Promise<IBaseApiResponse<IUserLogin>> => apiClient.post(API_ROUTES.AUTH.LOGIN, data).then(getResponseData);

export default { login };
