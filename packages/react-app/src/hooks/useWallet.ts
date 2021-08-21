import * as React from "react";

import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../lib/web3";
import { Web3Provider } from "@ethersproject/providers";

export const useWallet = () => {
  const context = useWeb3React();

  const { activate, account, library } = context;

  const connectWallet = () => {
    activate(injectedConnector);
  };

  return [connectWallet, account, library];
};
