import React, { useEffect, useState } from "react";
import Report from "@/components/Report";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button, Form, DatePicker, Select, Space } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import Loading from "@/components/Loading";
import { saveAs } from "file-saver";
import * as excelJS from "exceljs";
import { getSubmissionsByForm, getTest } from "@/redux/actions/reportActions";
import { downloadData } from "@/lib/download";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

export default function SubmissionByForm() {
  const [dates, setDates] = useState({
    dateTo: moment(new Date()).format(dateFormat),
  });
  const [county, setCounty] = useState("");

  const { submissions, loading } = useSelector(
    (state) => state.getSubmissionsByForm,
  );
  const { testReport } = useSelector((state) => state.getTestReport);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const fetchReports = async () => {
    await dispatch(
      getSubmissionsByForm({
        from: dates.dateFrom,
        to: dates.dateTo,
        county,
        test_yn: testReport,
      }),
    );
  };

  useEffect(() => {
    dispatch(getTest());
    fetchReports();
  }, [dates, county]);

  const year = new Date().getFullYear();

  const handleSubmit = async (values) => {
    setDates({
      dateFrom: values.date[0].format(dateFormat),
      dateTo: values.date[1].format(dateFormat),
    });
    setCounty(values.county);
  };

  const loadDownload = () => {
    return downloadData("Submissions By Form", submissions);
  };

  const columns = [
    {
      label: "User",
      value: "User",
    },
    {
      label: "County",
      value: "county",
    },
    {
      label: "Sub-County",
      value: "subCounty",
    },
    {
      label: "Operations Site",
      value: "site",
    },
    {
      label: `PMI Kinga Malaria ${year} > IRS Application > Welcome to PMI Kinga Malaria`,
      value: "About the PMI Kinga Malaria supervision application",
    },
    {
      label: `PMI Kinga Malaria ${year} > IRS Application > Spray Operator Morning Mobilization Inspection`,
      value: "Spray Operator Morning Mobilization Inspection",
    },
    {
      label: `PMI Kinga Malaria ${year} > IRS Application > Spray Operator Transportation Vehicle Inspection`,
      value: "Spray Operator Transportation Vehicle Inspection",
    },
    {
      label: `PMI Kinga Malaria ${year} > IRS Application > Bicycle Inspection`,
      value: "Bicycle Inspection",
    },
    {
      label: `PMI Kinga Malaria ${year} > IRS Application > Homeowner Preparation and Spray Operator Performance`,
      value: "Homeowners Preparations and Spray Operators Performance",
    },
    {
      label: `PMI Kinga Malaria ${year} > IRS Application > Storekeeper Performance Inspection`,
      value: "Storekeeper Performance Inspection",
    },

    {
      label: `PMI Kinga Malaria ${year} > IRS Application > End of Day Cleanup Inspection`,
      value: "End of Day Cleanup",
    },
    {
      label: `PMI Kinga Malaria ${year} > IRS Application > DCV - Data Collection Verification`,
      value: "Kenya DCV Form",
    },
    {
      label: "All Forms",
      value: "All Forms",
    },
  ];
  const cols = columns.map((col) => {
    return {
      title: col.label,
      dataIndex: col.value,
      key: col.value,
    };
  });
  return (
    <div className="table-view">
      <h1 className="reports-header">
        KINGA MALARIA - SUBMISSION BY FORM REPORTS
      </h1>
      <Space direction="horizontal" className="table-filters filter-report">
        <Form
          layout="inline"
          form={form}
          onFinish={handleSubmit}
          className="report-filter"
          style={{ width: "100%", display: "flex" }}
        >
          <Form.Item label="Submitted At" name="date" className="date-filter">
            <RangePicker
              // defaultValue={[dates.dateFrom, dates.dateTo]}
              // onChange={handleChange}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item label="County" name="county">
            <Select placeholder="Select County" style={{ width: 340 }}>
              <Option value="Migori">Migori</Option>
              <Option value="Homa Bay">Homa Bay</Option>
              <Option value="Busia">Busia</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          icon={<CloudDownloadOutlined />}
          onClick={loadDownload}
        >
          Export
        </Button>
      </Space>
      <Report loading={!submissions} datas={submissions} cols={cols} />
    </div>
  );
}
