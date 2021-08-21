//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721PresetMinterPauserAutoId, Ownable {
  using SafeMath for uint256;
  uint256 public constant MAX_ELEMENTS = 8888;
  uint256 public constant MAX_PURCHASE = 20;
  uint256 public constant price = 80000000000000000; //0.08 ETH

  constructor() ERC721PresetMinterPauserAutoId("kanji flower", "KF", "https://gateway.pinata.cloud/ipfs/QmSkkob9RmdsRAs3YvS38tgxsUgVTcL9328CyqfzvkB7ag/") {}
  
  function buy(uint numberOfTokens) public payable {
    require(numberOfTokens <= MAX_PURCHASE, "Can only mint 20 tokens at a time");
    require(totalSupply().add(numberOfTokens) <= MAX_ELEMENTS, "Purchase would exceed max supply of NFTs");
    require(price.mul(numberOfTokens) <= msg.value, "Ether value sent is not correct");

    for(uint i = 0; i < numberOfTokens; i++) {
            uint mintIndex = totalSupply();
            if (totalSupply() < MAX_ELEMENTS) {
                _safeMint(msg.sender, mintIndex);
            }
        }
  }

  function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
