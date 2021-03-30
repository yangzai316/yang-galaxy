import { chunksMap } from './component-config';

export const getChunk = (type) => {
  return chunksMap[type] || '';
};

export const addChunk = (id, data, item) => {
  const newData = setChunk(id, data, item);
  return JSON.parse(JSON.stringify(newData));
};

const setChunk = (id, data, item) => {
  if (data.id === id) {
    data.children.push(item);
    return data;
  } else if (data?.children?.length) {
    data.children.forEach((item) => {
      setChunk(id, item);
    });
  } else {
    alert('findChunk is error');
  }
};
