import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {ActionType, getType} from "typesafe-actions";
import {addAccount, editAccount, fetchAccounts} from "./actions";
import { Account } from "./types";
import {addNewAccount, editAccountApi, getAccounts} from "./api";
import {userIdSelector} from "./selectors";

function* fetchAccountsHandler() {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            const response: Account[] = yield call(getAccounts, userId);
            yield put(fetchAccounts.success(response));
        }
        else {
            console.error('Вы не залогинены!');
        }
    } catch (e: any) {
        yield put(
            fetchAccounts.failure(e)
        );
    }
}

function* addAccountHandler({ payload }: ActionType<typeof addAccount.request>) {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            yield call(addNewAccount, {userId, payload});
            yield all([
                put(fetchAccounts.request()),
                put(addAccount.success())
            ]);
        }
        else {
            console.error('Вы не залогинены!');
        }
    } catch (e: any) {
        console.log(e);
        yield put(addAccount.failure(e));
    }
}

function* editAccountHandler({ payload }: ActionType<typeof editAccount.request>) {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            yield call(editAccountApi, payload);
            yield all([
                put(fetchAccounts.request()),
                put(editAccount.success())
            ]);
        }
        else {
            console.error('Вы не залогинены!');
        }
    } catch (e: any) {
        console.log(e);
        yield put(editAccount.failure(e));
    }
}

export function* dashBoardSaga() {
    yield all([
        takeLatest(getType(fetchAccounts.request), fetchAccountsHandler),
        takeLatest(getType(addAccount.request), addAccountHandler),
        takeLatest(getType(editAccount.request), editAccountHandler),
    ]);
}
