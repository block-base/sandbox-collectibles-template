import React from "react";
import { useParams, Link } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Header } from "../../../components/organisms/Header";
import { KanjiFlower } from "../../../components/organisms/KanjiFlower";
import { Heading } from "../../../components/atoms/Heading";
import { Button } from "../../../components/atoms/Button";
import { Text } from "../../../components/atoms/Text";
import { getNFTContract } from "../../../lib/web3";
import { openSea } from "../../../lib/env";
import data from "../../../components/data.json";

let nftContract: any;

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
    nftContract = getNFTContract();
    nftContract
      .ownerOf(id)
      .then((tokenId: string) => {
        setHolderAddress(tokenId);
      })
      .catch((err: any) => {
        console.log(err);
        setHolderAddress("not minted");
      });
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
        <Text align="center">
          Kanji Flower is a collectibles of generative art based on Japanese Kanji characters. Each Kanji is a single
          NFT and there are 2222 NFTs in total. All metadata is stored in ipfs.
        </Text>
      </div>
      <div className="grid xl:grid-cols-2 lg:p-5">
        <div className="m-auto">
          <KanjiFlower index={id} />
        </div>
        <div className="m-auto">
          <div className="py-5">
            <a href={`${openSea}/${nftContract?.address}/${id}`} target="_blank">
              <Button color="pink" rounded={true}>
                view on OpenSea
              </Button>
            </a>
          </div>

          <Text align="center" size="xs">
            holder: {holderAddress}
          </Text>
        </div>
      </div>
      <div className="flex justify-between px-10 py-5">
        {0 < Number(id) ? (
          <Link to={`${Number(id) - 1}`}>
            <Text className="hover:opacity-75 text-red-400 underline">←prev</Text>
          </Link>
        ) : (
          <p className="hover:opacity-75 text-red-400"></p>
        )}
        <Link to={`${Number(id) + 1}`}>
          <p className="hover:opacity-75 text-red-400 underline">next→</p>
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
