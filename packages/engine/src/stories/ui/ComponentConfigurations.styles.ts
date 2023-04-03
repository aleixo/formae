import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  width: 50%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Container, Row, Col };
