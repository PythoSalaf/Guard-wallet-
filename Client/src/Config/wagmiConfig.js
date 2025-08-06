import { http, createConfig } from "wagmi";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";
import { defineChain } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// Define Morph Holesky Testnet
export const morphHolesky = defineChain({
  id: 2810,
  name: "Morph Holesky",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc-quicknode-holesky.morphl2.io"] } },
  blockExplorers: {
    default: {
      name: "Morph Explorer",
      url: "https://explorer-holesky.morphl2.io",
    },
  },
  chainNamespace: "eip155",
  caipNetworkId: "eip155:2710",
  testnet: true,
});

export const projectId = import.meta.env.VITE_PROJECT_ID;

export const wagmiAdapter = new WagmiAdapter({
  networks: [morphHolesky],
  projectId,
});

export const config = createConfig({
  chains: [morphHolesky],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: "Guard wallet" }),
  ],
  transports: {
    [morphHolesky.id]: http("https://rpc-quicknode-holesky.morphl2.io"),
  },
});
