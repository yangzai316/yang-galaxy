import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(reducer, {
  container: {
    id:'1',
    type: 'div',
    children: []
  },
  currentChunkData: null,
});

export default store;
