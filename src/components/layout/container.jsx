import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
`;
export default function Container({ children }) {
  return <ContainerWrapper>{children}</ContainerWrapper>;
}
