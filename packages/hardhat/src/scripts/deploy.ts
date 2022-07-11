// @ts-ignore
import { ethers } from "hardhat";
import axios from "axios";

const BACKEND_URL = 'http://localhost:3333';
async function main() {
  const signers = await ethers.getSigners();
  const deployer = signers[0];

  const {data: {wallets, rootHash}} = await axios.get(`${BACKEND_URL}/api/wallets`);
  if (!rootHash) {
    throw new Error("Merkle root not generated");
  }

  console.log("New Merkle root hash for wallets", rootHash);
  console.log("Deploying contract with the account:", deployer.address);

  const ContractSheesha = await ethers.getContractFactory("SheeshaFinanceToken");
  const contract = await ContractSheesha.deploy(rootHash, wallets);
  await contract.deployed();

  console.log("Contract successfully deployed, address", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
