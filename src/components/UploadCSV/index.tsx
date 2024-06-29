import React, { useEffect, useMemo, useState } from "react";
import { UploadChangeParam, UploadFile as UploadFileAntd } from "antd/lib/upload/interface";
import saveAs from "file-saver";
import { Button, Upload } from "antd";
import { CloudUploadOutlined, DeleteOutlined, FileOutlined } from "@ant-design/icons";

import { SectionStyled } from "./styles";
import { ArraySchema, ValidationError } from "yup";
import { parse, ParseResult } from "papaparse";
import lodash from "lodash";
import { AnyObject, HeaderCSVs } from "interfaces";
import ImportedDataTable from "components/UploadCSV/ImportedDataTable";
import { toObject } from "helpers/common";
import { extractYupErrorPath } from "helpers/yup";
import { promptSuccess } from "helpers/notification";
import { useTranslation } from "react-i18next";

interface Props {
  onSubmit?: (data: AnyObject[]) => Promise<any>;
  headerCSVs: HeaderCSVs;
  dataSchema: ArraySchema<AnyObject[] | undefined, AnyObject, "", "">;
  fileNameTemplate?: string;
  extValidate?: (dataImport: AnyObject[]) => Promise<AnyObject | undefined> | AnyObject | undefined;
  onSuccess?: (itemIdImported?: string[]) => void;
  afterImportItems?: (itemIdsImported: string[]) => Promise<any>;
  handleDataImport?: (dataImport: AnyObject[]) => AnyObject[];
}

const { Dragger } = Upload;

const convertCsvData = (data: Array<string[]>, headerCSVs: HeaderCSVs) => {
  const headerCsvObj = toObject(headerCSVs, "label");
  const headers = data[0];
  return data
    .map((item) => Object.fromEntries(headers.map((title, i) => [headerCsvObj[title]?.key || title, item[i] || undefined])))
    .splice(1);
};

const UploadCSV: React.FC<Props> = (props) => {
  const { onSubmit, headerCSVs, dataSchema, fileNameTemplate, extValidate, onSuccess, handleDataImport } = props;
  const { t } = useTranslation();
  const [importing, setImporting] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [dataImported, setDataImported] = useState<AnyObject[]>();
  const [headersImported, setHeadersImported] = useState<string[]>();
  const [yupErrors, setYupErrors] = useState<ValidationError>();
  const [extErrors, setExtErrors] = useState<AnyObject>();
  const [loading, setLoading] = useState<boolean>(false);

  const reset = () => {
    setFile(undefined);
    setDataImported(undefined);
    setHeadersImported(undefined);
    setYupErrors(undefined);
  };

  const errors = useMemo(() => {
    if (!yupErrors) {
      return extErrors;
    }
    let errorObj: AnyObject = extErrors || {};
    yupErrors.inner.forEach((error: any) => {
      const errorPath = extractYupErrorPath(error.path);
      errorObj = {
        ...errorObj,
        [errorPath.index]: {
          ...(errorObj[errorPath.index] || {}),
          [`${errorPath.key}_error`]: error.message,
        },
      };
    });

    return errorObj;
  }, [yupErrors, extErrors]);

  const dataSubmit = useMemo(() => {
    const indexErrors = Object.keys(errors || {}).map((idx) => Number(`${idx}`));
    const data = (dataImported || []).filter((_, index) => !indexErrors.includes(index));
    return handleDataImport ? handleDataImport(data) : data;
  }, [errors, dataImported]);

  const handleSubmit = async () => {
    try {
      setImporting(true);
      if (onSubmit) {
        await onSubmit(dataSubmit);
      }
      promptSuccess(t("message.importSuccess"));
      reset();
      onSuccess && onSuccess();
    } catch (e) {
      console.log(e);
    } finally {
      setImporting(false);
    }
  };

  const okProps = useMemo(() => {
    const diffHeaders = lodash.difference(
      headerCSVs.map((obj) => obj.label),
      headersImported || [],
    );
    if (!file || diffHeaders.length) {
      return {
        text: t("import"),
        disabled: true,
      };
    }
    const total = dataImported?.length || 0;
    const totalErrors = errors ? Object.keys(errors).length : 0;
    if (total === totalErrors) {
      return {
        text: t("import"),
        disabled: true,
      };
    }
    if (!totalErrors && total) {
      return {
        text: t("import"),
        disabled: false,
      };
    }
    return {
      text: t("importValidItems", { total, totalValid: total - totalErrors }),
      disabled: false,
    };
  }, [errors, dataImported, file, headersImported, headerCSVs]);

  const handleExportCSV = () => {
    const csvString = [headerCSVs.map(({ label }) => label)].map((e) => e.join(",")).join("\n");
    const bom = "\uFEFF";
    const fileExport = new Blob([bom, csvString], { type: "application/octet-stream" });
    saveAs(fileExport, `${t("template")}_${fileNameTemplate}.csv`);
  };

  const onFileChange = (info: UploadChangeParam<UploadFileAntd<File>>) => {
    setLoading(true);
    const inputFile = info.file as unknown as File;
    setFile(inputFile);
    parse(inputFile, {
      complete: async ({ data }: ParseResult<string[]>) => {
        const resultsDataCSV = convertCsvData(data, headerCSVs);
        setDataImported(resultsDataCSV);
        setHeadersImported(data[0]);
        try {
          await dataSchema.validate(resultsDataCSV, {
            abortEarly: false,
          });
        } catch (err) {
          if (err instanceof ValidationError) {
            setYupErrors(err);
          }
        } finally {
          setLoading(false);
        }
      },
      skipEmptyLines: true,
    });
  };

  const handleExtErrors = async () => {
    if (!dataImported || !dataImported.length || !extValidate) {
      return;
    }
    setExtErrors(undefined);
    setLoading(true);
    const errs = await extValidate(dataImported);
    setExtErrors(errs);
    setLoading(false);
  };

  useEffect(() => {
    handleExtErrors();
  }, [dataImported, extValidate]);

  return (
    <SectionStyled>
      <div className="form-upload">
        <p className="text-download-template" onClick={handleExportCSV}>
          <FileOutlined className="icon" />
          {t("downloadTemplate")}
        </p>
        <div className="form-upload-border">
          <div className="file-upload">
            <div className="flex">
              <Dragger accept=".csv" beforeUpload={() => false} onChange={onFileChange}>
                {file ? (
                  <div className="info-file">
                    <p className="name-file">{file.name} </p>
                  </div>
                ) : (
                  <>
                    <CloudUploadOutlined className="icon" />
                    <p className="ant-upload-text">{t("dropCsv")}</p>
                  </>
                )}
                <div className="wrap-button-upload">
                  <button type="button" className="btn-upload">
                    {t("selectFile")}
                  </button>
                  {file && (
                    <button
                      className="btn-delete"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        reset();
                      }}
                    >
                      <DeleteOutlined className="icon-delete-outlined" />
                      <span className="text-delete-outlined">{t("deleteFile")}</span>
                    </button>
                  )}
                </div>
              </Dragger>
            </div>
          </div>
        </div>
        <ImportedDataTable
          headerCSVs={headerCSVs}
          attached={!!file}
          dataImported={dataImported}
          headersImported={headersImported}
          errors={errors}
          loading={loading}
          fileNameTemplate={fileNameTemplate}
        />
      </div>
      <div className="button-groups">
        <Button loading={importing} type="primary" disabled={okProps.disabled} size="large" onClick={handleSubmit}>
          {okProps.text}
        </Button>
      </div>
    </SectionStyled>
  );
};

export default UploadCSV;
