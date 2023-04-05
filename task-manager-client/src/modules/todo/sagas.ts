import { all, call, put, takeLatest } from "redux-saga/effects";

import {getTodos} from "./api";
import {ITodo} from "./types";
import {fetchTODO} from "./actions";
import {getType} from "typesafe-actions";

function* fetchTodoSaga() {
    try {
        const todos: ITodo[] = yield call(getTodos);
        yield put(
            fetchTODO.success({todos})
        );
    } catch (e: any) {
        yield put(
            fetchTODO.failure({
                error: e.message,
            })
        );
    }
}

function* todoSaga() {
    // takeLatest it is for subscription on redux action
    yield all([takeLatest(getType(fetchTODO.request), fetchTodoSaga)]);
}

export default todoSaga;