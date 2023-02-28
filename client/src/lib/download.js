import { saveAs } from 'file-saver';
import * as excelJS from 'exceljs';

export const downloadData = async (reportName, datas, sheets = null) => {
  const workbook = new excelJS.Workbook();
  workbook.creator = 'PMI-Kinga-Malaria';
  workbook.lastModifiedBy = 'PMI-Kinga-Malaria';
  workbook.created = new Date();
  workbook.modified = new Date();
  if (datas?.length) {
    if (!sheets) {
      const sheet = await workbook.addWorksheet(reportName);

      sheet.columns = Object.keys(datas[0]).map(item => ({
        header: item,
        key: item,
        width: 32,
      }));
      await sheet.addRows(datas);
    } else {
      const worksheets = await Promise.all(
        datas.map(async item => {
          const sheet = await workbook.addWorksheet(item.sheet);
          sheet.columns = await Promise.all(
            item.columns.map(data => ({
              header: data,
              key: data,
              width: 30,
            }))
          );
          await sheet.addRows(item.content);
        })
      );
    }

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], { type: 'applicationi/xlsx' });
    saveAs(blob, `${reportName}.xlsx`);
  }
};
