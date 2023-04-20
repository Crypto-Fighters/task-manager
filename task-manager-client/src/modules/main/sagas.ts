import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {ActionType, getType} from "typesafe-actions";
import {
    addAccount,
    addNewJob,
    editAccount,
    fetchAccounts,
    fetchAllJobs,
    fetchJobDefinitions,
    removeAccount, removeJob
} from "./actions";
import {Account, Job, JobDefinition} from "./types";
import {
    addNewAccount,
    addNewJobApi,
    deleteAccount, deleteJobApi,
    editAccountApi,
    getAccounts,
    getAllJobs,
    getJobsDefinitions
} from "./api";
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

function* removeAccountHandler({ payload }: ActionType<typeof removeAccount.request>) {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            yield call(deleteAccount, {userId, payload});
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
        yield put(removeAccount.failure(e));
    }
}

function* fetchJobDefinitionsHandler() {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            const definitions: JobDefinition[] = yield call(getJobsDefinitions);
            yield put(fetchJobDefinitions.success(definitions));
        }
        else {
            console.error('Вы не залогинены!');
        }
    } catch (e: any) {
        console.log(e);
        yield put(fetchJobDefinitions.failure(e));
    }
}

function* fetchAllJobsHandler() {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            const jobs: Job[] = yield call(getAllJobs, userId);

            yield put(fetchAllJobs.success(jobs));
        }
        else {
            console.error('Вы не залогинены!');
        }
    } catch (e: any) {
        console.log(e);
        yield put(fetchAllJobs.failure(e));
    }
}

function* addNewJobHandler({ payload }: ActionType<typeof addNewJob.request>) {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            yield call(addNewJobApi, {userId, payload});
            yield all([
                put(fetchAllJobs.request()),
                put(addNewJob.success())
            ]);
        }
        else {
            console.error('Вы не залогинены!');
        }

    } catch (e: any) {
        console.log(e);
        yield put(addNewJob.failure(e));
    }
}

function* removeJobHandler({ payload }: ActionType<typeof removeJob.request>) {
    try {
        const userId: string | undefined = yield select(userIdSelector);

        if (userId) {
            yield call(deleteJobApi, {userId, payload});
            yield all([
                put(fetchAllJobs.request()),
                put(removeJob.success())
            ]);
        }
        else {
            console.error('Вы не залогинены!');
        }

    } catch (e: any) {
        console.log(e);
        yield put(removeJob.failure(e));
    }
}


export function* dashBoardSaga() {
    yield all([
        takeLatest(getType(fetchAccounts.request), fetchAccountsHandler),
        takeLatest(getType(addAccount.request), addAccountHandler),
        takeLatest(getType(editAccount.request), editAccountHandler),
        takeLatest(getType(removeAccount.request), removeAccountHandler),
        takeLatest(getType(fetchJobDefinitions.request), fetchJobDefinitionsHandler),
        takeLatest(getType(fetchAllJobs.request), fetchAllJobsHandler),
        takeLatest(getType(addNewJob.request), addNewJobHandler),
        takeLatest(getType(removeJob.request), removeJobHandler),
    ]);
}
