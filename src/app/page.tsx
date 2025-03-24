'use client';
import { useEffect, useState, useRef } from 'react';
import { TbCurrencySolana } from 'react-icons/tb';
import { AiOutlineDollar } from 'react-icons/ai';

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
  const copyRef = useRef<HTMLParagraphElement>(null);

  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { publicKey, getBalance, getParsedTokenAccountsByOwner } =
    useSolanaConnection();

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

  const handleCopy = async () => {
    if (copyRef.current) {
      try {
        const textCopy = copyRef.current.textContent ?? 'Chave vazia';
        await navigator.clipboard.writeText(textCopy);
        alert('Chave copiada!');
      } catch (err) {
        console.error('Error ao copiar chave', err);
      }
    }
  };

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
            <strong>Endereço:</strong>
            <p ref={copyRef}>{publicKey?.toBase58()}</p>
            <button onClick={handleCopy}>Copy Adress</button>
          </div>
        </Content>
      )}
    </Container>
  );
}
