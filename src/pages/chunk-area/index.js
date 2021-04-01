import styled from '@emotion/styled';
import { components } from './../../chunk-config/component-list';

export const ChunkArea = () => {
  return Object.entries(components).map((item, index) => {
    return (
      <EleItem data-type={item[0]} draggable="true" key={index}>
        {item[1].name}
      </EleItem>
    );
  });
};

const EleItem = styled.span`
  padding: 4px 12px;
  border: 1px solid #fff;
  cursor: pointer;
  float: left;
  margin: 2px 5%;
  width: 40%;
  text-align: center;
  border-radius: 4px;
`;
