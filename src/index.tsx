import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { REGIONS } from "constants/localization";
import { I18nextProvider } from "react-i18next";
import i18n from "i18n";
import { ConfigProvider } from "antd";
import { getCurrentLanguage } from "helpers/localization";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <I18nextProvider i18n={i18n}>
    <ConfigProvider locale={REGIONS[getCurrentLanguage()].antdLocale}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      ,
    </ConfigProvider>
  </I18nextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
