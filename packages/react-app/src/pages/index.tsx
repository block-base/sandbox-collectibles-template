import React from "react";
import { ethers } from "ethers";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWallet } from "../hooks/useWallet";
import { useNFT } from "../hooks/useContract";
import { Header } from "../components/organisms/Header";
import { KanjiFlower } from "../components/organisms/KanjiFlower";
import { Heading } from "../components/atoms/Heading";
import { Text } from "../components/atoms/Text";

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

  return (
    <>
      <Header></Header>
      <div className="py-4">
        <Heading align="center" as="h1" size="3xl">
          Kanji Flowers
        </Heading>
      </div>
      <div className="pb-4">
        <Text align="center">Kanji Flowers is a 2889 unique NFT art created with Generative Art.</Text>
      </div>
      <div className="grid lg:grid-cols-2 lg:p-10">
        <KanjiFlower index={"1159"} />

        {!account ? (
          <div className="m-auto">
            <p>0.08 ETH</p>
            <button onClick={connectWallet} className="w-40 h-8 bg-red-300 hover:opacity-75 text-white rounded-lg">
              connectWallet
            </button>
          </div>
        ) : (
          <div className="m-auto">
            <p>0.08 ETH</p>
            <button onClick={mint} className="w-40 h-8 bg-red-300 hover:opacity-75 text-white rounded-lg">
              mint
            </button>
            <div>your wallet:{account}</div>
          </div>
        )}
      </div>
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
