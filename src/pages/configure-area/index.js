import { useCallback, useContext, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { RootContext } from './../../context';
import { Switch, Input, Select, Form, Divider, Button, Popover, message } from 'antd';
import { MinusCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

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
          <DividerBox>组件属性</DividerBox>
          <p></p>
          <FormBox>
            <ViewConfigure attributes={currentChunkData.protoTypes} id={currentChunkData.id} type="protoType"></ViewConfigure>
          </FormBox>
        </>
      ) : null}
      {/* 下拉项设置 设置 */}
      {currentChunkData.type === 'Select' ? (
        <>
          <DividerBox>下拉项设置</DividerBox>
          <FormBox>
            <Form.Item label="下拉内容：">
              <Select options={currentChunkData.options}></Select>
            </Form.Item>
            <Form.Item colon={false} label=" ">
              <AddOptionItem id={currentChunkData.id} options={currentChunkData.options}>
                添加下拉选项内容
              </AddOptionItem>
            </Form.Item>
          </FormBox>
        </>
      ) : null}
      {/* 组件样式 设置 */}
      {currentChunkData.style ? (
        <>
          <DividerBox>组件样式</DividerBox>
          <FormBox>
            <ViewConfigure attributes={currentChunkData.style} id={currentChunkData.id} type="style"></ViewConfigure>
          </FormBox>
        </>
      ) : null}
    </>
  ) : (
    <Text>无组件获得焦点</Text>
  );
};
// 循环+递归 渲染 json =处理=> protoTypes & style
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

const DividerBox = ({ children }) => (
  <Divider orientation="left" plain style={{ margin: '0 0 6px 0' }}>
    {children}
  </Divider>
);

const FormBox = ({ children }) => (
  <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
    {children}
  </Form>
);

const AddOptionItem = ({ children, id, options }) => {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({
    label: '',
    value: '',
  });
  const { setSelectOption } = useContext(RootContext);
  const sure = () => {
    if (options.some((o) => o.value === +item.value)) {
      return message.error('操作失败：添加的 KEY 在历史Options中已存在');
    }
    setVisible(false);
    options.push(item);
    setSelectOption(id, options);
  };
  const content = (
    <div>
      <EmInput
        placeholder="下拉项Label"
        value={item.label}
        onChange={(e) => {
          setItem({
            label: e.target.value,
            value: item.value,
          });
        }}
      />
      <EmInput
        placeholder="下拉项Value"
        value={item.value}
        onChange={(e) => {
          setItem({
            label: item.label,
            value: e.target.value,
          });
        }}
      />
      <Button type="text" onClick={sure}>
        确定
      </Button>
    </div>
  );
  return (
    <>
      <Popover
        content={content}
        title="添加下拉项："
        trigger="click"
        visible={visible}
        onVisibleChange={(visible) => {
          setVisible(visible);
        }}
      >
        <Button type="dashed" block icon={<PlusOutlined />}>
          {children}
        </Button>
      </Popover>
    </>
  );
};

const EmInput = styled(Input)`
  width: 200px;
  margin-bottom: 4px;
  display: block;
`;
