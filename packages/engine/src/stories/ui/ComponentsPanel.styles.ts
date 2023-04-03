import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: bisque;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export { Container, Row };
