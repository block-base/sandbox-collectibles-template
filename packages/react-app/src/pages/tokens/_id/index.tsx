import React from "react";
import { ethers } from "ethers";
import { useParams, Link } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Header } from "../../../components/organisms/Header";
import { KanjiFlower } from "../../../components/organisms/KanjiFlower";
import { Heading } from "../../../components/atoms/Heading";
import { Button } from "../../../components/atoms/Button";
import { Text } from "../../../components/atoms/Text";
import { getNFTContract } from "../../../lib/web3";
import data from "../../../components/data.json";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  const [holderAddress, setHolderAddress] = React.useState("");
  const { id } = useParams<{
    id: string;
  }>();
  React.useEffect(() => {
    const nftContract = getNFTContract();
    nftContract
      .ownerOf(0)
      .then((tokenId: string) => {
        setHolderAddress(tokenId);
      })
      .catch(setHolderAddress("not minted"));
  }, []);

  return (
    <>
      <Header></Header>
      <div className="py-4">
        <Heading align="center" as="h1" size="3xl">
          Kanji Flowers : {data["kanji"][Number(id)]}
        </Heading>
      </div>
      <div className="pb-4">
        <Text align="center">Kanji Flowers is a 2889 unique NFT art created with Generative Art.</Text>
      </div>
      <div className="flex justify-between px-10 py-5">
        <Link to={`${Number(id) - 1}`}>
          <p className="hover:opacity-75 text-red-400 underline">←prev</p>
        </Link>
        <Link to={`${Number(id) + 1}`}>
          <p className="hover:opacity-75 text-red-400 underline">next→</p>
        </Link>
      </div>
      <div className="grid lg:grid-cols-2 lg:p-5">
        <KanjiFlower index={id} />
        <div className="m-auto">
          <div className="mx-auto w-1/2">
            <Button color="pink" rounded={true}>
              view on OpenSea
            </Button>
          </div>
          <Text align="center" size="xs">
            holder: {holderAddress}
          </Text>
        </div>
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
