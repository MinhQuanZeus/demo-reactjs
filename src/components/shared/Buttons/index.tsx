import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  ClearOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
  SaveOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  UnorderedListOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ButtonProps } from "antd/lib/button";
import { t } from "helpers/i18n";
import { browserHistory } from "browserHistory";
import { ROUTES } from "constants/routes";

export type SharedButtonProps = ButtonProps & { contentName?: string };

/* Common Buttons */
export const DefaultButton: React.FC<SharedButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const PrimaryButton: React.FC<SharedButtonProps> = ({ contentName, children, ...rest }) => (
  <Button type="primary" {...rest}>
    {children}
  </Button>
);

export const LinkButton: React.FC<SharedButtonProps> = ({ children, ...rest }) => (
  <Button type="link" {...rest}>
    {children}
  </Button>
);

/* Customized Buttons */
export const AddButton: React.FC<SharedButtonProps> = ({ children = t("AddNew"), ...rest }) => (
  <PrimaryButton data-testid="btn-add" icon={<PlusOutlined />} {...rest}>
    {children}
  </PrimaryButton>
);

export const SearchButton: React.FC<SharedButtonProps> = ({ children = t("search"), ...rest }) => (
  <PrimaryButton data-testid="btn-search" htmlType="submit" icon={<SearchOutlined />} {...rest}>
    {children}
  </PrimaryButton>
);

export const RefreshButton: React.FC<SharedButtonProps> = ({ children = t("refresh"), ...rest }) => (
  <DefaultButton data-testid="btn-refresh" icon={<SyncOutlined />} {...rest}>
    {children}
  </DefaultButton>
);

export const ClearButton: React.FC<SharedButtonProps> = ({ children = t("clear"), ...rest }) => (
  <DefaultButton data-testid="btn-clear" icon={<ClearOutlined />} {...rest}>
    {children}
  </DefaultButton>
);

export const DownloadButton: React.FC<SharedButtonProps> = ({ children = t("Download"), ...rest }) => (
  <DefaultButton data-testid="btn-download" icon={<DownloadOutlined />} {...rest}>
    {children}
  </DefaultButton>
);

export const ImportButton: React.FC<SharedButtonProps> = ({ children = "Import", ...rest }) => (
  <PrimaryButton data-testid="btn-import" icon={<UploadOutlined />} {...rest}>
    {children}
  </PrimaryButton>
);

export const ReturnButton: React.FC<SharedButtonProps> = ({ children = t("Return"), ...rest }) => (
  <DefaultButton data-testid="btn-return" icon={<RollbackOutlined />} {...rest}>
    {children}
  </DefaultButton>
);

export const BackButton: React.FC<SharedButtonProps> = ({ children = t("Back"), ...rest }) => (
  <ReturnButton data-testid="btn-back" onClick={() => browserHistory.back()} {...rest}>
    {children}
  </ReturnButton>
);

export const SaveButton: React.FC<SharedButtonProps> = ({ children = t("save"), ...rest }) => (
  <PrimaryButton htmlType="submit" data-testid="btn-save" icon={<SaveOutlined />} {...rest}>
    {children}
  </PrimaryButton>
);

export const CancelButton: React.FC<SharedButtonProps> = ({ children = t("cancel"), ...rest }) => (
  <DefaultButton data-testid="btn-cancel" {...rest}>
    {children}
  </DefaultButton>
);

export const NextButton: React.FC<SharedButtonProps> = ({ children = t("Next"), ...rest }) => (
  <PrimaryButton data-testid="btn-next" {...rest}>
    {children}
  </PrimaryButton>
);

export const PrevButton: React.FC<SharedButtonProps> = ({ children = t("Previous"), ...rest }) => (
  <DefaultButton data-testid="btn-prev" {...rest}>
    {children}
  </DefaultButton>
);

export const EditButton: React.FC<SharedButtonProps> = ({ children = t("Edit"), ...rest }) => (
  <PrimaryButton data-testid="btn-edit" icon={<EditOutlined />} {...rest}>
    {children}
  </PrimaryButton>
);

export const DeleteButton: React.FC<SharedButtonProps> = ({ children = t("delete"), ...rest }) => (
  <PrimaryButton title={t("delete")} data-testid="btn-remove" icon={<MinusCircleOutlined />} danger {...rest}>
    {children}
  </PrimaryButton>
);

export const InactiveButton: React.FC<SharedButtonProps> = ({ children = t("Inactive"), ...rest }) => (
  <DefaultButton data-testid="btn-inactive" icon={<CloseCircleOutlined />} {...rest}>
    {children}
  </DefaultButton>
);

export const ListButton: React.FC<SharedButtonProps> = ({ children = t("List"), ...rest }) => (
  <DefaultButton data-testid="btn-list" icon={<UnorderedListOutlined />} {...rest}>
    {children}
  </DefaultButton>
);

export const BackToHomeButton: React.FC<SharedButtonProps> = (props) => (
  <Link to={ROUTES.HOME}>
    <PrimaryButton icon={<HomeOutlined />} {...props}>
      {t("backToHome")}
    </PrimaryButton>
  </Link>
);

export const LogoutButton: React.FC<SharedButtonProps> = (props) => (
  <Button icon={<LogoutOutlined />} {...props}>
    {t("logout")}
  </Button>
);

export const SettingsButton: React.FC<SharedButtonProps> = (props) => (
  <DefaultButton data-testid="btn-settings" icon={<SettingOutlined />} {...props}>
    {t("Settings")}
  </DefaultButton>
);

export const ExportButton: React.FC<SharedButtonProps> = ({ children = "", ...rest }) => (
  <PrimaryButton data-testid="btn-export" icon={<DownloadOutlined />} {...rest}>
    {t("Export")}
  </PrimaryButton>
);
