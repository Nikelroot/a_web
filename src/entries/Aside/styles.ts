import styled from 'styled-components'

export const AsideStyled = styled.div`
  border-radius: 2px;
  background: #fff;
  min-width: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  a {
    text-decoration: none;
    color: initial;

    &:hover,
    &.active {
      color: #305ddd;
    }
  }
`
