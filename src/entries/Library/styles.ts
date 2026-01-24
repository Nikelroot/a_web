import styled from 'styled-components'

export const LibraryStyled = styled.div``
export const LibraryListStyled = styled.div`
  width: 100%;
  display: block;
`
export const LibraryItemStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 5px 5px 5px 10px;
  background-color: #f5f5f5;
  font-size: 1rem;
  transition: background-color linear 0.25s;

  .title {
    flex: 1 auto;
    overflow: hidden;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  .ant-btn {
    min-width: 30px;
    min-height: 30px;
  }
`
