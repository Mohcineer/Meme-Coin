const MemeCoin = artifacts.require("MemeCoin");

contract("MemeCoin", (accounts) => {
  let memeCoinInstance;

  before(async () => {
    memeCoinInstance = await MemeCoin.deployed();
  });

  it("should have correct name and symbol", async () => {
    const name = await memeCoinInstance.name();
    const symbol = await memeCoinInstance.symbol();
    assert.equal(name, "MemeCoin", "The name is incorrect");
    assert.equal(symbol, "MEME", "The symbol is incorrect");
  });

  it("should have correct initial supply", async () => {
    const totalSupply = await memeCoinInstance.totalSupply();
    assert.equal(totalSupply.toString(), web3.utils.toBN('1000000000000000000000000').toString(), "The initial supply is incorrect");
  });

  it("should assign the initial supply to the creator", async () => {
    const balance = await memeCoinInstance.balanceOf(accounts[0]);
    assert.equal(balance.toString(), web3.utils.toBN('1000000000000000000000000').toString(), "The initial supply is not assigned to the creator");
  });

  it("should transfer tokens correctly", async () => {
    const amount = web3.utils.toBN('100000000000000000000'); // 100 tokens

    // Transfer 100 tokens from accounts[0] to accounts[1]
    await memeCoinInstance.transfer(accounts[1], amount, { from: accounts[0] });

    const balance0 = await memeCoinInstance.balanceOf(accounts[0]);
    const balance1 = await memeCoinInstance.balanceOf(accounts[1]);

    assert.equal(balance0.toString(), web3.utils.toBN('999900000000000000000000').toString(), "The balance of account 0 is incorrect");
    assert.equal(balance1.toString(), amount.toString(), "The balance of account 1 is incorrect");
  });
});
