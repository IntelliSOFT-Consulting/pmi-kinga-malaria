import React, { useEffect, useState } from 'react';
import { getLatePmt, getTest } from '@/redux/actions/reportActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Button, Form, DatePicker, Space } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import Report from '@/components/Report';
import Loading from '@/components/Loading';
import { downloadData } from '@/lib/download';

export default function LatePmt() {
  const [dateFrom, setDateFrom] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const { latePmt, loading: pmtLoading } = useSelector(
    state => state.getLatePmt
  );
  const { testReport } = useSelector(state => state.getTestReport);
  const dispatch = useDispatch();

  const fetchReports = () => {
    dispatch(
      getLatePmt({
        from: dateFrom,
        test_yn: testReport,
      })
    );
  };

  useEffect(() => {
    dispatch(getTest());
    fetchReports();
  }, [dateFrom]);

  const handleSubmit = values => {
    setDateFrom(moment(values.dateFrom).format('YYYY-MM-DD'));
  };

  const loadDownload = () => {
    return downloadData('Late PMT Report', latePmt);
  };
  const columns = [
    { label: 'Missing Report Date', value: 'Missing Report Date' },
    { label: 'Name', value: 'Name' },
    { label: 'County', value: 'County' },
    { label: 'Sub-County', value: 'Sub-County' },
    { label: 'Ward', value: 'Ward' },
    { label: 'Operations Site', value: 'Operations Site' },
    { label: 'Submission Status', value: 'Submission Status' },
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
          onFinish={handleSubmit}
          className='report-filter'
          style={{ width: '100%', display: 'flex' }}
        >
          <Form.Item
            label='Submitted At'
            name='dateFrom'
            className='date-filter'
          >
            <DatePicker
              style={{ width: '100%' }}
              defaultValue={moment(dateFrom)}
            />
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
      {!latePmt ? <Loading /> : <Report datas={latePmt} cols={cols} />}
    </div>
  );
}
