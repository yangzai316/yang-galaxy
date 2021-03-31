import React from 'react';
import { Index } from './../pages/index';
import { getChunk, addChunk, setChunk } from './../chunk-config';

export const rootData = {
  container: {
    id: '1',
    type: 'div',
    children: [],
  },
  current: null,
  setContainer: () => {},
  setCurrent: () => {},
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
    this.setCurrent = (id, name, value) => {
      this.setState((root) => {
        root.current.protoTypes.find((o) => o.name === name).default = value;
        const container = setChunk(id, root.container, root.current);
        return {
          container,
          current: root.current,
        };
      });
    };

    this.state = {
      container: rootData.container,
      setContainer: this.setContainer,
      setCurrent: this.setCurrent,
    };
  }

  render() {
    return (
      <RootContext.Provider value={this.state}>
        <Index />
      </RootContext.Provider>
    );
  }
}
