export const chunksMap = {
  Button: {
    type: 'Button',
    name: '按钮',
    protoTypes: [
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
