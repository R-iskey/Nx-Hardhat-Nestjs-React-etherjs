import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// @ts-ignore
import { ethers } from "hardhat";

const getContract = async () => {
  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("SheeshaFinanceToken");
  await contract.deploy();

  return contract;
};

describe("SheeshaFinanceToken", function() {
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it('done', () => {
    expect(true).eq(true);
  });
});
