// import styled from '@emotion/styled';
import React, { useCallback, useContext, useMemo } from 'react';
import { RootContext } from './../../context';
import * as AntDComponents from 'antd';

// 渲染 中间 操作区
export const OperationArea = ({ viewType }) => {
  const { container } = useContext(RootContext);
  return <CreateChunkItem container={container} viewType={viewType}></CreateChunkItem>;
};

// 循环+递归 渲染 json
const CreateChunkItem = ({ container, viewType }) => {
  let children = null;
  if (container?.children?.length) {
    children = container.children.map((item) => {
      return <CreateChunkItem container={item} key={item.id} viewType={viewType}></CreateChunkItem>;
    });
  }
  return <CreateComponent {...{ ...container, children, viewType }}></CreateComponent>;
};

// 渲染 具体 antD 组件
const CreateComponent = ({ id, type, children, protoTypes = [], style, options = [], viewType }) => {
  // (protoTypes 的数组 转为 对象 ) & (去除属性为空) & (添加到组件上)
  const attrs = useMemo(() => {
    const _ = {};
    protoTypes.forEach((item) => {
      item.default && (_[item.name] = item.default);
    });
    _['data-id'] = id;
    return _;
  }, [protoTypes, id]);
  // (style 的数组 转为 对象 ) & (去除属性为空) & (添加到组件上)
  const styles = useMemo(() => {
    const _ = {};
    style?.forEach((item) => {
      item.default && (_[item.name] = item.default);
    });
    return _;
  }, [style]);
  // antD 组件库中 找到当前组件
  const Component = useMemo(() => {
    return type !== 'container' ? AntDComponents[type] : null;
  }, [type]);

  const { focusCurrent } = useContext(RootContext);

  const focusElementToCurrent = useCallback(() => {
    focusCurrent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (type === 'container') {
    return (
      <div style={styles} data-id={id} onClickCapture={focusElementToCurrent}>
        {children}
      </div>
    );
  } else if (type === 'Form') {
    return (
      <AntDComponents.Form {...attrs} onClickCapture={focusElementToCurrent} style={{ ...styles, ...{ border: viewType==='add'&&'1px dashed #fff', padding: viewType==='add'&&'4px' } }}>
        {children}
      </AntDComponents.Form>
    );
  } else if (type === 'Form.Item') {
    return (
      <AntDComponents.Form.Item
        {...attrs}
        onClickCapture={focusElementToCurrent}
        style={{ width: viewType==='add'&&'100%', padding: viewType==='add'&&'4px', border: viewType==='add'&&'1px dashed #fff' }}
      >
        {children}
      </AntDComponents.Form.Item>
    );
  } else {
    return (
      <Component {...attrs} options={options} onClickCapture={focusElementToCurrent}>
        {attrs.content ? attrs.content : null}
      </Component>
    );
  }
};
