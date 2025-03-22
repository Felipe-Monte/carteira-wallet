'use client';
import React from 'react';

import { TbCurrencySolana } from 'react-icons/tb';
import { AiOutlineDollar } from 'react-icons/ai';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

import {
  Container,
  Content,
  ContainerContentValue,
  ContentValue,
} from './Styles';

import Loading from '@/components/Loading/Loading';

const SOLANA_NETWORK = 'https://api.devnet.solana.com';

export default function Home() {
  const copyRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(false);

  const { connected, publicKey } = useWallet();
  const [solBalance, setSolBalance] = React.useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = React.useState<number | null>(null);

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

  function handleCopy() {
    if (copyRef.current) {
      const copyWalletAddress = copyRef.current.innerText;
      console.log(copyWalletAddress)
    }
  }

  return (
    <Container>
      <h1>Minha Carteira Solana</h1>

      {publicKey && (
        <Content>
          <ContainerContentValue>
            <ContentValue>
              <strong> Saldo SOL:</strong>{' '}
              {loading ? (
                <Loading />
              ) : solBalance !== null ? (
                <>
                  <TbCurrencySolana size={30} />
                  {solBalance.toFixed(4)}
                </>
              ) : (
                'Error'
              )}
            </ContentValue>
            <ContentValue>
              <strong>Saldo USDC:</strong>{' '}
              {loading ? (
                <Loading />
              ) : usdcBalance !== null ? (
                <>
                  <AiOutlineDollar size={30} />
                  {usdcBalance.toFixed(4)}
                </>
              ) : (
                'Error'
              )}
            </ContentValue>
          </ContainerContentValue>

          <div>
            <strong>Endereço:</strong>{' '}
            <p ref={copyRef}>{publicKey.toBase58()}</p>
            <button onClick={handleCopy}>Copy Address</button>
          </div>
        </Content>
      )}
    </Container>
  );
}
