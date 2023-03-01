// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { MerkleTree } = require('merkletreejs');

const {Wallet,ethers} = require('ethers');
const {keccak256} = require('@ethersproject/keccak256');

async function main() {

//先生成一些地址

const [owner, otherAccount] = await hre.ethers.getSigners();

var walletAddress = new Array(100);
var walletArr = new Array(100);

for(var i = 0;i < walletArr.length; i++){
  walletArr[i] = ethers.Wallet.createRandom();
  walletAddress[i] = walletArr[i].address;
}

//这里为了方便测试，直接用hardhat本地环境的singer来替换掉最后一个地址
walletArr[99] = otherAccount;
walletAddress[99] = otherAccount.address;

const leaves = walletAddress.map(x => keccak256(x));
const tree = new MerkleTree(leaves,keccak256,{sortPairs: true});
const root = tree.getRoot().toString('hex');
const proof = tree.getHexProof(keccak256(walletAddress[99]));




const Airdrop = await hre.ethers.getContractFactory("Airdrop");
const airdrop = await Airdrop.deploy("0x" + root);
await airdrop.deployed();
console.log('airdrop address:',airdrop.address)


const Ming  = await hre.ethers.getContractFactory("Ming");
const ming = await Ming.deploy(airdrop.address);
await ming .deployed();
console.log('ming address:',ming.address)

await airdrop.setMing(ming.address);


const beforeBalance = await ming.balanceOf(walletAddress[99]);

//成功的情况
// await airdrop.connect(walletArr[99]).claimMing(proof);

//失败的情况(用数组外的地址去调用)
await airdrop.claimMing(proof);

const afterBalance = await ming.balanceOf(walletAddress[99]);

console.log('before balance:',ethers.utils.formatUnits(beforeBalance,18),
            ";after balance:",ethers.utils.formatUnits(afterBalance,18));









  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




