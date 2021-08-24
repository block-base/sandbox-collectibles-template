const func = async (hre: any) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFT", {
    from: deployer,
    args: ["Kanji Flowers", "KF", "https://gateway.pinata.cloud/ipfs/QmXXq5mN8Nc8AZjUtGKMsSqFmeTcxeDcBSnABu4BpzhTUQ/"],
    log: true,
  });
};

export default func;
module.exports.tags = ["NFT"];
