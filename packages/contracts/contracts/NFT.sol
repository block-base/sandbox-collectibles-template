//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract NFT is ERC721PresetMinterPauserAutoId {
  constructor() ERC721PresetMinterPauserAutoId("kanji flower", "KF", "https://gateway.pinata.cloud/ipfs/QmSkkob9RmdsRAs3YvS38tgxsUgVTcL9328CyqfzvkB7ag/") {}
}
