import React from "react";
import { ethers } from "ethers";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWallet } from "../hooks/useWallet";
import { useNFT } from "../hooks/useContract";
import { Header } from "../components/Header";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  const [connectWallet, account] = useWallet();
  const nftContractWithSigner = useNFT();

  const mint = async () => {
    const value = ethers.utils.parseEther("0.08").toString();
    await nftContractWithSigner.buy(1, { value: value });
  };

  const withdraw = async () => {
    await nftContractWithSigner.withdraw();
  };

  return (
    <>
      <Header></Header>
      <button onClick={connectWallet}>connectWallet</button>
      <div>{account}</div>
      <button onClick={mint}>mint</button>
      <button onClick={withdraw}>withdraw</button>
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
