import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import 'hardhat-abi-exporter';

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  paths: {
    root: "packages/hardhat/src",
  },
  abiExporter: {
    path: '../../client',
    format: 'minimal',
    only: [':SheeshaFinanceToken$'],
    runOnCompile: true,
    clear: true,
    flat: true,
  }
};

export default config;
