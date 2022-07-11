import { IsString, IsArray } from 'class-validator';

export class AddRemoveWalletDto {
  @IsArray()
  @IsString( {each: true})
  addresses: string | string[];
}

