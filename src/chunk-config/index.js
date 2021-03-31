import { chunksMap } from './component-config';

export const getChunk = (type) => {
  return chunksMap[type] || '';
};

export const addChunk = (id, data, item) => {
  const newData = _add(id, data, item);
  return JSON.parse(JSON.stringify(newData));
};
export const setChunk = (id, data, item) => {
  const newData = _set(id, data, item);
  console.log(newData);
  return JSON.parse(JSON.stringify(newData));
};

const _add = (id, data, item) => {
  if (data.id === id) {
    data.children.push(item);
    return data;
  } else if (data?.children?.length) {
    data.children.forEach((item) => {
      _add(id, item);
    });
  } else {
    alert('findChunk is error');
  }
};
const _set = (id, data, item) => {
  if (data.id === id) {
    data.protoTypes = item.protoTypes;
    return data;
  } else if (data?.children?.length) {
    data.children.forEach((o) => {
      _set(id, o, item);
    });
  } else {
    alert('findChunk is error');
  }
  return data;
};
