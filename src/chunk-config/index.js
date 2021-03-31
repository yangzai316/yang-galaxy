import { chunkMap } from './map';

import { chunkOrigin } from './origin';

import { components } from './component-list.js';

export const addItemToRootData = (parentId, id, type) => {
  const component = findComponent(type, id);
  chunkMap[id] = component;
  addItemToOrigin(parentId, component, chunkOrigin);
};

export const setItemProtoType = (id, name, value) => {
  const component = chunkMap[id];
  component?.protoTypes?.forEach((p) => {
    if (p.name === name) {
      p.default = value;
    }
  });
};
const findComponent = (type, id) => {
  return JSON.parse(JSON.stringify({ ...components[type], id }));
};

const addItemToOrigin = (parentId, component, origin) => {
  if (origin.id === parentId && origin.children) {
    origin.children.push(component);
  } else if (origin?.children?.length) {
    origin.children.forEach((o) => {
      addItemToOrigin(parentId, component, o);
    });
  }
};
