import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  text-align: center;
  padding: 20px;

  overflow: none;

  > h1 {
    margin-bottom: 10px;
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-top: 10px;

  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 700px) {
    padding: 0;
  }
`;

export const ContainerContentValue = styled.div`
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const ContentValue = styled.div`
  width: 300px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  border-radius: 8px;

  background: black;
`;

export const ContainerButtonCopy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px;

  > button {
    padding: 10px;

    font-weight: bold;

    background: #512da8;

    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #1a1f2e;
    }

    &:active {
      background-color: #512da8;
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 10px;
  }
`;
