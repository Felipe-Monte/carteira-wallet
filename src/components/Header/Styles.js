import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 20px;
  background-color: #0a0a0a;

  > h1 {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  > nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
