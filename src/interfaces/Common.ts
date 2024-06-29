import React from "react";
import { Locale } from "antd/es/locale-provider";

export interface IRegionItem {
  key: string;
  name: string;
  flag: string;
  antdLocale: Locale;
}

export interface IRegion {
  [key: string]: IRegionItem;
}

export interface IMap<T> {
  [key: string]: T;
}

export type AnyObject = IMap<any>;

export interface IPermission {
  resource: string;
  action: string;
}

export interface IRoute {
  exact?: boolean;
  path: string;
  name?: string;
  component?: React.ElementType;
  icon?: React.ComponentType<{ className?: string }>;
  children?: string[];
  origin?: string;
  permissions?: IPermission[];
}

export interface IBaseApiResponse<T> {
  code?: number;
  data?: T;
  message?: string;
  totalItems?: number;
}

export interface HeaderCSV {
  label: string;
  key: string;
  width?: string | number;
}

export type HeaderCSVs = HeaderCSV[];
