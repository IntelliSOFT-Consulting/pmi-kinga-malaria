import { Form, Input, Select } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import EditableContext from './EditableContext';

const { Option } = Select;

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  select,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      record[dataIndex] = values[dataIndex];
      handleSave({ ...record });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      select ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          <Select
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            style={{
              width: '100%',
            }}
          >
            {select?.map(item => (
              <Option key={item._id} title={item.name} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      )
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
          width: '100%',
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
