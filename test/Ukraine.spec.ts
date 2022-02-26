import { expect } from "chai";
import hre, { deployments, waffle, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

const ZeroState =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const ZeroAddress = "0x0000000000000000000000000000000000000000";
const FirstAddress = "0x0000000000000000000000000000000000000001";

describe("Ukraine NFT", async () => {
  const [user1] = waffle.provider.getWallets();

  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const Ukraine = await hre.ethers.getContractFactory("Ukraine");
    const ukraine = await Ukraine.deploy();

    const etherValue = ethers.utils.parseEther("0.05");
    const weiToEth = ethers.utils.formatEther(etherValue);
    // console.log(weiToEth); 
    // console.log(etherValue.toString());
    await ukraine.mint(1, {value: etherValue});

    return { Ukraine, ukraine };
  });

  describe("initialize", async () => {
    it("should initialize NFT contract", async () => {
      const { ukraine } = await baseSetup();
      const uri = await ukraine.tokenURI(0);
      console.log(uri);
    });

    it("can update owner", async () => {
      const { ukraine } = await baseSetup();
      let own = await ukraine.owner()
      expect(await ukraine.owner()).to.equal(user1.address);
    });

    it("can purchase 1 with correct value", async () => {
      const { ukraine } = await baseSetup();
      const etherValue = ethers.utils.parseEther("0.05");
      await ukraine.mint(1, {value: etherValue});
      expect(await ukraine.ownerOf(1)).to.equal(user1.address);
    });

    it("can purchase multiple with correct value", async () => {
      const { ukraine } = await baseSetup();
      const etherValue = ethers.utils.parseEther("0.1");
      await ukraine.mint(2, {value: etherValue});
      expect(await ukraine.ownerOf(1)).to.equal(user1.address);
      expect(await ukraine.ownerOf(2)).to.equal(user1.address);
    });

    // it("can't purchase 1 with incorrect value", async () => {
    //   const { ukraine } = await baseSetup();
    // });

    // it("only owner can update editions", async () => {
    //   const { ukraine } = await baseSetup();
    // });

    // it("can withdraw", async () => {
    //   const { ukraine } = await baseSetup();
    // });

    // it("only owner can withdraw", async () => {
    //   const { ukraine } = await baseSetup();
    // });
  });
});
