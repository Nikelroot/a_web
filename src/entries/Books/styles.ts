import styled from 'styled-components'

export const BooksStyled = styled.div``
export const BooksListStyled = styled.div``
export const BookStyled = styled.div`
  .title {
    border-left: 2px solid #305ddd;
    padding-left: 3px;
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 3px;

    .ant-btn {
      margin-left: auto;
    }

    &.active {
      color: #305ddd;
    }
  }
  .files {
    padding-left: 15px;
  }
`
export const FileStyled = styled.div`
  cursor: pointer;

  &:hover,
  &.active {
    color: #305ddd;
  }
`
