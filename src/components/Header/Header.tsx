'use client';
import React from 'react';
import { RiCoinsFill } from 'react-icons/ri';
import { BiSolidUserCircle } from 'react-icons/bi';

import { WalletButtonsEdit, Container, User } from './Styles';

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
      <h1>
        <RiCoinsFill size={40} />
      </h1>
      <nav>
        <WalletButtonsEdit>
          <DynamicWalletButton />
          <DynamicWalletDisconnectButton />
        </WalletButtonsEdit>

        <User>
          <BiSolidUserCircle size={30} />
          <span>User</span>
        </User>
      </nav>
    </Container>
  );
}
