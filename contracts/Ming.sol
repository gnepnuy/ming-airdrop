// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Ming is ERC20{

    constructor(address airdrop)ERC20("Ming","Ming"){
        _mint(airdrop, 100_0000 ether);
    }
}