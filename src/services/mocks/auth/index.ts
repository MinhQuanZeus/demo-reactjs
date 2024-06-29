import loginData from "./json/login.json";
import { API_ROUTES } from "constants/routes";

const mockAuth = (mock: any) => {
  mock.onPost(API_ROUTES.AUTH.LOGIN).reply((data: any) => {
    return [200, loginData];
  });
};

export default mockAuth;
