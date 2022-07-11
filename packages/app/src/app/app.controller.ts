import { Controller, Get, Param, Post, Delete, Body } from "@nestjs/common";

import { AppService } from './app.service';
import { AddRemoveWalletDto } from "./dtos";

@Controller('wallets')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWallets() {
    return this.appService.getAddresses();
  }

  @Post()
  addWallet(@Body() addresses: AddRemoveWalletDto) {
    return this.appService.addAddresses(addresses);
  }

  @Delete()
  removeWallet(addresses: AddRemoveWalletDto) {
    return this.appService.removeAddresses(addresses);
  }

  @Get('/:address/proof')
  getWalletProof(@Param('address') address: string) {
    return this.appService.getAddressProof(address);
  }
}
