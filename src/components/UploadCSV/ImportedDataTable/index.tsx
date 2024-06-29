import React, { useEffect, useMemo, useState } from "react";
import { SectionStyled } from "./styles";
import { Tooltip, Typography } from "antd";
import _ from "lodash";
import { ColumnsType } from "antd/es/table";
import { IconCsvError } from "assets";
import ResizeObserver from "rc-resize-observer";
import { AnyObject, HeaderCSVs } from "interfaces";
import { DEFAULT_TABLE_COL_WIDTH } from "constants/common";
import { exportCsv } from "helpers/export";
import classNames from "classnames";
import VirtualTable from "components/shared/VirtualTable";
import { useTranslation } from "react-i18next";
import { tRequired } from "helpers/i18n";

interface ImportedDataTableProps {
  attached?: boolean;
  headerCSVs: HeaderCSVs;
  dataImported?: AnyObject[];
  headersImported?: string[];
  errors?: AnyObject;
  loading?: boolean;
  fileNameTemplate?: string;
}

const DEFAULT_TABLE_ITEMS = 13;

const ImportedDataTable: React.FC<ImportedDataTableProps> = (props) => {
  const { loading, attached, headerCSVs, errors, dataImported, fileNameTemplate, headersImported } = props;

  const { t } = useTranslation();

  const [dataSource, setDataSource] = useState<any>([]);
  const [headerErrors, setHeaderErrors] = useState<string[]>([]);
  const [showOnlyError, setShowOnlyError] = useState<boolean>(false);
  const [lineErrors, setLineErrors] = useState<number>(0);
  const [tableWidth, setTableWidth] = useState(1920);

  const columns: ColumnsType<AnyObject> = useMemo(() => {
    const totalColumns = (headerCSVs || []).length || 1;
    const calColWidth = Math.ceil((tableWidth - 70) / totalColumns);
    const colWidth = calColWidth > DEFAULT_TABLE_COL_WIDTH ? calColWidth : DEFAULT_TABLE_COL_WIDTH;
    return [
      {
        title: <div className="table-header-cell">{t("lineIndex")}</div>,
        width: 70,
        dataIndex: "index",
        render: (value, row) => {
          return (
            <div
              className={classNames("virtual-table-cell", "h-full", {
                "virtual-table-cell-last": !headerCSVs.length,
              })}
            >
              <div className="rowNumber">
                {row.hasError && (
                  <Tooltip
                    title={t("lineHasError")}
                    color="#ffffff"
                    placement="bottomLeft"
                    overlayInnerStyle={{
                      backgroundColor: "#FFFFFF",
                      background: "#FFFFFF",
                      color: "#424242",
                      padding: "8px",
                    }}
                  >
                    <img src={IconCsvError} alt="iconError" />
                  </Tooltip>
                )}
                <div className="rowIndex">{value}</div>
              </div>
            </div>
          );
        },
      },
      ...(headerCSVs || []).map((obj, index) => {
        const isErrorHeader = headerErrors.includes(obj.label);
        return {
          title: isErrorHeader ? (
            <Tooltip
              title={tRequired(obj.label)}
              color="#ffffff"
              placement="bottomLeft"
              overlayInnerStyle={{
                backgroundColor: "#FFFFFF",
                background: "#FFFFFF",
                color: "#424242",
                padding: "8px",
              }}
            >
              <div className="table-header-cell" style={{ width: `${DEFAULT_TABLE_COL_WIDTH}px` }}>
                {obj.label}
              </div>
            </Tooltip>
          ) : (
            <div className="table-header-cell" style={{ width: `${DEFAULT_TABLE_COL_WIDTH}px` }}>
              {obj.label}
            </div>
          ),
          width: obj.width || colWidth || DEFAULT_TABLE_COL_WIDTH,
          dataIndex: obj.key,
          className: isErrorHeader ? "cell-error" : undefined,
          render: (value: string, record: AnyObject) => {
            const errorKey = `${obj.key}_error`;
            const error = record[errorKey];
            if (error) {
              return (
                <Tooltip
                  title={error}
                  color="#ffffff"
                  placement="bottomLeft"
                  overlayInnerStyle={{
                    backgroundColor: "#FFFFFF",
                    background: "#FFFFFF",
                    color: "#424242",
                    padding: "8px",
                  }}
                >
                  <div
                    className={classNames("virtual-table-cell", "h-full", {
                      "virtual-table-cell-last": index === headerCSVs.length - 1,
                    })}
                    style={{ background: error ? "rgba(217, 155, 255, 0.4)" : "#FFFFFF" }}
                  >
                    <Typography.Text ellipsis>{value}</Typography.Text>
                  </div>
                </Tooltip>
              );
            }
            return (
              <div
                className={classNames("virtual-table-cell", "h-full", {
                  "virtual-table-cell-last": index === headerCSVs.length - 1,
                })}
              >
                <Typography.Text ellipsis>{value}</Typography.Text>
              </div>
            );
          },
        };
      }),
    ];
  }, [headerCSVs, headerErrors, tableWidth]);

  useEffect(() => {
    if (!attached) {
      setShowOnlyError(false);
      const items = _.range(1, DEFAULT_TABLE_ITEMS).map(
        (idx) => headerCSVs.reduce((o, item) => ({ ...o, [item.key]: "" }), { index: "", rowKey: idx }),
        {},
      );
      setHeaderErrors([]);
      setDataSource(items);
    } else {
      const diffHeaders = _.difference(
        headerCSVs.map((obj) => obj.label),
        headersImported || [],
      );
      setHeaderErrors(diffHeaders);
      const headerErrorObj =
        diffHeaders && diffHeaders.length
          ? headerCSVs
              .filter((obj) => diffHeaders.includes(obj.label))
              .reduce((obj, item) => ({ ...obj, [`${item.key}_error`]: tRequired(item.label) }), {})
          : {};
      const items = (dataImported || []).map((obj, index) => {
        const err = (errors || {})[index];
        const hasError = !!err || !_.isEmpty(headerErrorObj);
        return {
          ...obj,
          index: index + 1,
          rowKey: index,
          hasError,
          ...(err || {}),
          ...headerErrorObj,
        };
      });
      const errorDataCount = items.filter((obj) => obj.hasError).length;
      setLineErrors(!_.isEmpty(headerErrorObj) ? errorDataCount + 1 : errorDataCount);
      setDataSource(showOnlyError ? items.filter((obj) => obj.hasError) : items);
    }
  }, [attached, headerCSVs, dataImported, headersImported, errors, showOnlyError]);

  const switchOnlyError = () => {
    setShowOnlyError((pre) => !pre);
  };

  const exportErrorFile = () => {
    exportCsv(dataSource, headerCSVs, `${t("errorFile")}_${fileNameTemplate || ""}.csv`);
  };

  return (
    <SectionStyled>
      <div className="header">
        {attached && (
          <div>
            {t("total")}：{(dataImported || []).length}
            {t("items")}
            {"　"}/{"　"}
            {t("numberOfErrors")}：
            <span className={lineErrors ? "text-red" : ""}>
              {lineErrors}
              {t("items")}
            </span>
          </div>
        )}
        <div className="dataTitle">{t("checkCsvFileMessage")}</div>
        {attached && (
          <button type="button" className="btn-upload" onClick={switchOnlyError}>
            {showOnlyError ? t("showAll") : t("showErrorsOnly")}
          </button>
        )}
      </div>
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <VirtualTable
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey="rowKey"
          scroll={{ x: 1440, y: 700 }}
          pagination={false}
          bordered
          locale={{
            emptyText: attached && !dataImported?.length && !loading ? <span className="text-red">{t("emptyDataImport")}</span> : null,
          }}
        />
      </ResizeObserver>
      {showOnlyError && lineErrors && (
        <button className="btn-export" type="button" onClick={exportErrorFile}>
          {t("downloadErrorFile")}
        </button>
      )}
    </SectionStyled>
  );
};

export default ImportedDataTable;
