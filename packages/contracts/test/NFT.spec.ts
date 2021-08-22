import hre, { ethers } from "hardhat";
import axios from "axios";
import * as chai from "chai";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);
const { expect } = chai;

describe("NFT", function () {
  let signer: SignerWithAddress;
  let buyer: SignerWithAddress;
  let nftContract: any;
  this.beforeEach(async function () {
    [signer, buyer] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    nftContract = await NFT.deploy(
      "Kanji Flower",
      "KF",
      "https://gateway.pinata.cloud/ipfs/QmSkkob9RmdsRAs3YvS38tgxsUgVTcL9328CyqfzvkB7ag/"
    );
    await nftContract.mint(buyer.address);
    await nftContract.mint(buyer.address);
  });
  it("Test", async function () {
    const uri = await nftContract.tokenURI(1);
    console.log(uri);

    const test = await axios.get(uri);
    console.log(test.data, "test");
    expect(1).to.equal(1);
  });
});
