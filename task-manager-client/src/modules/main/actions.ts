import { createAsyncAction } from "typesafe-actions";
import {Account} from "./types";

export const fetchAccounts = createAsyncAction(
    'FETCH_ACCOUNT_REQUEST',
    'FETCH_ACCOUNT_AUTH_SUCCESS',
    'FETCH_ACCOUNT_AUTH_FAILURE'
)<void, Account[], string>();