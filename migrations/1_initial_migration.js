const AuctionPlatform = artifacts.require("AuctionPlatform");

module.exports = function (deployer) {
  deployer.deploy(AuctionPlatform);
};
