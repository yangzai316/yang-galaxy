import { useCallback, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { RootContext } from './../../context';
import { Switch, Input, Select, Form, Divider, Button, message } from 'antd';
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

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
            <Form.Item label="下拉内容：" colon={false}>
              <SetOptionItem id={currentChunkData.id} options={currentChunkData.options}></SetOptionItem>
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

const SetOptionItem = ({ children, id, options }) => {
  const [list, setList] = useState([...options]);
  const { setSelectOption } = useContext(RootContext);
  // 点击【确定】
  const sure = (list) => {
    const cache = {};
    for (const item of list) {
      if (cache[item.value]) {
        return message.error('操作失败：存在相同的 KEY 值');
      }
      if (!item.value || !item.label) {
        return message.error('操作失败：存在 Value 或 Label 的值为空');
      }
      cache[item.value] = true;
    }

    setSelectOption(id, list);
    return message.success('操作成功');
  };
  // 点击【取消】
  const cancel = () => {
    setList([...options]);
  };
  // 点击【添加】
  const addItem = () => {
    setList((list) => {
      return list.concat({
        label: '',
        value: '',
      });
    });
  };
  // 点击【移除】
  const remove = (index) => {
    setList((old) => {
      const list = old.slice();
      list.splice(index, 1);
      return list;
    });
  };
  // 修改【key-value】
  const edit = (value, index, type) => {
    setList((old) => {
      const list = old.slice();
      list[index][type] = value;
      return list;
    });
  };

  return (
    <>
      <EmTitle>Value：</EmTitle>
      <EmTitle>Label：</EmTitle>

      {list.map((o, i) => {
        return (
          <div key={i}>
            <EmInput
              placeholder="Value"
              value={o.value}
              onChange={(e) => {
                edit(e.target.value, i, 'value');
              }}
            />
            <EmInput
              placeholder="Label"
              value={o.label}
              onChange={(e) => {
                edit(e.target.value, i, 'label');
              }}
            />
            &nbsp;
            <MinusCircleOutlined
              onClick={() => {
                remove(i);
              }}
            />
          </div>
        );
      })}
      <EmButton block size="small" icon={<PlusCircleOutlined />} onClick={addItem}>
        添加下拉选项
      </EmButton>
      <div>
        <Button onClick={cancel} size="small">
          取消
        </Button>
        &nbsp;
        <Button
          type="primary"
          size="small"
          onClick={() => {
            sure(list);
          }}
        >
          确定
        </Button>
      </div>
    </>
  );
};

const EmInput = styled(Input)`
  width: 76px;
  margin-bottom: 4px;
`;
const EmTitle = styled.p`
  width: 76px;
  display: inline-block;
  padding-left: 4px;
  margin-bottom: 4px;
`;

const EmButton = styled(Button)`
  margin: 6px 0;
`;
