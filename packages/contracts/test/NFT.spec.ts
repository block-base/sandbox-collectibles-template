import hre, { ethers } from "hardhat";
import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);
const { expect } = chai;

describe("NFT", function () {
  let signer;
  let nftContract: any;
  this.beforeEach(async function () {
    [signer] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    nftContract = await NFT.deploy();
  });
  it("Test", async function () {
    expect(1).to.equal(1);
  });
});
