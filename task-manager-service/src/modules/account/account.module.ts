import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import {AccountsService} from "./accounts.service";
import {AccountController} from "./account.controller";
import {AccountSchema} from "../../schemas/account.schema";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'account', schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountModule {}
