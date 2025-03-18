'use client';

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
      <h1>My app</h1>
      <nav className={styles.nav}>
        <DynamicWalletButton />
        <WalletDisconnectButton />
        <div>100,00 SOL</div>
      </nav>
    </header>
  );
}
