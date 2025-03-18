"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import styles from './page.module.css'

const SOLANA_NETWORK = "https://api.devnet.solana.com";

// Impede erro de hidratação no Next.js
const DynamicWalletButton = dynamic(
  () => Promise.resolve(WalletMultiButton),
  { ssr: false }
);

export default function Home() {
  const { connected, publicKey } = useWallet();
  const [solBalance, setSolBalance] = React.useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!publicKey) return;

    const connection = new Connection(SOLANA_NETWORK);

    // Buscar saldo SOL
    connection.getBalance(publicKey).then((balance) => {
      setSolBalance(balance / 1_000_000_000); // Converter de lamports para SOL
    });

    // Buscar saldo USDC (endereço do token na Devnet)
    const USDC_MINT = new PublicKey("EwHyD1eVxGkYPzZRMYEM2qfxuFUokFihh2owwbfL7YNr");

    connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })
      .then((tokens) => {
        const usdcAccount = tokens.value.find(
          (t) => t.account.data.parsed.info.mint === USDC_MINT.toBase58()
        );
        setUsdcBalance(usdcAccount ? usdcAccount.account.data.parsed.info.tokenAmount.uiAmount : 0);
      });

  }, [publicKey]);

  return (
    <main className={styles.main}>
      <h1 className={styles.text_h1}>Minha Carteira Solana</h1>
      <DynamicWalletButton />

      {publicKey && (
        <div className={styles.balance_container}>
          <p className={styles.balance_container_item}><strong>Endereço:</strong> {publicKey.toBase58()}</p>
          <p className={styles.balance_container_item}><strong>Saldo SOL:</strong> {solBalance !== null ? solBalance.toFixed(4) : "Carregando..."}</p>
          <p className={styles.balance_container_item}><strong>Saldo USDC:</strong> {usdcBalance !== null ? usdcBalance.toFixed(2) : "Carregando..."}</p>
        </div>
      )}
    </main>
  );
}
