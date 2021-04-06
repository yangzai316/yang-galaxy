import { chunkMap } from './map';

import { chunkOrigin } from './origin';

import { components } from './component-list.js';

// (添加 chunk 组件 到 源数据中) & (添加 chunk 组件 到 组件Map表中)
export const addItemToRootData = (parentId, id, type) => {
  const component = findComponentFromList(type, id);
  addItemToMap(id, component);

  addItemToOrigin(parentId, component, chunkOrigin);
};
// 添加 chunk 组件 到 组件Map表中
const addItemToMap = (id, component) => {
  chunkMap[id] = component;
};
// 添加 chunk 组件 到 源数据中
const addItemToOrigin = (parentId, component) => {
  const parent = chunkMap[parentId];
  if (parent?.children) {
    parent.children.push(component);
  }
};

// 设置 chunk 组件的【属性】数据
export const setItemProtoType = (id, name, value) => {
  const component = chunkMap[id];
  for (const item of component?.protoTypes || []) {
    if (item.name === name) {
      return (item.default = value);
    }
  }
};
// 从 components 组件表中找到需要的chunk
const findComponentFromList = (type, id) => {
  return JSON.parse(JSON.stringify({ ...components[type], id }));
};

export const deleteItemFromRootData = (id) => {
  delete chunkMap[id];
  findNodeAndDelete(chunkOrigin, id);
};
const findNodeAndDelete = (data, id, index, parentList) => {
  if (data.id === id) {
    return parentList.splice(index, 1);
  } else if (data?.children?.length) {
    return data.children.forEach((item, index) => {
      findNodeAndDelete(item, id, index, data.children);
    });
  }
};

// 设置 chunk 组件的【样式】数据
export const setItemStyle = (id, name, value) => {
  const component = chunkMap[id];
  for (const item of component?.style || []) {
    if (item.name === name) {
      return (item.default = value);
    }
  }
};

// 【修改options】修改 select options 内容
export const setSelectOptionFromRootData = (id, option) => {
  const component = chunkMap[id];
  if (component.type !== 'Select') return;
  component.options = option;
};
