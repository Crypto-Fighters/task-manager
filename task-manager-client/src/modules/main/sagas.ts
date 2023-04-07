import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {getType} from "typesafe-actions";
import {fetchAccounts} from "./actions";
import { Account } from "./types";
import { getAccounts } from "./api";
import {userIdSelector} from "./selectors";

function* fetchAccountsHandler() {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            const response: Account[] = yield call(getAccounts, userId);
            yield put(fetchAccounts.success(response));
        }
    } catch (e: any) {
        yield put(
            fetchAccounts.failure(e)
        );
    }
}

export function* dashBoardSaga() {
    yield all([takeLatest(getType(fetchAccounts.request), fetchAccountsHandler)]);
}
