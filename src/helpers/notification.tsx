import React from "react";
import { Modal, notification } from "antd";
import { t } from "helpers/i18n";

export const promptSuccess = (message: string, title: string = t("success")) => {
  notification.success({
    message: title,
    description: message,
  });
};

export const promptError = (message: string, title: string = t("error")) => {
  notification.error({
    message: title,
    description: message,
  });
};

export const promptWarning = (message: string | React.ReactNode, title: string = t("Warning")) => {
  notification.warning({
    message: title,
    description: message,
  });
};

export const promptInfo = (message: string, title: string = t("Notification")) => {
  notification.info({
    message: title,
    description: message,
  });
};

export function showModalError(message: string | Error, isReload = false) {
  if (message instanceof Error && message.message === "Failed to fetch") {
    message.message = t("message.failedToFetch");
  }

  Modal.error({
    title: message instanceof Error ? message.message : message,
    className: "modal-error",
    centered: true,
    width: 650,
    okButtonProps: {
      className: "text-center",
    },
    onOk() {
      if (isReload) {
        window.location.reload();
      }
      return;
    },
  });
}
