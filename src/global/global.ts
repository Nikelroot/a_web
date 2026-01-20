import styled, { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    min-height: 100vh;
  }
  html,body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 auto;
    font-family: var(--font-inter);
    color: #212121;
  }
  
  #wrap {
    display: flex;
    flex: 1 auto;
    background: #305ddd;
    width: 100%;
    overflow: hidden;
    min-width: 420px;
    font-size: 16px;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
  }
`

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  ${(props) =>
    props.$type !== 'login' &&
    css`
      justify-content: space-between;
      flex: 1 auto;
      gap: 5px;
      .content {
        flex: 1 auto;
        background: #fff;
        border-radius: 2px;
        padding: 10px;
      }
    `};

  ${(props) =>
    props.$type === 'login' &&
    css`
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      width: 100%;
      height: 100%;
      flex: 1 auto;
      min-height: 100vh;
    `};

  //@media (min-width: 1024px) {
  //  display: flex;
  //  justify-content: space-between;
  //  gap: 5px;
  //  padding: 5px;
  //}
`
