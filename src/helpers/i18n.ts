import i18n from "i18n";
import { AnyObject } from "interfaces/Common";
import { capitalJoin } from "helpers/string";
import { TOptions } from "i18next/typescript/options";

export const t = (text: string, options?: AnyObject) => i18n.t<string, TOptions, string>(text, options || {});

export const translate = (...args: string[]) => {
  return capitalJoin(...args.map((text) => t(text)));
};

export const tInputPlaceholder = (name: string, originFormat: boolean = false) =>
  t("inputPlaceholder", {
    name: originFormat ? t(name) : t(name).toLowerCase(),
  });

export const tRequired = (name: string, originFormat: boolean = true) =>
  t("message.required", {
    name: originFormat ? t(name) : t(name).toLowerCase(),
  });

export const tHaftWidthLatin = (name: string, originFormat: boolean = true) =>
  t("message.halfWidthLatin", {
    name: originFormat ? t(name) : t(name).toLowerCase(),
  });

export const tInvalidFormat = (name: string, originFormat: boolean = true) =>
  t("message.fieldInvalidFormat", {
    name: originFormat ? t(name) : t(name).toLowerCase(),
  });

export const tDateInvalidFormat = (name: string, dateFormat: string, originFormat: boolean = true) =>
  t("message.dateInvalidFormat", {
    name: originFormat ? t(name) : t(name).toLowerCase(),
    format: dateFormat,
  });

export const tMaxLength = (maxLength: number) =>
  t("message.maxLength", {
    maxLength,
  });

export const tMinLength = (minLength: number) =>
  t("message.minLength", {
    minLength,
  });

export const tSelectPlaceholder = (text: string, originFormat: boolean = false) =>
  t("selectPlaceholder", {
    name: originFormat ? t(text) : t(text).toLowerCase(),
  });
