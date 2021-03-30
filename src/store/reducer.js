import { ADD,SET } from './action';

export const reducer = function (state, action) {
  switch (action.type) {
    case ADD:
      state = JSON.parse(JSON.stringify(state));
      state.container.children.push(action.value);
      return state;
    case SET: 
      return {...state,currentChunkData:action.value};
    default:
      return state;
  }
};
