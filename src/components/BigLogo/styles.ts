import styled from 'styled-components'

export const BigLogoStyled = styled.div`
  flex-direction: column;
  display: flex;
  line-height: 1 !important;

  position: relative;

  .service {
    font-size: 8rem;
    font-family: var(--font-prata);
    line-height: 1 !important;
    span {
      font-family: var(--font-rethink);
    }
  }
  .domain {
    font-size: 1.2rem;
    position: absolute;
    line-height: 1 !important;
    right: 0;
    bottom: 0;
    font-family: var(--font-rethink);
  }
`
