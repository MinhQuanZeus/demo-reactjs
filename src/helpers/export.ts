import saveAs from "file-saver";
import { AnyObject, HeaderCSVs } from "interfaces";
import { unparse } from "papaparse";

export const exportCsv = (dataExport: AnyObject[], headerCsv: HeaderCSVs, fileName: string) => {
  const csvHeader = unparse({
    fields: [...headerCsv.map((item) => item.label)],
    data: [],
  });
  const csvVal = unparse(dataExport, {
    header: false,
    columns: [...headerCsv.map((item) => item.key)],
  });
  const csvString = csvHeader + csvVal;

  const bom = "\uFEFF";
  const file = new Blob([bom, csvString], { type: "application/octet-stream" });
  saveAs(file, fileName);
};
