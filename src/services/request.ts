import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { handleResponseError } from "helpers/request";
import applyMockAdapter from "services/mocks";
import { getAccessToken } from "helpers/storage";

const API_BASE_URL = process.env.API_URL;
const isMockApi = process.env.REACT_APP_RUN_MOCK === "1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getAuthorization = () => {
  return `Bearer ${getAccessToken()}`;
};

// Do something before request is sent
const requestInterceptor = (request: InternalAxiosRequestConfig) => {
  if (request.headers && !request.headers.Authorization) {
    request.headers.Authorization = getAuthorization();
  }
  return request;
};

const responseErrorInterceptor = (error: AxiosError) => {
  // Do something with response error
  if (!axios.isCancel(error)) {
    handleResponseError(error);
  }
  return Promise.reject(error);
};

// Any status code that lie within the range of 2xx cause this function to trigger
const responseSuccessInterceptor = (response: AxiosResponse) => {
  // Do something with response data
  return response;
};

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

if (isMockApi) {
  applyMockAdapter(apiClient);
}

export default apiClient;
