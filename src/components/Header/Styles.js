import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background: black;
`;

export const FirstSection = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #212529;

  > nav {
    display: flex;
    gap: 22px;
  }

  > nav > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

export const SecondSection = styled.div`
  width: 100%;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #f8f9fa;

  > input {
    padding: 10px;
    color: black;
    border: 1px solid gray;
    outline: none;
    border-radius: 8px;
    background-color: #f8f9fa;
  }
`;

export const WalletButtonsEdit = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .wallet-adapter-button {
    height: 0;
    padding: 20px 16px;
  }
`;
