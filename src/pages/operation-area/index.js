// import styled from '@emotion/styled';
import React, { useCallback, useContext, useMemo } from 'react';
import { RootContext } from './../../context';
import * as AntDComponents from 'antd';

// 渲染 中间 操作区
export const OperationArea = () => {
  const { container } = useContext(RootContext);
  return <CreateChunkItem container={container}></CreateChunkItem>;
};

// 循环+递归 渲染 json
const CreateChunkItem = ({ container }) => {
  let children = null;
  if (container?.children?.length) {
    children = container.children.map((item) => {
      return <CreateChunkItem container={item} key={item.id}></CreateChunkItem>;
    });
  }

  return <CreateComponent type={container.type} children={children} protoTypes={container.protoTypes} id={container.id}></CreateComponent>;
};

// 渲染 具体 antD 组件
const CreateComponent = ({ id, type, children, protoTypes = [] }) => {
  // (protoTypes 的数组 转为 对象 ) & (去除属性为空) & (添加到组件上)
  const attrs = useMemo(() => {
    const _ = {};
    protoTypes.forEach((item) => {
      item.default && (_[item.name] = item.default);
    });
    _['data-id'] = id;
    return _;
  }, [protoTypes, id]);
  // antD 组件库中 找到当前组件
  const Component = useMemo(() => {
    return type !== 'container' ? AntDComponents[type] : null;
  }, [type]);

  const { focusCurrent } = useContext(RootContext);

  const focusElementToCurrent = useCallback(() => {
    focusCurrent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(attrs);
  if (type === 'Form') {
    return (
      <AntDComponents.Form
        {...attrs}
        onClick={focusElementToCurrent}
        style={{ height: '100%', width: '100%', border: '1px dashed #fff', padding: '4px' }}
      >
        {children}
      </AntDComponents.Form>
    );
  }
  if (type === 'Form.Item') {
    return (
      <AntDComponents.Form.Item {...attrs} onClick={focusElementToCurrent} style={{ width: '100%', border: '1px dashed #fff' }}>
        {children}
      </AntDComponents.Form.Item>
    );
  } else if (type === 'container') {
    return (
      <div style={{ height: '100%', padding: '10px' }} data-id={id}>
        {children}
      </div>
    );
  } else {
    return (
      <Component {...attrs} onClick={focusElementToCurrent} style={{ height: '100%', width: '100%' }}>
        {attrs.content ? attrs.content : null}
      </Component>
    );
  }
};
