import { useState, useContext } from 'react';
import { Button, Space, Modal, Tabs } from 'antd';
import { exportJSON } from './../../helper/export-json';

import { RootContext } from './../../context';
import styled from '@emotion/styled';
import { OperationArea } from './../operation-area';
export const HeadContent = () => {
  const { container } = useContext(RootContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => { 
    exportJSON([JSON.stringify(container, null, 2)], '页面数据-json');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Space>
        <Button onClick={showModal}>预览</Button>
        <Button onClick={handleOk}>导出</Button>
      </Space>
      <Modal
        width={600}
        title="预览"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            关闭
          </Button>,
          <Button key="export" type="primary" onClick={handleOk}>
            导出
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="视图预览" key="1">
            <OperationArea></OperationArea>
          </Tabs.TabPane>
          <Tabs.TabPane tab="数据预览" key="2">
            <PrvCode>{JSON.stringify(container, null, 2)}</PrvCode>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

const PrvCode = styled.pre`
  width: 100%;
  height: 450px;
  overflow: auto;
`;
