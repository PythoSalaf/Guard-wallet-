import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { WagmiProvider } from "wagmi";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  config,
  projectId,
  morphHolesky,
  wagmiAdapter,
} from "./Config/wagmiConfig";
import { WalletProvider } from "./Context/WalletContext";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  networks: [morphHolesky],
  projectId,
  metadata: {
    name: "My dApp",
    description: "My Web3 dApp with Morph Network",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/icon.png"],
  },
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#15803d",
  },
  features: { analytics: true },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <App />
          </BrowserRouter>
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
