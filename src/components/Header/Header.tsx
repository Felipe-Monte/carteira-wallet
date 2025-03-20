'use client';
import { Container, FirstSection, SecondSection, WalletButtonsEdit } from './Styles'

import dynamic from 'next/dynamic';

import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';

// Impedir erro de hidratação nos botões
const DynamicWalletButton = dynamic(() => Promise.resolve(WalletMultiButton), {
  ssr: false,
});

const DynamicWalletDisconnectButton = dynamic(
  () => Promise.resolve(WalletDisconnectButton),
  {
    ssr: false,
  },
);

export default function Header() {
  return (
    <Container>
      <FirstSection>
        <span>B</span>

        <nav>
          <a href="">Home</a>
          <a href="">Dashboard</a>
          <a href="">Orders</a>
          <a href="">Products</a>
          <a href="">Customers</a>
        </nav>
      </FirstSection>

      <SecondSection>
        <input type="text" placeholder="Pesquisar" />

        <WalletButtonsEdit>
          <DynamicWalletButton />
          <DynamicWalletDisconnectButton />
        </WalletButtonsEdit>
      </SecondSection>
    </Container>
  );
}
