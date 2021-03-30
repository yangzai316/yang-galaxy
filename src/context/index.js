import React from 'react';
import { Index } from './../pages/index';
import { getChunk, addChunk } from './../chunk-config';

export const rootData = {
  container: {
    id: '1',
    type: 'div',
    children: [],
  },
  current: null,
  setContainer: () => {},
};

export const RootContext = React.createContext(rootData);

export class ContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.setContainer = (id, type, parentId) => {
      const item = getChunk(type);
      item.id = id;
      this.setState((root) => {
        const container = addChunk(parentId, root.container, item);

        return {
          container,
          current: item,
        };
      });
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      container: rootData.container,
      setContainer: this.setContainer,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <RootContext.Provider value={this.state}>
        <Index />
      </RootContext.Provider>
    );
  }
}
