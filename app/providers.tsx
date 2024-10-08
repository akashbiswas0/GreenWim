"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

import {
  arbitrum,
  base,
  mainnet,
  opBNBTestnet,
  bscTestnet,
  optimism,
  polygon,
  polygonAmoy,
  filecoinCalibration,
  sepolia,
  optimismSepolia,
  zora,
  baseSepolia,
} from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
   sepolia,opBNBTestnet,baseSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({ ...darkTheme.accentColors.orange })} 
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}