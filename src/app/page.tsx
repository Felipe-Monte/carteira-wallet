'use client';
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Container, Content } from './Styles';
import IconSolana from '@/components/IconSolana';
import Loading from '@/components/Loading/Loading';

const SOLANA_NETWORK = 'https://api.devnet.solana.com';

export default function Home() {
  const { connected, publicKey } = useWallet();
  const [solBalance, setSolBalance] = React.useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!publicKey) return;

    setLoading(true);

    const connection = new Connection(SOLANA_NETWORK);

    async function fetchBalances() {
      try {
        // Buscar saldo sol
        const balance = await connection.getBalance(publicKey as PublicKey);
        setSolBalance(balance / 1_000_000_000);

        // Buscar saldo usd
        const USDC_MINT = new PublicKey(
          'EwHyD1eVxGkYPzZRMYEM2qfxuFUokFihh2owwbfL7YNr',
        );

        const tokens = await connection.getParsedTokenAccountsByOwner(
          publicKey as PublicKey,
          { programId: TOKEN_PROGRAM_ID },
        );

        const usdcAccount = tokens.value.find(
          (t) => t.account.data.parsed.info.mint === USDC_MINT.toBase58(),
        );

        setUsdcBalance(
          usdcAccount
            ? usdcAccount.account.data.parsed.info.tokenAmount.uiAmount
            : 0,
        );
      } catch (error) {
        console.error('Error ao buscar saldo', error);
      }
      setLoading(false);
    }

    fetchBalances();
  }, [publicKey]);

  return (
    <Container>
      <h1>Minha Carteira Solana</h1>

      {publicKey && (
        <Content>
          <div>
            <strong>Endereço:</strong> {publicKey.toBase58()}
            <button>Copy Adress</button>
          </div>
          <div>
            <strong> Saldo SOL:</strong>{' '}
            {loading ? (
              <Loading />
            ) : solBalance !== null ? (
              <>
                <IconSolana />
                {solBalance.toFixed(4)}
              </>
            ) : (
              'Error'
            )}
          </div>
          <div>
            <strong>Saldo USDC:</strong>{' '}
            {loading ? (
              <Loading />
            ) : usdcBalance !== null ? (
              <>
                <IconSolana />
                {usdcBalance.toFixed(4)}
              </>
            ) : (
              'Error'
            )}
          </div>
        </Content>
      )}
    </Container>
  );
}
