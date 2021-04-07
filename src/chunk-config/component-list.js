export const components = {
  Form: {
    type: 'Form',
    name: '表单',
    protoTypes: [
      { name: 'labelAlign', type: 'select', default: 'right', options: ['right', 'left'] },
      { name: 'layout', type: 'select', default: 'right', options: ['inline', 'vertical', 'vertical'] },
    ],
    style: [
      { name: 'width', type: 'input', default: '100%' },
      { name: 'height', type: 'input', default: '100%' },
    ],
    children: [],
  },
  'Form.Item': {
    type: 'Form.Item',
    name: '表单项',
    protoTypes: [
      { name: 'label', type: 'input', default: '' },
      { name: 'labelAlign', type: 'select', default: 'right', options: ['right', 'left'] },
    ],
    style: [
      { name: 'width', type: 'input', default: '100%' },
      { name: 'height', type: 'input', default: '100%' },
    ],
    children: [],
  },
  Select: {
    type: 'Select',
    name: '下拉选择器',
    protoTypes: [
      { name: 'allowClear', type: 'switch', default: false },
      { name: 'bordered', type: 'switch', default: true },
      { name: 'placeholder', type: 'input', default: '请输入...' },
      { name: 'defaultValue', type: 'input', default: '' },
      { name: 'disabled', type: 'switch', default: false },
      { name: 'size', type: 'select', default: 'middle', options: ['large', 'middle', 'small'] },
    ],
    options: [
      {
        value: 1,
        label: '第一个',
      },
    ],
  },
  Input: {
    type: 'Input',
    name: '输入框',
    protoTypes: [
      { name: 'allowClear', type: 'switch', default: false },
      { name: 'bordered', type: 'switch', default: true },
      { name: 'placeholder', type: 'input', default: '请输入...' },
      { name: 'defaultValue', type: 'input', default: '' },
      { name: 'maxLength', type: 'input', default: '' },
    ],
  },
  Button: {
    type: 'Button',
    name: '按钮',
    protoTypes: [
      { name: 'content', type: 'input', default: '按钮' },
      { name: 'block', type: 'switch', default: false },
      { name: 'danger', type: 'switch', default: false },
      { name: 'disabled', type: 'switch', default: false },
      { name: 'ghost', type: 'switch', default: false },
      { name: 'href', type: 'input', default: '' },
      { name: 'htmlType', type: 'input', default: '' },
      { name: 'icon', type: 'input', default: '' },
      { name: 'loading', type: 'switch', default: false },
      { name: 'shape', type: 'select', default: '', options: ['round', 'circle'] },
      { name: 'target', type: 'input', default: '' },
      { name: 'type', type: 'select', default: 'default', options: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'] },
      { name: 'size', type: 'select', default: 'middle', options: ['large', 'middle', 'small'] },
    ],
  },
};
