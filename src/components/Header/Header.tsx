'use client';
import { PiWallet } from "react-icons/pi";
import { IoHomeOutline } from 'react-icons/io5';
import { TfiDashboard } from 'react-icons/tfi';
import { CiViewTable } from 'react-icons/ci';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';

import {
  Container,
  FirstSection,
  SecondSection,
  WalletButtonsEdit,
} from './Styles';

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
      <FirstSection>
        <span><PiWallet size={40}/></span>

        <nav>
          <a href="/">
            <IoHomeOutline size={22} />
            Home
          </a>
          <a href="/">
            <TfiDashboard size={22} />
            Dashboard
          </a>
          <a href="/">
            <CiViewTable size={22} />
            Orders
          </a>
          <a href="/">
            <AiOutlineProduct size={22} />
            Products
          </a>
          <a href="/">
            <FaRegUserCircle size={22} />
            Customers
          </a>
        </nav>
      </FirstSection>

      <SecondSection>
        <input type="text" placeholder="Pesquisar" />

        <WalletButtonsEdit>
          <DynamicWalletButton />
          <DynamicWalletDisconnectButton />
        </WalletButtonsEdit>
      </SecondSection>
    </Container>
  );
}
