import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
      margin:0;
      padding:0;
  }
  body,html{
    width:100%;
    height:100%;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    position:relative;
    .obstacle-toaster{
      position:absolute;
    }
  }
`;
export default GlobalStyle;
