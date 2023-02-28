import React from 'react';
import { Tabs } from 'antd';
import Report from './Report';

const { TabPane } = Tabs;

export default function Sms({ datas }) {
  return (
    <Tabs tabPosition='bottom'>
      {datas.map((data, index) => {
        return (
          <TabPane tab={data?.sheet} key={index}>
            <Report loading={!data.content} datas={data || []} />
          </TabPane>
        );
      })}
    </Tabs>
  );
}
