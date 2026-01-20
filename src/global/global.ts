import { createGlobalStyle } from 'styled-components'

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
  }
 #wrap {
   background: #305DDD;
   color: #fff;
   flex: 1 auto;
   width: 100%;
   overflow: hidden;
   min-width: 420px;
   font-size: 16px;
 }
 
 @media (min-width:1024px) {
   #wrap {
     background: red;
   }
 }
`
