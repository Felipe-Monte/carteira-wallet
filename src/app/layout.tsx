import Header from '@/components/Header';
import './globals.css';
import { WalletContextProvider } from '@/context/WalletProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-lt-installed="true">
      <body cz-shortcut-listen="true">
        <WalletContextProvider>
          <Header />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
