import styled from '@emotion/styled';

export const ChunkArea = () => {
  return (
    <>
      <EleItem data-type="Button" draggable="true">按钮</EleItem>
    </>
  );
};

const EleItem = styled.span`
  padding: 4px 12px;
  border: 1px solid #fff;
  cursor: pointer;
`;
