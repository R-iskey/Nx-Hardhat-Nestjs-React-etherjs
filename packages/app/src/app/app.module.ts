import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletService } from "./wallet.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WalletService],
})
export class AppModule {}
