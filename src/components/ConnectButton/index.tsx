import Web3Modal from "web3modal";
import { providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { whenDefined } from "@devprotocol/util-ts";
import React, { useEffect, useState } from "react";
import { useWeb3Provider } from "../../context/web3ProviderContext";

const providerOptions = {
  injected: {
    package: detectEthereumProvider(),
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      // TODO: will this work? was taken from the governance dapp code
      infuraId: "75ebe953349644b6998136d868f5cd97",
    },
  },
};

type ConnectButtonParams = {
  onChainChanged(id: number): void;
};

const ConnectButton: React.FC<ConnectButtonParams> = ({ onChainChanged }) => {
  const web3Context = useWeb3Provider();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    console.log("web 3 context changed");
    const getProvider = async (): Promise<void> => {
      const currentProvider = web3Context?.web3Provider;
      console.log("current provider is: ", currentProvider);
      if (currentProvider) {
        const currentAddress = await currentProvider.getSigner().getAddress();
        setAddress(currentAddress);
      }
    };
    getProvider();
  }, [web3Context]);

  const connect = async () => {
    const modalProvider = new Web3Modal({
      providerOptions,
      cacheProvider: false,
    });
    const connectedProvider = await modalProvider.connect();
    const newProvider = whenDefined(
      connectedProvider,
      (p) => new providers.Web3Provider(p)
    );
    web3Context?.setWeb3Provider(newProvider);

    onChainChanged(connectedProvider.chainId);

    connectedProvider.on("chainChanged", (chainId: number) => {
      onChainChanged(chainId);
      window.location.reload();
    });
  };

  return (
    <div>
      {address && (
        <div className="text-right">
          <div className="flex">
            <span>
              {address.substring(0, 6)}
              ...
              {address.substring(address.length - 4, address.length)}
            </span>
          </div>
        </div>
      )}
      {!address && (
        <button type="button" onClick={connect} className="">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
