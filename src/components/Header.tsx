'use client';

import Link from 'next/link';
import styles from './Header.module.css'

import dynamic from "next/dynamic";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Impede erro de hidratação no Next.js
const DynamicWalletButton = dynamic(
  () => Promise.resolve(WalletMultiButton),
  { ssr: false }
);

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>My app</h1>
      <nav>
      <DynamicWalletButton />
      </nav>
    </header>
  );
}
