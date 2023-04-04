import {Body, Controller, Delete, Post, Put} from '@nestjs/common';
import {AccountsService} from "./accounts.service";
import {BaseRequest} from "../../types/common";
import {AccountCreateRequest, AccountRemoveRequest, AccountUpdateRequest} from "../../types/account";
import {ApiBody, ApiTags} from "@nestjs/swagger";

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountsService: AccountsService
  ) {}

  @Post('create')
  @ApiBody({type: AccountCreateRequest})
  async addAccount(@Body() request: AccountCreateRequest) {
    return await this.accountsService.addAccount(request);
  }

  @Put('update')
  @ApiBody({type: AccountUpdateRequest })
  async updateAccount(@Body() request: AccountUpdateRequest) {
    return await this.accountsService.updateAccount(request);
  }

  @Delete('remove')
  @ApiBody({type: AccountRemoveRequest })
  async removeAccount(@Body() request: AccountRemoveRequest) {
    return await this.accountsService.removeAccount(request);
  }

  @Post('all')
  @ApiBody({type: BaseRequest<any> })
  async getAccounts(@Body() request: BaseRequest<any>) {
    return await this.accountsService.getAccounts(request);
  }
}
