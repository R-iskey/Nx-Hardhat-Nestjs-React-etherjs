import { Injectable } from "@nestjs/common";
import wallets from './wallets.json';

@Injectable()
export class WalletService {
  private _wallets: Set<string> = new Set(wallets);

  get wallets() {
    return Array.from(this._wallets);
  }

  public addWallet(address: string) {
    this._wallets.add(address);
  }

  public removeWallet(address: string) {
    this._wallets.delete(address);
  }
}
