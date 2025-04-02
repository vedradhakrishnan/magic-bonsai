import '../styles/globals.css';
// import '@coinbase/onchainkit/styles.css'; 

import { WalletProvider } from '../providers/WalletProvider';

export default function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}
