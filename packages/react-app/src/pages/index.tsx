import React from "react";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWallet } from "../hooks/useWallet";
import { useNFT } from "../hooks/useContract";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  const [connectWallet, account] = useWallet();
  const nftContractWithSigner = useNFT();

  const mint = async () => {
    await nftContractWithSigner.mint(account);
  };

  return (
    <>
      <button onClick={connectWallet}>connectWallet</button>
      <div>{account}</div>
      <button onClick={mint}>mint</button>
    </>
  );
};

export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
