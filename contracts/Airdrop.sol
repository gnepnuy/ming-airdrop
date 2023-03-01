// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Airdrop is Ownable{

    bytes32 immutable public root;
    mapping(address => bool) public claimedAddress;
    address public ming;

    event Claimed(address user);

    constructor(bytes32 merkleroot){
        root = merkleroot;
    }

    function setMing(address _ming)external onlyOwner{
        ming = _ming;
    }

    function claimMing(bytes32[] calldata proof) external{
        address user = msg.sender;
        require(!claimedAddress[user],'You have already claimed');
        require(_verify(_leaf(user),proof),'You are not in the list');
        IERC20(ming).transfer(user,1 ether);
        claimedAddress[user] = true;
        emit Claimed(user);
    }


    function _leaf(address user) internal pure returns(bytes32){
        return keccak256(abi.encodePacked(user));
    }

    function _verify(bytes32 leaf,bytes32[] memory proof) internal view returns(bool) {
        return MerkleProof.verify(proof, root, leaf);
    }
}