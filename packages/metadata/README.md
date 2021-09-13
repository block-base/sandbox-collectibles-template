## prepare metadata (ex. generative art)

- create a js file with p5 js
  - index.html
  - sketch.js
    - in this sketch.js, get seed data(ex. tokenId) from query string.
  - p5.min.js
    - use p5.min.js because OpenSea cannot display with CDN
- upload to IPFS
- create image folder (images for each tokenId) and upload to IPFS
- create metadata folder
  - json
    - "name":
    - "description":
    - "image": url of image folder on IPFS
    - "animation_url": url of p5js folder on IPFS with seed in query string
