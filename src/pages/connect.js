import '@coinbase/onchainkit/styles.css'; // ✅ Scoped to this file only
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Address } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import { useEffect } from 'react';

export default function ConnectPage() {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      fetch('/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: address }),
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.error('Wallet POST failed:', err);
        });
    }
  }, [address]);


  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Log in with your wallet</h1>

      <Wallet>
        <ConnectWallet 
          onConnect={() => {
            if (address) {
              fetch('/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wallet: address }),
              }) .then(() => window.location.reload())
              .catch((err) => {
                console.error('Wallet POST failed:', err);
              });
            }
          }}    
        >
          <Avatar />
          <Name />
        </ConnectWallet>

        <WalletDropdown>
          <Avatar />
          <Name />
          <Address />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
// "use client"

// import "@coinbase/onchainkit/styles.css" // ✅ Scoped to this file only
// import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet"
// import { Avatar, Name, Address } from "@coinbase/onchainkit/identity"
// import { useAccount } from "wagmi"
// import { useEffect } from "react"

// export default function ConnectPage() {
//   const { address } = useAccount()

//   useEffect(() => {
//     if (address) {
//       fetch("/connect", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ wallet: address }),
//       })
//         .then((res) => {
//           window.location.reload()
//         })
//         .catch((err) => {
//           console.error("Wallet POST failed:", err)
//         })
//     }
//   }, [address])

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
//           <p className="text-gray-600 mb-6">Log in with your wallet to continue</p>
//         </div>

//         <Wallet>
//           <div className="flex flex-col items-center space-y-4">
//             <ConnectWallet
//               onConnect={() => {
//                 if (address) {
//                   fetch("/connect", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ wallet: address }),
//                   })
//                     .then(() => window.location.reload())
//                     .catch((err) => {
//                       console.error("Wallet POST failed:", err)
//                     })
//                 }
//               }}
//               className="w-full py-3 px-4 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
//             >
//               <div className="flex items-center space-x-3">
//                 <Avatar className="w-6 h-6" />
//                 <Name className="font-medium" />
//               </div>
//             </ConnectWallet>

//             <WalletDropdown className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center space-x-3">
//                 <Avatar className="w-10 h-10" />
//                 <div className="flex flex-col">
//                   <Name className="font-semibold text-gray-900" />
//                   <Address className="text-sm text-gray-500" />
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <WalletDropdownDisconnect className="text-red-500 hover:text-red-600 font-medium" />
//               </div>
//             </WalletDropdown>
//           </div>
//         </Wallet>

//         <div className="text-center text-sm text-gray-500 mt-6">
//           <p>By connecting your wallet, you agree to our Terms of Service</p>
//         </div>
//       </div>
//     </div>
//   )
// }

