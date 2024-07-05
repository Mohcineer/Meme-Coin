# MemeCoin Project

## Introduction

MemeCoin is an ERC-20 token deployed on the Ethereum blockchain. This project demonstrates how to create and deploy a custom token using Truffle, Solidity, and a node provider like Infura or Alchemy.

## Technologies Used

- **Truffle**: A development framework for Ethereum.
- **Solidity**: The programming language for writing smart contracts.
- **Ethereum**: The blockchain platform for deploying the token.
- **Infura/Alchemy**: Node providers to interact with the Ethereum network.
- **Ganache**: A personal blockchain for Ethereum development.
- **Node.js**: JavaScript runtime for executing scripts.
- **Web3.js**: JavaScript library for interacting with the Ethereum blockchain.

## Prerequisites

- Node.js and npm installed
- Truffle installed globally: `npm install -g truffle`
- Ganache installed globally: `npm install -g ganache-cli`
- An Infura or Alchemy account with a project ID

## Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/MemeCoin.git
    cd MemeCoin
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.secret` file** in the root directory and add your mnemonic phrase (12 words) for deploying the contracts:

    ```plaintext
    your mnemonic phrase here
    ```

4. **Configure the project**:

    Open `truffle-config.js` and replace `"YOUR_INFURA_PROJECT_ID"` with your actual Infura project ID or replace the provider configuration with Alchemy if you are using Alchemy.

## Smart Contract

The `MemeCoin` contract is a simple ERC-20 token. The code is located in `contracts/MemeCoin.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("MemeCoin", "MEME") {
        _mint(msg.sender, initialSupply);
    }
}
