import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addFacility, updateFacility } from '@/redux/actions/facilityActions';
import {
  getCounties,
  getSubCounties,
  getWards,
} from '@/redux/actions/countyActions';

const { Option } = Select;

export default function FacilityForm({ facility, form, users = [] }) {
  const { counties } = useSelector(state => state.getCounties);
  const { subCounties } = useSelector(state => state.getSubCounties);
  const { wards } = useSelector(state => state.getWards);

  const dispatch = useDispatch();
  const initialValues = facility ? facility : {};

  const onFinish = values => {
    if (form.getFieldValue('_id')) {
      dispatch(updateFacility({ ...values, _id: form.getFieldValue('_id') }));
    } else {
      dispatch(addFacility(values));
    }
  };

  useEffect(() => {
    dispatch(getCounties());
  }, []);

  return (
    <Form
      name='facilityForm'
      onFinish={onFinish}
      initialValues={initialValues}
      form={form}
      layout='vertical'
    >
      <Form.Item
        name='name'
        label='Facility'
        rules={[{ required: true, message: 'Please input facility name' }]}
      >
        <Input size='large' />
      </Form.Item>
      <Form.Item
        name='county'
        label='County'
        rules={[{ required: true, message: 'Please input county' }]}
      >
        <Select
          size='large'
          onChange={value => dispatch(getSubCounties(value))}
          disabled={!counties}
        >
          {counties?.map(county => (
            <Option key={county._id} value={county._id}>
              {county.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='subCounty'
        label='Sub County'
        rules={[{ required: true, message: 'Please input sub county' }]}
      >
        <Select
          size='large'
          onChange={value => dispatch(getWards(value))}
          disabled={!subCounties}
        >
          {subCounties?.map(subCounty => (
            <Option key={subCounty._id} value={subCounty._id}>
              {subCounty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='ward'
        label='Ward'
        rules={[{ required: true, message: 'Please input ward' }]}
      >
        <Select size='large' disabled={!wards}>
          {wards?.map(ward => (
            <Option key={ward._id} value={ward._id}>
              {ward.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='target'
        label='Target'
        rules={[{ required: true, message: 'Please input target' }]}
      >
        <InputNumber size='large' />
      </Form.Item>
      <Form.Item
        name='pmtDataCollector'
        label='PMT Data Collector'
        rules={[{ required: true, message: 'Please input PMT Data Collector' }]}
      >
        <Select
          size='large'
          options={users?.map(user => ({
            value: user._id,
            label: user.name,
          }))}
          filterOption={(inputValue, option) =>
            option.label?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item
        name='supervisor'
        label='Supervisor'
        rules={[{ required: true, message: 'Please input supervisor' }]}
      >
        <Select
          size='large'
          showSearch={true}
          options={users?.map(user => ({
            value: user._id,
            label: user.name,
          }))}
        />
      </Form.Item>
    </Form>
  );
}
