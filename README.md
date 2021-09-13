# sandbox-collectibles-template

This repo is a sample for NFT collectibles contracts and Home page with mint function.

## Dev

`yarn`

`yarn dev`

frontend: localhost:3000

## prepare metadata (ex. generative art)

- create a js file with p5 js
  - index.html
  - sketch.js
    - in this sketch.js, get seed data(ex. tokenId) from query string.
- upload to IPFS
- create image folder (images for each tokenId) and upload to IPFS
- create metadata folder
  - json
    - "name":
    - "description":
    - "image": url of image folder on IPFS
    - "animation_url": url of p5js folder on IPFS with seed in query string

## Deploy Contract to testnet

- go to packages/contracts directory
- in contracts/deploy/00_NFT.ts, change arguments `args: ["NFT Title", "SYMBOL", "url"],`
- set `PRIVATE_KEY` on your local environment
- `yarn hardhat deploy --network mumbai`

- change information in frontend
  - go to packages/frontend/src/contracts/external_contracts.ts and change nft contract address to deployed address

## P5js

- edit p5js in src/components/organisms/sketch.ts
