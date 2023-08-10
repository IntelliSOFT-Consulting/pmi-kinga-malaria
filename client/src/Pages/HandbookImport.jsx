import React, { useState } from "react";
import { Button, Table, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";

export default function HandbookImport() {
  const [tableData, setTableData] = useState([]);

  const handleImport = async (e) => {
    const { files } = e.target;
    const file = files[0];

    // Check if the file is an Excel file (xlsx)
    const isExcelFile = file.name.endsWith(".xlsx");

    if (isExcelFile) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());

      // Reading from a specific sheet
      const sheet = workbook.getWorksheet(9);

      const sheetData = [];
      sheet.eachRow((row) => {
        sheetData.push(row.values);
      });

      setTableData(sheetData);
      message.success("Handbook import successful");
    } else {
      message.error("Invalid file format. Please upload an Excel file.");
    }
  };

  const columns =
    tableData.length > 0
      ? tableData[0].map((header, index) => ({
          title: header,
          dataIndex: index,
          key: index,
        }))
      : [];

  return (
    <div>
      <div className="facility-import">
        <Button type="primary" icon={<CloudUploadOutlined />}>
          Import Handbook
        </Button>
        <input onChange={handleImport} type="file" accept=".xlsx" />
      </div>
      <Table
        dataSource={tableData.slice(1)}
        columns={columns}
        size="small"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </div>
  );
}
