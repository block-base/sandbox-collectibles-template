import { useMemo } from "react";

import { getNFTContract } from "../lib/web3";
import useActiveWeb3React from "./useActiveWeb3";

export const useNFT = () => {
  const { library } = useActiveWeb3React();
  // TODO fix me
  return useMemo(() => getNFTContract(library?.getSigner()), [library]);
};
