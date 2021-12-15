const { expect } = require("chai");

describe("Token contract", function () {
  let Token, hardhatToken, owner, add1, add2, addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, add1, add2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerSupply = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerSupply);
    });
  });

  describe("Transactions", function () {
    it("Should transfer token between accounts", async function () {
      await hardhatToken.transfer(add1.address, 100);
      expect(await hardhatToken.balanceOf(add1.address)).to.equal(100);

      await hardhatToken.connect(add1).transfer(add2.address, 25);
      expect(await hardhatToken.balanceOf(add2.address)).to.equal(25);
      expect(await hardhatToken.balanceOf(add1.address)).to.equal(75);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const ownerBal = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(add1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.be.equal(ownerBal);
    });

    it("Should update balance after transfers", async function () {
      const ownerBal = await hardhatToken.balanceOf(owner.address);

      await hardhatToken.transfer(add1.address, 100);
      await hardhatToken.transfer(add2.address, 50);

      expect(await hardhatToken.balanceOf(owner.address)).to.be.equal(
        ownerBal - 150
      );
      expect(await hardhatToken.balanceOf(add1.address)).to.be.equal(100);
      expect(await hardhatToken.balanceOf(add2.address)).to.be.equal(50);
    });
  });
});
