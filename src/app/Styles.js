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

  div > button {
    padding: 10px;
    background: #512DA8;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;

    &:hover{
      background-color: #1A1F2E;
    }

    &:active {
      background-color: #512DA8;
    }
  }
`;
