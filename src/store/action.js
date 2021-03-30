export const ADD = 'ADD';
export const SET = 'SET';



export const addChunk = function (chunk) { 
  return {
    type: ADD,
    value:chunk,
  };
};
export const setChunk = function (value) { 
  return {
    type: SET,
    value,
  };
};
