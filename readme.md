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

3. **Set your mnemonic phrase** in a file named `.secret` in the root directory:

    ```plaintext
    your mnemonic phrase here
    ```

4. **Set your Infura or Alchemy project ID** in a file named `.keyId` in the root directory:

    ```plaintext
    your_project_id_here
    ```

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
