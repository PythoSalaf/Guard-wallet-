// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link, NavLink } from "react-router"; // Updated to react-router-dom
import { Logo } from "../assets";
import { IoWalletOutline } from "react-icons/io5";
import { MdMenu, MdClose } from "react-icons/md";
import { useAppKit } from "@reown/appkit/react";
import { useSwitchChain } from "wagmi";
import { WalletContext } from "../context/WalletContext";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { open } = useAppKit();
  const { walletState, disconnectWallet } = useContext(WalletContext);
  const { switchChain } = useSwitchChain();

  const handleConnect = () => {
    if (walletState.isConnected && walletState.chainId !== 2710) {
      switchChain({ chainId: 2710 }); // Switch to Morph Holesky
    } else {
      open(); // Open AppKit modal
    }
    if (toggle) setToggle(false); // Close mobile menu on connect
  };

  const handleDisconnect = () => {
    disconnectWallet();
    if (toggle) setToggle(false); // Close mobile menu on disconnect
  };

  return (
    <div className="w-full py-3 z-50 bg-[#060C1C] shadow">
      <div className="w-[96%] md:w-[92%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-1.5">
          <img src={Logo} alt="logo" className="w-[30px] md:w-[35px]" />
          <h3 className="">Guardwallet</h3>
        </div>
        <div className="hidden md:flex items-center gap-9">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
          >
            Our Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
          >
            Contact us
          </NavLink>
        </div>
        <div className="hidden md:block">
          {walletState.isConnected ? (
            <div className="flex items-center gap-x-2">
              <span className="text-white text-sm">
                {`${walletState.address.slice(
                  0,
                  6
                )}...${walletState.address.slice(-4)}`}
              </span>
              <button
                className="bg-[#1E3A8A] hover:bg-[#0e235d] text-white py-2 px-3 rounded-md cursor-pointer flex items-center gap-x-1.5"
                onClick={handleDisconnect}
              >
                <IoWalletOutline className="size-5" />
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="bg-[#1E3A8A] hover:bg-[#0e235d] text-white py-2 px-3 rounded-md cursor-pointer flex items-center gap-x-1.5"
              onClick={handleConnect}
            >
              <IoWalletOutline className="size-5" />
              Connect Wallet
            </button>
          )}
        </div>
        <div
          className="block md:hidden cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <MdClose className="size-8" />
          ) : (
            <MdMenu className="size-8" />
          )}
        </div>
        {toggle && (
          <div className="absolute top-14 right-0 z-40 shadow-2xl rounded-b-2xl w-full bg-[#0F1D45] py-8">
            <div className="w-[85%] mx-auto flex flex-col items-center justify-center">
              <Link to="/" className="mb-3" onClick={() => setToggle(false)}>
                Home
              </Link>
              <Link
                to="/dashboard"
                className="mb-3"
                onClick={() => setToggle(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/send-asset"
                className="mb-3"
                onClick={() => setToggle(false)}
              >
                Send Asset
              </Link>
              {walletState.isConnected ? (
                <button
                  className="bg-[#0A132E] text-sm px-3 rounded-lg py-1.5 mt-6"
                  onClick={handleDisconnect}
                >
                  Disconnect (
                  {`${walletState.address.slice(
                    0,
                    6
                  )}...${walletState.address.slice(-4)}`}
                  )
                </button>
              ) : (
                <button
                  className="bg-[#0A132E] text-sm px-3 rounded-lg py-1.5 mt-6"
                  onClick={handleConnect}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
