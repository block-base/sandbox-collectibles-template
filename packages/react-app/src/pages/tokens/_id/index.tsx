import React from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Header } from "../../../components/organisms/Header";
import { KanjiFlower } from "../../../components/organisms/KanjiFlower";
import { Heading } from "../../../components/atoms/Heading";
import { Text } from "../../../components/atoms/Text";
import { getNFTContract } from "../../../lib/web3";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  const [holderAddress, setHolderAddress] = React.useState("");
  const [test, setTest] = React.useState(0);
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

  const handleContractNameChange = (e: any) => {
    setTest(e.target.value);
  };
  return (
    <>
      <Header></Header>
      <div className="py-4">
        <Heading align="center" as="h1" size="3xl">
          Kanji Flowers {id}
        </Heading>
      </div>
      <div className="pb-4">
        <Text align="center">Kanji Flowers is a 2889 unique NFT art created with Generative Art.</Text>
      </div>
      <div className="grid lg:grid-cols-2 lg:p-10">{<KanjiFlower index={id} />}</div>
      <input onChange={handleContractNameChange}></input>
      <div>holder: {holderAddress}</div>
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
