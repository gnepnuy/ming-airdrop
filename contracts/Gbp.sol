// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';



contract Gbp is ERC20,Ownable{


    constructor()ERC20("GBP","GBP"){
        _mint(msg.sender, 10000000000 ether);
    }

    function mintGBP(uint256 amount,address to) external onlyOwner{
        _mint(to, amount);
    }



}