// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';



contract Pound is ERC20,Ownable{


    constructor()ERC20("POUND","POUND"){
        _mint(msg.sender, 200000000 ether);
    }

    function mintPound(uint256 amount,address to) external onlyOwner{
        _mint(to, amount);
    }



}