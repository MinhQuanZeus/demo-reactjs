import * as yup from "yup";
import { REGEX_HALF_WIDTH_LATIN } from "constants/regex";
import { DATE_FORMAT, YEAR_MONTH_FORMAT } from "constants/date";
import dayjs from "dayjs";
import { tDateInvalidFormat, tHaftWidthLatin, tInvalidFormat, tMaxLength, tMinLength, tRequired } from "helpers/i18n";

export const importEmployeeCsvSchema = yup.array().of(
  yup.object().shape({
    employeeCode: yup
      .string()
      .required(tRequired("Code"))
      .max(10, tMaxLength(10))
      .matches(REGEX_HALF_WIDTH_LATIN, {
        message: tHaftWidthLatin("Code"),
      }),
    name: yup.string().required(tRequired("Name")).max(100, tMaxLength(100)),
    departmentCode: yup
      .string()
      .required(tRequired("Department code"))
      .max(10, tMaxLength(10))
      .matches(REGEX_HALF_WIDTH_LATIN, {
        message: tHaftWidthLatin("Department code"),
      }),
    positionCode: yup
      .string()
      .required(tRequired("Position code"))
      .max(10, tMaxLength(10))
      .matches(REGEX_HALF_WIDTH_LATIN, {
        message: tHaftWidthLatin("Position code"),
      }),
    birthday: yup
      .string()
      .max(10, tMaxLength(10))
      .test("Birthday", tDateInvalidFormat("Birthday", DATE_FORMAT), (value) => !value || dayjs(value, DATE_FORMAT, true).isValid()),
    hireDate: yup
      .string()
      .max(7, tMaxLength(7))
      .test(
        "Hire date",
        tDateInvalidFormat("Hire date", YEAR_MONTH_FORMAT),
        (value) => !value || dayjs(value, YEAR_MONTH_FORMAT, true).isValid(),
      ),
    roleCode: yup
      .string()
      .required(tRequired("Role code"))
      .max(9, tMaxLength(9))
      .matches(REGEX_HALF_WIDTH_LATIN, {
        message: tHaftWidthLatin("Role code"),
      }),
    email: yup.string().email(tInvalidFormat("Email")).required(tRequired("Email")).max(300, tMaxLength(300)),
    password: yup
      .string()
      .required(tRequired("Password"))
      .max(30, tMaxLength(30))
      .min(4, tMinLength(4))
      .matches(REGEX_HALF_WIDTH_LATIN, {
        message: tHaftWidthLatin("Password"),
      }),
  }),
);
