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
`;

export const SecondSection = styled.div`
  width: 100%;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #F8F9FA;
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
