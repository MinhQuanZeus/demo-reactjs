import { AxiosError, AxiosResponse } from "axios";
import { promptError } from "helpers/notification";
import { browserHistory } from "browserHistory";
import { t } from "helpers/i18n";

export const handleResponseError = (error: AxiosError) => {
  const status = error && error.response && error.response.status;
  switch (status) {
    case 401:
      // TODO logout
      break;
    case 403:
      browserHistory.push("/403");
      break;
    default:
      let message = null;
      // Handle error message from API response
      if (error.response && error.response.data) {
        const { data } = error.response;
        // @ts-ignore
        message = data.message;
      }
      promptError(message || t("message.serverError"));
      break;
  }
};
export const getResponseData = (response: AxiosResponse) => response.data;
