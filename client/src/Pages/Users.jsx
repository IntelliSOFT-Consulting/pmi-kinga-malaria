import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUser,
  addUser,
  updateUser,
  importUsers,
} from "@/redux/actions/userActions";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Input,
  Space,
  Form,
  Modal,
} from "antd";
import {
  CloudUploadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import EditableCell from "@/components/EditableCell";
import EditableRow from "@/components/EditableRow";

export default function Users() {
  const [openModal, setOpenModal] = useState(false);

  const { users } = useSelector((state) => state.getUsers);
  const { user: deletedUser } = useSelector((state) => state.deleteUser);
  const { user: addedUser } = useSelector((state) => state.addUser);
  const { user: updatedUser } = useSelector((state) => state.updateUser);
  const { users: importedUser } = useSelector((state) => state.importUsers);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, deletedUser, addedUser, updatedUser, importedUser]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleImport = (values) => {
    dispatch(importUsers(values));
    message.success("Users imported successfully");
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text) => text || "-",
      editable: true,
    },
    {
      title: "County",
      dataIndex: "county",
      key: "county",
      render: (text) => text || "-",
      editable: true,
    },
    {
      title: "Sub County",
      dataIndex: "subCounty",
      key: "subCounty",
      render: (text) => text || "-",
      editable: true,
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      render: (text) => text || "-",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const handleSave = (row) => {
    const newData = [...users];
    const index = newData.findIndex((item) => row._id === item._id);
    const updatedUser = { ...newData[index], ...row };

    dispatch(updateUser(updatedUser));
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        select: col.select,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleUpload = (e) => {
    const { files } = e.target;
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    dispatch(importUsers(formData));
  };

  return (
    <div>
      {/* add search */}
      <div>
        <Space>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpenModal(true)}
          >
            Add User
          </Button>

          <div className="facility-import">
            <Button type="primary" icon={<CloudUploadOutlined />}>
              Import Users
            </Button>
            <input onChange={handleUpload} type="file" accept=".csv" />
          </div>
        </Space>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        dataSource={users}
        columns={columns}
        loading={users ? false : true}
        size='small'
      />
      <Modal
        title="Add User"
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              dispatch(addUser(values));
              form.resetFields();
              setOpenModal(false);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input phone!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
