// import styled from '@emotion/styled';
import { useContext, useMemo } from 'react';
import { RootContext } from './../../context';
import { Button } from 'antd';

export const OperationArea = () => {
  const { container } = useContext(RootContext);
  return <CreateChunkItem container={container}></CreateChunkItem>;
};

const CreateChunkItem = ({ container }) => {
  let children = null;
  if (container?.children?.length) {
    children = container.children.map((item, index) => {
      return <CreateChunkItem container={item} key={index}></CreateChunkItem>;
    });
  }
  return <CreateComponent type={container.type} children={children} protoTypes={container.protoTypes} id={container.id}></CreateComponent>;
};

const CreateComponent = ({ id, type, children, protoTypes = [] }) => {
  const attrs = useMemo(() => {
    const _ = {};
    protoTypes.forEach((item) => {
      item.default && (_[item.name] = item.default);
    });
    return _;
  }, [protoTypes]);
  if (type === 'Button') {
    return <Button {...attrs}>按钮</Button>;
  } else {
    return (
      <div style={{ height: '100%' }} data-id={id}>
        {children}
      </div>
    );
  }
};
