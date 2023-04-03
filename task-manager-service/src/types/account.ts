import {BaseRequest} from "./common";
import {Account} from "../schemas/account.schema";

export class AccountCreateRequest extends BaseRequest<Omit<Account, 'userId' | 'id'>> {}

export class AccountUpdateRequest extends BaseRequest<Account & {_id: string}> {}

export class AccountRemoveRequest extends BaseRequest<Account & {_id: string}> {}