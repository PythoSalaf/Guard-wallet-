import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage, http } from "wagmi";
import { morphHolesky } from "viem/chains";

const projectId = import.meta.env.VITE_PROJECT_ID;
console.log("Project ID:", projectId);
if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [morphHolesky];

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  transports: {
    [morphHolesky.id]: http("https://rpc-holesky.morph.io"), // Use a reliable Morph Holesky RPC
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export { config, projectId };
