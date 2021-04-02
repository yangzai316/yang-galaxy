import styled from '@emotion/styled';
import { components } from './../../chunk-config/component-list';

export const ChunkArea = () => {
  return Object.values(components).map((item, index) => {
    return (
      <EleItem data-type={item.type} draggable="true" key={index}>
        {item.name}
      </EleItem>
    );
  });
};

const EleItem = styled.span`
  padding: 2px 12px;
  border: 1px solid #383838;
  cursor: pointer;
  float: left;
  margin: 2px 5%;
  width: 40%;
  text-align: center;
  font-size: 12px;
  border-radius: 0px;
  background-color: #383838;
  &:hover {
    border: 1px dashed #fff;
  }
`;
