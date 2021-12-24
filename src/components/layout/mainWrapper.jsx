import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
  & > div {
    align-self: center;
  }
`;
export default function MainWrapper({ children }) {
  return <Main>{children}</Main>;
}
