import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Account} from "../../schemas/account.schema";
import {AccountCreateRequest, AccountRemoveRequest, AccountUpdateRequest} from "../../types/account";
import {BaseRequest} from "../../types/common";

@Injectable()
export class AccountsService {
    constructor(@InjectModel('account') private accounts: Model<Account>) {}

    async addAccount({payload, userId}: AccountCreateRequest) {
        return await this.accounts.create({...payload, userId});
    }
    
    async getAccounts(userId: string) {
        return await this.accounts.find({userId}).exec();
    }

    async removeAccount({userId, payload}: AccountRemoveRequest) {
        return await this.accounts.findOneAndDelete({userId, _id: payload._id}).exec();
    }

    async updateAccount({userId, payload}: AccountUpdateRequest) {
        const acc = await this.accounts.findOne({userId, _id: payload._id}).exec();
        return acc.updateOne({...payload, userId});
    }
}
