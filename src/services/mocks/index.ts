import MockAdapter from "axios-mock-adapter";
import { AxiosInstance } from "axios";
import mockAuth from "./auth";
import mockEmployee from "./employee";

export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance);
  mockAuth(mock);
  mockEmployee(mock);
}
