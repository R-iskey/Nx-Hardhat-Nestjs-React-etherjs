import { ForbiddenException, Injectable } from "@nestjs/common";
import { MerkleTree } from "merkletreejs";
import { WalletService } from "./wallet.service";
import keccak256 = require("keccak256");
import { AddRemoveWalletDto } from "./dtos";

@Injectable()
export class AppService {
  private merkleTree: MerkleTree;

  constructor(private walletService: WalletService) {
    this.syncMarkleRoot();
  }

  get leafNodeList() {
    return this.walletService.wallets.map(addr => keccak256(addr));
  }

  get rootHash() {
    return this.merkleTree.getHexRoot()
  }

  private syncMarkleRoot() {
    // Creating Merkle Tree algorithm using keccak256
    this.merkleTree = new MerkleTree(this.leafNodeList, keccak256, { sort: true });
    return this.rootHash;
  }

  getAddresses() {
    return {
      wallets: this.walletService.wallets,
      rootHash: this.rootHash
    };
  }

  addAddresses(payload: AddRemoveWalletDto): string {
    let {addresses} = payload;
    if (typeof addresses === "string") {
      addresses = [addresses];
    }
    addresses.forEach(w => this.walletService.addWallet(w));

    return this.syncMarkleRoot();
  }

  removeAddresses(payload: AddRemoveWalletDto): string {
    let {addresses} = payload;
    if (typeof addresses === "string") {
      addresses = [addresses];
    }
    addresses.forEach(w => this.walletService.removeWallet(w));

    return this.syncMarkleRoot();
  }

  getAddressProof(address: string) {
    const claimingAddress = this.leafNodeList[this.walletService.wallets.indexOf(address)];
    if (!claimingAddress) throw new ForbiddenException("Your are not whitelisted");

    // getHexProof returns the neighbour leaf and all parent nodes hashes that will
    // be required to derive the MerkleTree root hash of the
    const hexProof = this.merkleTree.getHexProof(claimingAddress);

    const verifiedAddress = this.merkleTree.verify(hexProof, claimingAddress, this.rootHash);
    const proof = hexProof.map(item => item.replace(/["']/g, ""));

    return {
      proof,
      verifiedAddress
    };
  }
}
