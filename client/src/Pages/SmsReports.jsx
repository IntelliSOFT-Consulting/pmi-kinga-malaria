import React, { useEffect, useState } from 'react';
import { getSmsReports, getTest } from '@/redux/actions/reportActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Button, Form, DatePicker, Space } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading';
import Sms from '@/components/Sms';
import { downloadData } from '@/lib/download';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

export default function SmsReports() {
  const [dates, setDates] = useState({
    dateFrom: moment(new Date()).format(dateFormat),
    dateTo: moment(new Date()).format(dateFormat),
  });

  const { smsReports } = useSelector(state => state.getSmsReports);
  const { testReport } = useSelector(state => state.getTestReport);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const fetchReports = () => {
    dispatch(
      getSmsReports({
        from: dates.dateFrom,
        to: dates.dateTo,
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
  };

  const loadDownload = () => {
    return downloadData('SMS Indicator Reports', smsReports, true);
  };

  return (
    <div className='table-view'>
      <h1 className='reports-header'>KINGA MALARIA - SMS REPORTS</h1>
      <Space direction='horizontal' className='table-filters filter-report'>
        <Form
          layout='inline'
          form={form}
          onFinish={handleSubmit}
          className='report-filter'
          style={{ width: '100%', display: 'flex' }}
        >
          <Form.Item label='Submitted At' name='date' className='date-filter'>
            <RangePicker format={dateFormat} />
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
      {!smsReports ? <Loading /> : <Sms datas={smsReports} />}
    </div>
  );
}
