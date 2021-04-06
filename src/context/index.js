import React from 'react';
import { Index } from './../pages/index';

import { chunkMap } from './../chunk-config/map.js';
import { chunkOrigin } from './../chunk-config/origin.js';
import { addItemToRootData, setItemProtoType, deleteItem } from './../chunk-config';

export const rootData = {
  container: chunkOrigin,
  current: null,
  setContainer: () => {},
  setCurrent: () => {},
  focusCurrent: () => {},
  deleteCurrentChunk: () => {},
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
    // 将左侧属性设置栏，聚焦到点击的组件上
    this.focusCurrent = (id) => {
      const current = JSON.parse(JSON.stringify(chunkMap[id]));

      this.setState(() => {
        return {
          current,
        };
      });
    };
    // 删除选中的组件
    this.deleteCurrentChunk = (id) => {
      deleteItem(id);
      const container = JSON.parse(JSON.stringify(chunkOrigin));
      this.setState(() => {
        return {
          container,
          current: null,
        };
      });
    };

    // 返回 state (包含设置function)
    this.state = {
      container: rootData.container,
      setContainer: this.setContainer,
      setCurrent: this.setCurrent,
      focusCurrent: this.focusCurrent,
      deleteCurrentChunk: this.deleteCurrentChunk,
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
