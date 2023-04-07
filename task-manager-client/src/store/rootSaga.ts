import { all, fork } from "redux-saga/effects";
import { authSaga } from "../modules/auth/sagas";
import {dashBoardSaga} from "../modules/main/sagas";

export function* rootSaga() {
    yield all([fork(authSaga), fork(dashBoardSaga)]);
}