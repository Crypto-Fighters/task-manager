import { all, call, put, takeLatest } from "redux-saga/effects";
import {ActionType, getType} from "typesafe-actions";
import { auth } from "./actions";
import {AuthResponse} from "./types";
import { setCookie } from "../../utils.comon";
import {authApi} from "./api";
import axios from "axios";

function* authHandler({ payload: {isRemember, login, password} }: ActionType<typeof auth.request>) {
    try {
        const response: AuthResponse = yield call(authApi, login, password);

        if (isRemember) {
            setCookie('access_token', response.access_token, {'max-age': 86400});
            setCookie('_id', response.userInfo._id, {'max-age': 86400});
            setCookie('login', response.userInfo.login, {'max-age': 86400});
            setCookie('avatar', response.userInfo.avatar || '#', {'max-age': 86400});
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;

        yield put(auth.success(response));
    } catch (e: any) {
        yield put(
            auth.failure(e)
        );
    }
}

export function* authSaga() {
    yield all([takeLatest(getType(auth.request), authHandler)]);
}