import React from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWallet } from "../hooks/useWallet";
import { useNFT } from "../hooks/useContract";
import { Header } from "../components/organisms/Header";
import { KanjiFlower } from "../components/organisms/KanjiFlower";
import { Heading } from "../components/atoms/Heading";
import { Text } from "../components/atoms/Text";
import { Button } from "../components/atoms/Button";
import { getNFTContract } from "../lib/web3";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  const [connectWallet, account] = useWallet();
  const [totalNumber, setTotalNumber] = React.useState("");
  const [max, setMax] = React.useState("2222");
  const nftContractWithSigner = useNFT();

  const mint = async () => {
    const value = ethers.utils.parseEther("0.08").toString();
    await nftContractWithSigner.buy(1, { value: value });
  };

  React.useEffect(() => {
    const nftContract = getNFTContract();
    nftContract.totalSupply().then((supply: number) => {
      setTotalNumber(supply.toString());
    });
    nftContract.MAX_ELEMENTS().then((max: number) => {
      setMax(max.toString());
    });
  }, []);

  return (
    <>
      <Header></Header>
      <div className="py-4">
        <Heading align="center" as="h1" size="3xl">
          Kanji Flowers
        </Heading>
      </div>
      <div className="pb-4">
        <Text align="center">
          Kanji Flower is a collectibles of generative art based on Japanese Kanji characters. Each Kanji is a single
          NFT and there are 2222 NFTs in total. All metadata is stored in ipfs.
        </Text>
      </div>
      <div className="grid lg:grid-cols-2 lg:p-10">
        <KanjiFlower index={totalNumber} />
        <div className="m-auto">
          <div className="pb-5">
            <Heading align="center" as="h2" size="xl">
              Purchase here
            </Heading>
          </div>
          <div className="pb-5">
            <Text align="center" size="2xl">
              {totalNumber} / {max} minted
            </Text>
          </div>
          <div className="pb-5">
            <Text align="center" size="2xl">
              0.08 ETH
            </Text>
          </div>
          {!account ? (
            <Button onClick={connectWallet} color="pink" rounded={true}>
              connectWallet
            </Button>
          ) : (
            <Button onClick={mint} color="pink" rounded={true}>
              mint
            </Button>
          )}
        </div>
      </div>
      <Heading as="h2" align="center" size="2xl">
        View Gallery
      </Heading>
      <div className="w-2/3 mx-auto pb-10">
        <Link to="/tokens/0">
          <img className="w-full" src="assets/KanjiFlowers.jpg" alt="creatorImage" />
        </Link>
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
