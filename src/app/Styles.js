import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: calc(100vh - 100px);
  text-align: center;
  padding: 20px;

  > h1 {
    margin-bottom: 10px;
  }
`;

export const Content = styled.div`
  margin-top: 10px;

  > p {
    margin-bottom: 10px;
  }
`;
