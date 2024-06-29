import React from "react";
import AppContainer from "components/Layout/Admin/AppContainer";
import { useTranslation } from "react-i18next";
import UploadCSV from "components/UploadCSV";
import { HEADER_IMPORT_EMPLOYEE_CSV } from "constants/import";
import { importEmployeeCsvSchema } from "schemas";
import { AnyObject } from "interfaces";
import { employeeServices } from "services";
import lodash from "lodash";

const EmployeeImport: React.FC = () => {
  const { t } = useTranslation();

  // customize data before import
  const handleDataImport = (dataImport: AnyObject[]) => {
    return dataImport;
  };

  // handle customize validate
  const externalValidation = async (dataImport: AnyObject[]) => {
    // check duplicate email or call server api check duplicate email in Database
    let duplicatedEmails = lodash.filter(
      lodash.uniq(
        lodash.map(dataImport, function (item) {
          if (lodash.filter(dataImport, { email: item.email }).length > 1) {
            return item.email;
          }

          return false;
        }),
      ),
      function (value) {
        return value;
      },
    );

    return dataImport
      .map((obj, idx) => ({ ...obj, idx }))
      .filter((obj: AnyObject) => duplicatedEmails.includes(obj.email))
      .reduce(
        (obj, item: AnyObject) => ({
          ...obj,
          [item.idx]: {
            email_error: duplicatedEmails.includes(item.email) ? t("message.emailExisted") : undefined,
          },
        }),
        {},
      );
  };

  const onSubmit = async (dataImport: AnyObject[]) => {
    return await employeeServices.importEmployee(dataImport);
  };
  return (
    <AppContainer title={t("importEmployee")}>
      <UploadCSV
        headerCSVs={HEADER_IMPORT_EMPLOYEE_CSV}
        dataSchema={importEmployeeCsvSchema}
        fileNameTemplate={t("importEmployee")}
        onSubmit={onSubmit}
        handleDataImport={handleDataImport}
        extValidate={externalValidation}
      />
    </AppContainer>
  );
};

export default EmployeeImport;
