import { Layout } from 'antd';
import styled from '@emotion/styled';
import { ChunkArea } from './chunk-area';
import { OperationArea } from './operation-area';
import { ConfigureArea } from './configure-area';
import { createRef, useEffect, useRef, useContext } from 'react';
import { RootContext } from './../context';

export const Index = () => {
  const { setContainer } = useContext(RootContext);
  const ele = useRef(null);
  const operation = createRef(null);
  const parentId = createRef(0);
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
        setContainer(parentId.current, +new Date(), ele.current?.dataset?.type);
      },
      false
    );
    document.addEventListener(
      'dragenter',
      (e) => {
        parentId.current = e.target?.dataset?.id;
      },
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Header></Header>
      <Layout>
        <Layout.Sider>
          <ChunkArea></ChunkArea>
        </Layout.Sider>
        <Content ref={operation}>
          <OperationArea></OperationArea>
        </Content>
        <Layout.Sider>
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
