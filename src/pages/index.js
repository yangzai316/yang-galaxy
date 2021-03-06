import { Layout, message } from 'antd';
import styled from '@emotion/styled';
import { ChunkArea } from './chunk-area';
import { OperationArea } from './operation-area';
import { ConfigureArea } from './configure-area';
import { HeadContent } from './head-content';
import { createRef, useEffect, useRef, useContext } from 'react';
import { RootContext } from './../context';
import { findFromHasIdParentForId } from './../helper';

export const Index = () => {
  const { setContainer } = useContext(RootContext);
  const ele = useRef(null);
  const operation = createRef(null);
  const parentId = createRef(undefined);
  useEffect(() => {
    document.addEventListener(
      'dragstart',
      (event) => {
        ele.current = event.target;
      },
      false
    );
    document.addEventListener(
      'dragend',
      (e) => {
        if (!parentId.current) {
          return message.error('操作失败：组件需拖拽到操作区中，方可有效');
        } else {
        }
        setContainer(parentId.current, +new Date(), ele.current?.dataset?.type);
        parentId.current = null;
      },
      false
    );
    document.addEventListener(
      'dragenter',
      (e) => {
        const target = e.target;
        if (!target?.dataset?.id && target.getAttribute('class')?.includes('ant-form-item-control-input')) {
          parentId.current = findFromHasIdParentForId(e.target);
        } else if (target?.dataset?.id) {
          parentId.current = target?.dataset?.id;
        }
      },
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Header>
        <HeadContent></HeadContent>
      </Header>
      <Layout>
        <Layout.Sider style={{ padding: '10px 4px' }}>
          <ChunkArea></ChunkArea>
        </Layout.Sider>
        <Content ref={operation}>
          <OperationArea  viewType="add"></OperationArea>
        </Content>
        <Layout.Sider width={300}>
          <ConfigureArea></ConfigureArea>
        </Layout.Sider>
      </Layout>
    </Layout>
  );
};

const Content = styled.div`
  width: 100%;
`;
const Header = styled(Layout.Header)`
  text-align: right;
  border-bottom: 1px solid #000;
`;
