import React from "react";
import { Result } from "antd";
import { t } from "helpers/i18n";
import { BackToHomeButton, LogoutButton } from "components/shared/Buttons";

const Page403: React.FC = () => {
  return (
    <Result
      className="app-result-page"
      status="404"
      title="404"
      subTitle={t("pageNotFound")}
      extra={
        <>
          <BackToHomeButton className="mr-half" />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page403;
