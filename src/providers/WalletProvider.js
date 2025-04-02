import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains';
import 'dotenv/config';

export function WalletProvider({ children }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia}
      config={{
        appearance: {
          name: 'MagicBons.ai',
          logo: 'https://your-logo-url.com/logo.svg', 
          mode: 'auto',
          theme: 'default',
        },
        wallet: {
          display: 'modal', 
          termsUrl: 'https://example.com/terms',
          privacyUrl: 'https://example.com/privacy',
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
