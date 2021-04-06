import { useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import { RootContext } from './../../context';
import { Switch, Input, Select, Form, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// 渲染 左侧 参数配置区域
export const ConfigureArea = () => {
  const { current: currentChunkData, deleteCurrentChunk } = useContext(RootContext);
  const deleteCurrent = useCallback(() => {
    return deleteCurrentChunk(currentChunkData.id);
  }, [currentChunkData, deleteCurrentChunk]);
  return currentChunkData ? (
    <>
      <Text>
        <span>{currentChunkData.name}</span>
        {currentChunkData.id !== 1 ? <DeleteOutlined onClickCapture={deleteCurrent} /> : null}
      </Text>
      {/* 组件属性 设置 */}
      {currentChunkData.protoTypes ? (
        <>
          <Divider orientation="left" plain style={{ margin: '0 0 6px 0' }}>
            组件属性
          </Divider>
          <p></p>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <ViewConfigure attributes={currentChunkData.protoTypes} id={currentChunkData.id} type="protoType"></ViewConfigure>
          </Form>
        </>
      ) : null}
      {/* 组件样式 设置 */}
      {currentChunkData.style ? (
        <>
          <Divider orientation="left" plain style={{ margin: '0 0 6px 0' }}>
            组件样式
          </Divider>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <ViewConfigure attributes={currentChunkData.style} id={currentChunkData.id} type="style"></ViewConfigure>
          </Form>
        </>
      ) : null}
    </>
  ) : (
    <Text>无组件获得焦点</Text>
  );
};
// 循环+递归 渲染 json
const ViewConfigure = ({ attributes, id, type }) => {
  if (attributes?.length) {
    return attributes.map((item, index) => {
      return <RenderConfigure type={type} protoType={item} id={id} key={index}></RenderConfigure>;
    });
  }
  return null;
};
// 将组件配置项 具体 渲染 antD 组件
const RenderConfigure = ({ protoType, id, type }) => {
  const { setCurrent } = useContext(RootContext);
  const onChange = (id, name, value) => {
    setCurrent(id, name, value, type);
  };
  switch (protoType.type) {
    case 'switch':
      return (
        <Form.Item label={protoType.name}>
          <Switch
            size="small"
            checked={protoType.default}
            onChange={(value) => {
              onChange(id, protoType.name, value);
            }}
          />
        </Form.Item>
      );
    case 'input':
      return (
        <Form.Item label={protoType.name}>
          <Input
            value={protoType.default}
            onChange={(e) => {
              onChange(id, protoType.name, e.target.value);
            }}
          />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item label={protoType.name}>
          <Select
            defaultValue={protoType.default}
            onChange={(value) => {
              onChange(id, protoType.name, value);
            }}
          >
            {protoType.options.map((item) => {
              return (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    default:
      return (
        <Form.Item label={protoType.name}>
          <span>&gt;无对应配置组件&lt;</span>
        </Form.Item>
      );
  }
};

const Text = styled.p`
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  & > span {
    font-size: 14px;
  }
  & > .anticon {
    cursor: pointer;
    color: red;
    font-size: 18px;
  }
`;
