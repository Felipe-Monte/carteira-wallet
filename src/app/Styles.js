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

  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  > p {
    margin-bottom: 10px;
  }

  div > button {
    margin-left: 10px;
    padding: 10px;
    background: #512da8;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #1a1f2e;
    }

    &:active {
      background-color: #512da8;
    }
  }
`;

export const ContainerContentValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const ContentValue = styled.div`
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  border: 1px solid white;
  border-radius: 8px;
`;
