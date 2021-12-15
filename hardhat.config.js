require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
const fs = require("fs");

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, world!");
  const [account, add1] = await hre.ethers.getSigners();

  await greeter.connect(add1).setGreeting("Hallo, Erde!");
});

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ receiver }) => {

    const addressesFile = __dirname + "/src/contracts/contract-address.json";

    if (!fs.existsSync(addressesFile)) {
      console.error("You need to deploy your contract first");
      return;
    }

    const addressJson = fs.readFileSync(addressesFile);
    const address = JSON.parse(addressJson);

    if ((await ethers.provider.getCode(address.Token)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const token = await ethers.getContractAt("Token", address.Token);
    const [sender] = await ethers.getSigners();

    const tx = await token.transfer(receiver, 100);
    await tx.wait();

    const tx2 = await sender.sendTransaction({
      to: receiver,
      value: ethers.constants.WeiPerEther,
    });
    await tx2.wait();

    console.log(`Transferred 1 ETH and 100 tokens to ${receiver}`);
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
