import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: red;
`;

const Item = styled.div<{
  padding: string;
  selected: boolean;
  overed: boolean;
}>`
  padding-left: ${({ padding }) => `${padding}rem`};
  & > p {
    font-weight: ${({ selected }) => (selected ? 700 : 400)};
    color: ${({ overed, selected }) =>
      overed && !selected ? "grey" : "black"};
  }
`;

export { Item, Container };
