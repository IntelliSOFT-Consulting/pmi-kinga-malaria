import React from 'react';
import { Table } from 'antd';

export default function Report({ datas, cols, loading }) {
  const columns = () =>
    datas?.columns?.map(key => {
      return {
        title: key,
        dataIndex: key,
        key: key,
      };
    });

  return (
    <div>
      {(cols || columns()) && (
        <Table
          size='small'
          columns={cols || columns()}
          dataSource={Array.isArray(datas) ? datas : datas?.content}
          pagination={{ pageSize: 15 }}
          loading={loading}
          rowKey={(_, i) => i}
        />
      )}
    </div>
  );
}
