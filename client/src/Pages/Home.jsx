import React, { useEffect, useState } from 'react';
import { EditOutlined, MailOutlined } from '@ant-design/icons';
import { Tooltip, Card, Modal, Form, Select, TimePicker } from 'antd';
import {
  getReports,
  addRecipient,
  getMailList,
  updateReport,
} from '@/redux/actions/reportActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Option } = Select;
const format = 'HH:mm';

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRecipients, setIsRecipients] = useState(false);
  const [isDayEnabled, setIsDayEnabled] = useState(false);
  const { reports } = useSelector(state => state.getReports);
  const { mailList } = useSelector(state => state.getMailList);
  const { report: newRecipient } = useSelector(state => state.addRecipient);
  const { report: updatedReport } = useSelector(state => state.updateReport);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getReports());
    dispatch(getMailList());
  }, [dispatch, newRecipient, updatedReport]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editMailers = report => {
    setIsModalVisible(true);
    setIsRecipients(true);
    form.setFieldsValue({
      recipients: report.recipients?.map(recipient => recipient.email),
      _id: report._id,
    });
  };

  const editSchedule = report => {
    setIsModalVisible(true);
    setIsRecipients(false);
    form.setFieldsValue({
      _id: report._id,
      time: moment(report.time, format),
      day: report.day,
      frequency: report.frequency,
    });
  };

  const handleSubmit = values => {
    dispatch(addRecipient({ ...values, _id: form.getFieldValue('_id') }));
    form.resetFields();
    setIsModalVisible(false);
    setIsRecipients(false);
  };

  const handleSchedule = values => {
    dispatch(updateReport({ ...values, _id: form.getFieldValue('_id') }));
    form.resetFields();
    setIsModalVisible(false);
    setIsRecipients(false);
  };

  const recipients = (
    <Form.Item
      label='Recepients'
      name='recipients'
      rules={[{ required: true, message: 'Please select recepients!' }]}
    >
      <Select
        mode='tags'
        style={{ width: '100%' }}
        placeholder='Please select'
        defaultValue={[]}
      >
        {mailList?.map((item, index) => (
          <Option key={index} value={item.email}>
            {item.email}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const schedule = (
    <>
      <Form.Item
        label='Frequncy'
        name='frequency'
        rules={[{ required: true, message: 'Please select frequency!' }]}
      >
        <Select
          placeholder='Please select'
          onChange={value => {
            setIsDayEnabled(value === 'weekly');
          }}
        >
          <Option value='daily'>Daily</Option>
          <Option value='weekly'>Weekly</Option>
          <Option value='monthly'>Monthly</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label='Day'
        name='day'
        // required if frequency is weekly
        rules={[
          {
            required: isDayEnabled,
          },
        ]}
      >
        <Select
          placeholder='Please select'
          disabled={form.getFieldValue('frequency') === 'daily'}
        >
          <Option value='Monday'>Monday</Option>
          <Option value='Tuesday'>Tuesday</Option>
          <Option value='Wednesday'>Wednesday</Option>
          <Option value='Thursday'>Thursday</Option>
          <Option value='Friday'>Friday</Option>
          <Option value='Saturday'>Saturday</Option>
          <Option value='Sunday'>Sunday</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label='Time'
        name='time'
        rules={[{ required: true, message: 'Please select time!' }]}
      >
        <TimePicker format='HH:mm' />
      </Form.Item>
    </>
  );
  const generateLink = report => {
    const name = report.toLowerCase();
    if (name.includes('sms')) {
      return 'sms';
    } else if (name.includes('supervisory')) {
      return 'supervisory';
    } else if (name.includes('submissions')) {
      return 'submissions';
    } else if (name.includes('late')) {
      return 'late-pmt';
    }
  };

  return (
    <div className='reports-grid'>
      {reports?.map((report, index) => (
        <Card
          style={{
            width: '100%',
          }}
          key={index}
          actions={[
            <Tooltip title='Mail List'>
              <MailOutlined key='setting' onClick={() => editMailers(report)} />
            </Tooltip>,
            <Tooltip title='Schedule' onClick={() => editSchedule(report)}>
              <EditOutlined key='edit' />
            </Tooltip>,
          ]}
        >
          <Meta
            title={<Link to={`/report/${generateLink(report.report)}`}>{report.report}</Link>}
            description={`${report.frequency} ${report.day} at ${report.time}`}
          />
        </Card>
      ))}
      <Modal
        title={isRecipients ? 'Mailers list' : 'Schedule'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={isRecipients ? handleSubmit : handleSchedule}
          layout='vertical'
        >
          {isRecipients ? recipients : schedule}
        </Form>
      </Modal>
    </div>
  );
}
