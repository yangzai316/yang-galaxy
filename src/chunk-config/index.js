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

// 设置 chunk 组件的属性数据
export const setItemProtoType = (id, name, value) => {
  const component = chunkMap[id];
  component?.protoTypes?.forEach((p) => {
    if (p.name === name) {
      p.default = value;
    }
  });
};
// 从 components 组件表中找到需要的chunk
const findComponentFromList = (type, id) => {
  return JSON.parse(JSON.stringify({ ...components[type], id }));
};

export const deleteItem = (id) => {
  // delete chunkMap[id];
  console.log(JSON.stringify(chunkMap));
  console.log(JSON.stringify(chunkOrigin));
};
