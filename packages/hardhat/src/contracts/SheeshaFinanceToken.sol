// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract SheeshaFinanceToken is ERC20, Ownable, ERC20Permit {
  using MerkleProof for bytes32[];

  bytes32 public merkleRoot;
  uint256 public DEFAULT_BALANCE = 100;

  constructor(bytes32 _merkleRoot, address[] memory addresses)
  ERC20("SheeshaFinanceToken", "SFT")
  ERC20Permit("SheeshaFinanceToken")
  {
    merkleRoot = _merkleRoot;
    for (uint256 i = 0; i < addresses.length; i++) {
      _mint(addresses[i], DEFAULT_BALANCE);
    }
  }

  function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
    merkleRoot = _merkleRoot;
  }

  function claim(bytes32[] memory _merkleProof, uint256 amount) public {
    // Generate leaf node from callee
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));

    // Check the proof
    require(_merkleProof.verify(merkleRoot, leaf), "Invalid Merkle Proof");

    _mint(msg.sender, amount);
  }

  function balanceOf(address account) public view virtual override returns (uint256) {
    return super.balanceOf(account);
  }

}
