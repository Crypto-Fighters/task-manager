import { all, fork } from "redux-saga/effects";
import todoSaga from "../modules/todo/sagas";

export function* rootSaga() {
    // you can paste more new root sagas from another modules
    yield all([fork(todoSaga)]);
}