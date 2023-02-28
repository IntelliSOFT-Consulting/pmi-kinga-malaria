import React, { useEffect, useState } from 'react';

import { getSupervisoryReport, getTest } from '@/redux/actions/reportActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Button, Form, DatePicker, Select, Space } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import Report from '@/components/Report';
import Loading from '@/components/Loading';
import { downloadData } from '@/lib/download';

const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

export default function Supervisory() {
  const [dates, setDates] = useState({
    dateFrom: moment(new Date()).format(dateFormat),
    dateTo: moment(new Date()).format(dateFormat),
  });
  const [county, setCounty] = useState('');

  const [form] = Form.useForm();

  const { supervisoryReport, loading: supervisoryLoading } = useSelector(
    state => state.getSupervisoryReport
  );
  const { testReport } = useSelector(state => state.getTestReport);

  const dispatch = useDispatch();

  const fetchReports = () => {
    dispatch(
      getSupervisoryReport({
        from: dates.dateFrom,
        to: dates.dateTo,
        county,
        test_yn: testReport,
      })
    );
  };

  useEffect(() => {
    dispatch(getTest());
    fetchReports();
  }, [dates]);

  const handleSubmit = values => {
    setDates({
      dateFrom: values.date[0].format(dateFormat),
      dateTo: values.date[1].format(dateFormat),
    });
    setCounty(values.county);
  };

  const loadDownload = () => {
    return downloadData('Supervisory Report', supervisoryReport);
  };

  let columns = [
    { label: 'Date of inspection', value: 'Date of inspection' },
    { label: 'Date and time submitted', value: 'Date and time submitted' },
    { label: 'County', value: 'County' },
    { label: 'Sub-County', value: 'Sub-County' },
    { label: 'Ward', value: 'Ward' },
    { label: 'Operations Site', value: 'Operations Site' },
    { label: 'Inspector names', value: 'Inspector names' },
    { label: 'Form name', value: 'Form name' },
    { label: 'Form question', value: 'Form question' },
    { label: 'Red flag warning', value: 'Red flag warning' },
    {
      label: 'Responsible for resolution',
      value: 'Responsible for resolution',
    },
    { label: 'comments', value: 'comments' },
  ];
  const cols = columns.map(col => {
    return {
      title: col.label,
      dataIndex: col.value,
      key: col.value,
    };
  });

  return (
    <div className='table-view'>
      <Space direction='horizontal' className='table-filters filter-report'>
        <Form
          layout='inline'
          form={form}
          onFinish={handleSubmit}
          className='report-filter'
          style={{ width: '100%', display: 'flex' }}
        >
          <Form.Item label='Submitted At' name='date' className='date-filter'>
            <RangePicker
              // defaultValue={[dates.dateFrom, dates.dateTo]}
              // onChange={handleChange}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item label='County' name='county'>
            <Select placeholder='Select County' style={{ width: 200 }}>
              <Option value='Migori'>Migori</Option>
              <Option value='Homa Bay'>Homa Bay</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Filter
            </Button>
          </Form.Item>
        </Form>
        <Button
          type='default'
          icon={<CloudDownloadOutlined />}
          onClick={loadDownload}
        >
          Export
        </Button>
      </Space>

      <Report
        loading={!supervisoryReport}
        datas={supervisoryReport}
        cols={cols}
      />
    </div>
  );
}
