'use client';
import { useEffect, useState } from 'react';
import { TbCurrencySolana } from 'react-icons/tb';
import { AiOutlineDollar } from 'react-icons/ai';

import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

import {
  Container,
  Content,
  ContainerContentValue,
  ContentValue,
} from './Styles';
import Loading from '@/components/Loading/Loading';
import { useSolanaConnection } from '@/hooks/useSolanaConnection';

export default function Home() {
  const { publicKey } = useWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { getBalance, getParsedTokenAccountsByOwner } = useSolanaConnection();

  const fetchBalances = async () => {
    setLoading(true);
    try {
      // Buscar saldo sol
      const balance = await getBalance();
      setSolBalance(balance / 1_000_000_000);
      // Buscar saldo usd
      const tokens = await getParsedTokenAccountsByOwner();
      const USDC_MINT = new PublicKey(
        process.env.NEXT_PUBLIC_SOLANA_KEY as string,
      );

      const usdcAccount = tokens.value.find(
        (t) => t.account.data.parsed.info.mint === USDC_MINT?.toBase58(),
      );

      setUsdcBalance(
        usdcAccount?.account?.data?.parsed?.info?.tokenAmount?.uiAmount || 0,
      );
    } catch (error) {
      console.error('Error ao buscar saldo', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!publicKey) return;

    fetchBalances();
  }, [publicKey]);

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
            <strong>Endereço:</strong> {publicKey?.toBase58()}
            <button>Copy Adress</button>
          </div>
        </Content>
      )}
    </Container>
  );
}
