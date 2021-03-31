import React from 'react';
import { Index } from './../pages/index';

import { chunkMap } from './../chunk-config/map.js';
import { chunkOrigin } from './../chunk-config/origin.js';
import { addItemToRootData, setItemProtoType } from './../chunk-config';

export const rootData = {
  container: chunkOrigin,
  current: null,
  setContainer: () => {},
  setCurrent: () => {},
};

export const RootContext = React.createContext(rootData);

export class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    // 处理 中间 操作区 的 json
    this.setContainer = (parentId, id, type) => {
      addItemToRootData(parentId, id, type);
      const container = JSON.parse(JSON.stringify(chunkOrigin));
      const current = JSON.parse(JSON.stringify(chunkMap[id]));
      this.setState(() => {
        return {
          container,
          current,
        };
      });
    };
    // 处理 左侧 当前组件 配置项 的 json
    this.setCurrent = (id, name, value) => {
      setItemProtoType(id, name, value);
      const container = JSON.parse(JSON.stringify(chunkOrigin));
      const current = JSON.parse(JSON.stringify(chunkMap[id]));
      this.setState(() => {
        return {
          container,
          current,
        };
      });
    };
    // 返回 state (包含设置function)
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
