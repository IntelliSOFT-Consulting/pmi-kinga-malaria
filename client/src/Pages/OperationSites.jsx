import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Popconfirm,
  message,
  Input,
  Space,
  Form,
  Modal,
} from 'antd';
import {
  CloudUploadOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFacilities,
  importFacilities,
  deleteFacility,
  updateFacility,
} from '@/redux/actions/facilityActions';
import FacilityForm from '@/components/FacilityForm';
import { parseCsv } from '@/lib/parseCsv';
import EditableCell from '@/components/EditableCell';
import EditableRow from '@/components/EditableRow';
import { getUsers } from '@/redux/actions/userActions';
const { Search } = Input;

export default function OperationSites() {
  const [visible, setVisible] = useState(false);
  const [datasource, setDatasource] = useState([]);
  const dispatch = useDispatch();
  const { facilities } = useSelector(state => state.getFacilities);
  const { facility } = useSelector(state => state.addFacility);
  const { users } = useSelector(state => state.getUsers);
  const { facilities: importedFacilities } = useSelector(
    state => state.importFacilities
  );
  const { facility: updatedFacility } = useSelector(
    state => state.updateFacility
  );
  const { facility: deletedFacility } = useSelector(
    state => state.deleteFacility
  );

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getFacilities());
    form.resetFields();
    setVisible(false);
  }, [
    dispatch,
    facility,
    updatedFacility,
    deletedFacility,
    importedFacilities,
  ]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (facilities) {
      setDatasource(facilities);
    }
  }, [facilities]);

  const handleSearch = value => {
    const filteredData = facilities.filter(
      facility =>
        JSON.stringify(facility).toLowerCase().indexOf(value.toLowerCase()) !==
        -1
    );
    setDatasource(filteredData);
  };

  const defaultColumns = [
    {
      title: 'Operation Site',
      dataIndex: 'name',
    },
    {
      title: 'County',
      dataIndex: 'county',
      render: county => county?.name,
    },
    {
      title: 'Sub County',
      dataIndex: 'subCounty',
      render: subCounty => subCounty?.name,
    },
    {
      title: 'Ward',
      dataIndex: 'ward',
      render: ward => ward?.name,
    },
    {
      title: 'Target',
      dataIndex: 'target',
      editable: true,
      width: 200,
      render: text => (
        <div className='editable-cell'>
          <span>{text}</span>
          <EditOutlined style={{ marginLeft: 'auto' }} />
        </div>
      ),
    },
    {
      title: 'PMT Data Collector',
      dataIndex: 'pmtDataCollector',
      render: (text, record) => (
        <div className='editable-cell'>
          <span>{record?.pmtDataCollector?.name || '-'}</span>
          <EditOutlined style={{ marginLeft: 'auto' }} />
        </div>
      ),
      editable: true,
      select: users || [],
    },
    {
      title: 'Supervisor',
      dataIndex: 'supervisor',
      render: (text, record) => (
        <div className='editable-cell'>
          <span>{record?.supervisor?.name || '-'}</span>
          <EditOutlined style={{ marginLeft: 'auto' }} />
        </div>
      ),
      editable: true,
      select: users || [],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        // <Space size='small'>
        <Popconfirm
          title='Are you sure you want to delete this facility?'
          onConfirm={() => {
            dispatch(deleteFacility(record._id));
            message.success('Deleted successfully');
          }}
        >
          <Button type='danger' ghost icon={<DeleteOutlined />} />
        </Popconfirm>
        // </Space>
      ),
    },
  ];

  const handleSave = row => {
    // find the edited facility
    const facility = facilities.find(facility => facility._id === row._id);
    // update the facility
    const updatedFacility = {
      ...facility,
      ...row,
      county: facility.county._id,
      subCounty: facility.subCounty._id,
      ward: facility.ward._id,
    };
    dispatch(updateFacility(updatedFacility));
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        select: col.select,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleUpload = async e => {
    const { files } = e.target;
    const file = files[0];
    const data = await parseCsv(file);
    const facilityKeys = Object.keys(data[0]);
    const requiredKeys = ['facility', 'county', 'subCounty', 'ward'];
    const missingKeys = requiredKeys.filter(key => !facilityKeys.includes(key));
    if (missingKeys.length) {
      return message.error(`Missing fields: ${missingKeys.join(', ')}`);
    }
    dispatch(importFacilities(data));
  };

  return (
    <div className='table-view'>
      <Space direction='horizontal' className='table-filters'>
        <Search
          placeholder='Search'
          onSearch={value => handleSearch(value)}
          allowClear={true}
          size='large'
        />
        <Button
          type='default'
          size='large'
          icon={<PlusCircleOutlined />}
          onClick={() => setVisible(true)}
        >
          Add
        </Button>
        <div className='facility-import'>
          <Button type='default' size='large' icon={<CloudUploadOutlined />}>
            Import
          </Button>
          <input onChange={handleUpload} type='file' accept='.csv' />
        </div>
      </Space>

      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        loading={!facilities}
        dataSource={datasource || []}
        columns={columns}
        rowKey={record => record.dataIndex}
        size='small'
        pagination={{
          defaultPageSize: 15,
          showSizeChanger: true,
          pageSizeOptions: ['15', '20', '50', '100'],
        }}
      />
      {/* <Table
        size='small'
        columns={columns}
        dataSource={facilities || []}
        rowKey={record => record._id}
        pagination={{
          pageSize: 13,
        }}
      /> */}
      <Modal
        title='Add Facility'
        visible={visible}
        onOk={() => {
          // setVisible(false);
          form.submit();
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <FacilityForm form={form} users={users} />
      </Modal>
    </div>
  );
}
