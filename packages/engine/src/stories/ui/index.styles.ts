import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const ComponentsContainer = styled.div`
  display: flex;
  flex: 0.3;
  background-color: red;
  height: 100vh;
`;
const BuilderContainer = styled.div`
  display: flex;
  flex: 0.7;
  background-color: blue;
  height: 100vh;
  form {
    width: 100%;
  }
`;

export { Container, ComponentsContainer, BuilderContainer };
