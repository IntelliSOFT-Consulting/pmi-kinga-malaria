import React from 'react';
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  DatePicker,
  message,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addCampaign, updateCampaign } from '@/redux/actions/campaignActions';
import { readExcelFile } from '@/lib/campaignImport';

const dateFormat = 'YYYY/MM/DD';

export default function NewCampaign({ form }) {
  const dispatch = useDispatch();
  const onFinish = values => {
    if (form.getFieldValue('_id')) {
      dispatch(updateCampaign({ ...values, _id: form.getFieldValue('_id') }));
    } else {
      dispatch(addCampaign(values));
    }
  };

  const props = {
    name: 'file',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // headers: {
    //   authorization: 'authorization-text',
    // },

    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Form initialValues={{}} onFinish={onFinish} form={form}>
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Campaign name is required!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea />
        </Form.Item>
        <Row gutter={16}>
          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label='Start Date'
              name='startDate'
              rules={[{ required: true, message: 'Start date is required!' }]}
            >
              <DatePicker style={{ width: '100%' }} format={dateFormat} />
            </Form.Item>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label='End Date'
              name='endDate'
              rules={[{ required: true, message: 'End date is required!' }]}
            >
              <DatePicker style={{ width: '100%' }} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='Campaign Data File (xlsx)' name='data'>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}
