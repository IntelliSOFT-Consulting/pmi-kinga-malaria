import React, { useState } from "react";
import { Button, Table, message, Select, Space } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";

const { Option } = Select;

export default function HandbookImport() {
  const [tableData, setTableData] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [selectedSheetOptions, setSelectedSheetOptions] = useState([]);
  const [workbook, setWorkbook] = useState(null);

  const handleImport = async (e) => {
    const { files } = e.target;
    const file = files[0];

    // Check if the file is an Excel file (xlsx)
    const isExcelFile = file.name.endsWith(".xlsx");

    if (isExcelFile) {
      const newWorkbook = new ExcelJS.Workbook();
      await newWorkbook.xlsx.load(await file.arrayBuffer());

      const sheetOptions = newWorkbook.worksheets.map((sheet, index) => ({
        label: sheet.name,
        value: index,
      }));

      setSelectedSheet(null);
      setTableData([]);
      setSelectedSheetOptions(sheetOptions);
      setWorkbook(newWorkbook);
      message.success("Handbook import successful");
    } else {
      message.error("Invalid file format. Please upload an Excel file.");
    }
  };

  const handleSheetChange = (value) => {
    setSelectedSheet(value);

    if (workbook) {
      const selectedWorksheet = workbook.worksheets[value];
      const sheetData = [];
      selectedWorksheet.eachRow((row) => {
        sheetData.push(row.values);
      });

      setTableData(sheetData);
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
    <div className="table-view">
      <Space direction="horizontal">
        <div className="facility-import">
          <Button type="primary" icon={<CloudUploadOutlined />}>
            Import Handbook
          </Button>
          <input onChange={handleImport} type="file" accept=".xlsx" />
        </div>
        {selectedSheetOptions.length > 0 && (
          <Select
            placeholder="Select a sheet"
            onChange={handleSheetChange}
            value={selectedSheet}
          >
            {selectedSheetOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )}
      </Space>
      <Table
        dataSource={tableData}
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
