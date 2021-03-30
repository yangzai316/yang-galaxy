import { useContext } from 'react';
import { RootContext } from './../../context';
import { Switch, Input, Select, Form } from 'antd';
// 导出 参数配置区域
export const ConfigureArea = () => {
  const { current: currentChunkData } = useContext(RootContext);
  return currentChunkData ? (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
      <ViewConfigure currentChunkData={currentChunkData}></ViewConfigure>
    </Form>
  ) : (
    ''
  );
};
// 左侧 参数配置区域 渲染逻辑处理
const ViewConfigure = ({ currentChunkData }) => {
  if (currentChunkData?.protoTypes?.length) {
    return currentChunkData.protoTypes.map((item, index) => {
      return <RenderConfigure protoType={item} key={index}></RenderConfigure>;
    });
  }
  return '';
};
// 左侧 component 渲染
const RenderConfigure = ({ protoType }) => {
  switch (protoType.type) {
    case 'switch':
      return (
        <Form.Item label={protoType.name}>
          <Switch size="small" checked={protoType.default} />
        </Form.Item>
      );
    case 'input':
      return (
        <Form.Item label={protoType.name}>
          <Input />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item label={protoType.name}>
          <Select defaultValue={protoType.default}>
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
          <span>数据出错...</span>
        </Form.Item>
      );
  }
};
