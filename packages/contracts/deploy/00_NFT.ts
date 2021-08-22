const func = async (hre: any) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFT", {
    from: deployer,
    args: ["kanji flowers", "KF", "https://gateway.pinata.cloud/ipfs/QmSkkob9RmdsRAs3YvS38tgxsUgVTcL9328CyqfzvkB7ag/"],
    log: true,
  });
};

export default func;
module.exports.tags = ["NFT"];
