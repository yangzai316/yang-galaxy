import React from 'react';
import { Index } from './../pages/index';

import { chunkMap } from './../chunk-config/map.js';
import { chunkOrigin } from './../chunk-config/origin.js';
import { addItemToRootData, setItemProtoType, setItemStyle, deleteItemFromRootData } from './../chunk-config';

export const rootData = {
  container: chunkOrigin,
  current: chunkOrigin,
  setContainer: () => {},
  setCurrent: () => {},
  focusCurrent: () => {},
  deleteCurrentChunk: () => {},
};

export const RootContext = React.createContext(rootData);

export class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    // 【新增】
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
    // 【编辑】
    this.setCurrent = (id, name, value, type) => {
      if (type === 'protoType') {
        setItemProtoType(id, name, value);
      } else if (type === 'style') {
        setItemStyle(id, name, value);
      }

      const container = JSON.parse(JSON.stringify(chunkOrigin));
      const current = JSON.parse(JSON.stringify(chunkMap[id]));
      this.setState(() => {
        return {
          container,
          current,
        };
      });
    };
    // 【获焦】将左侧属性设置栏，聚焦到点击的组件上
    this.focusCurrent = (id) => {
      const current = JSON.parse(JSON.stringify(chunkMap[id]));

      this.setState(() => {
        return {
          current,
        };
      });
    };
    // 【移除】删除选中的组件
    this.deleteCurrentChunk = (id) => {
      console.log(id);
      deleteItemFromRootData(id);
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
      current: rootData.current,
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
