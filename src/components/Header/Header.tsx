'use client';
import React from 'react';
import { RiCoinsFill } from 'react-icons/ri';

import { Container } from "./Styles"

import dynamic from 'next/dynamic';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';

// Impedir erro de hidratação nos botões
const DynamicWalletButton = dynamic(() => Promise.resolve(WalletMultiButton), {
  ssr: false,
});

const DynamicWalletDisconnectButton  = dynamic(() => Promise.resolve(WalletDisconnectButton), {
  ssr: false,
});

export default function Header() {
  return (
    <Container>
      <h1>
        <RiCoinsFill size={30} />
        Wallet
      </h1>
      <nav>
        <DynamicWalletButton />
        <DynamicWalletDisconnectButton />
        <div>
          <p>$10,00 SOL</p>
        </div>
      </nav>
    </Container>
  );
}
