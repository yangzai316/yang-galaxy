import { Layout, notification } from 'antd';
import styled from '@emotion/styled';
import { ChunkArea } from './chunk-area';
import { OperationArea } from './operation-area';
import { ConfigureArea } from './configure-area';
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
          return notification.warning({
            message: '未找到合法父级...',
          });
        } else {
        }
        setContainer(parentId.current, +new Date(), ele.current?.dataset?.type);
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
      <Header></Header>
      <Layout>
        <Layout.Sider style={{ paddingTop: '10px' }}>
          <ChunkArea></ChunkArea>
        </Layout.Sider>
        <Content ref={operation}>
          <OperationArea></OperationArea>
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
  height: 30px;
`;
