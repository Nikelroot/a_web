import styled from 'styled-components'

export const BigLogoStyled = styled.div`
  flex-direction: column;
  display: flex;
  line-height: 1.2;

  position: relative;

  .service {
    font-size: 8rem;
    font-family: var(--font-prata);
    span {
      font-family: var(--font-rethink);
    }
  }
  .domain {
    font-size: 1.2rem;
    position: absolute;
    right: 0;
    bottom: 0;
    font-family: var(--font-rethink);
  }
`
