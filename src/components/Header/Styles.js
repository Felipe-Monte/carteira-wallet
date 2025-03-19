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

    cursor: pointer;
  }

  > nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

export const User = styled.div`
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  cursor: pointer;

  > span {
    display: block;
  }
`;
