import { createContext, useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const [walletState, setWalletState] = useState({
    address: null,
    isConnected: false,
    chainId: null,
  });

  useEffect(() => {
    setWalletState({
      address,
      isConnected,
      chainId,
    });
  }, [address, isConnected, chainId]);

  const disconnectWallet = () => {
    disconnect();
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
    });
  };
  return (
    <WalletContext.Provider value={{ walletState, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
