import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useCallback } from 'react';

export const useSolanaConnection = () => {
  const { publicKey } = useWallet();

  const connection = new Connection(
    process.env.NEXT_PUBLIC_SOLANA_API_BASE_URL as string,
  );

  const getBalance = useCallback(async () => {
    return await connection.getBalance(publicKey as PublicKey);
  }, [publicKey]);

  const getParsedTokenAccountsByOwner = useCallback(async () => {
    return await connection.getParsedTokenAccountsByOwner(
      publicKey as PublicKey,
      { programId: TOKEN_PROGRAM_ID },
    );
  }, [publicKey]);

  return {
    publicKey,
    getBalance,
    getParsedTokenAccountsByOwner,
  };
};
