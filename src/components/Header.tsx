'use client';
import React from 'react';

import styles from './Header.module.css';

import dynamic from 'next/dynamic';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';

// Impede erro de hidratação no Next.js
const DynamicWalletButton = dynamic(() => Promise.resolve(WalletMultiButton), {
  ssr: false,
});

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Solana</h1>
      <nav className={styles.nav}>
        <DynamicWalletButton />
        <WalletDisconnectButton />
        <div><p className={styles.sol}>Carregando...</p></div>
      </nav>
    </header>
  );
}
