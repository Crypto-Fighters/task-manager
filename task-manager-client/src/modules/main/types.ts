import {LOADING_STATE} from "../../utils.comon";
import {RJSFSchema} from "@rjsf/utils";

export interface DashboardState {
    accountsState: {
        loading: LOADING_STATE;
        accounts: Account[];
    },
    jobsState: {
        definitions: JobDefinition[],
        jobs: Job[]
    }
}

export interface Account {
    _id: string;
    userId: string;
    metamask: {
        phrases: string;
        password: string;
        balance?: number;
    };
    twitter?: {
        login: string;
        password: string;
    };
    discord?: {
        login: string;
        password: string;
    };
}

export interface BaseRequest<T> {
    userId: string;
    payload?: T;
}

export type CreateAccountRequest = BaseRequest<Omit<Account, 'userId' | '_id'>>;

export type EditAccountRequest = BaseRequest<Account>;

export type RemoveAccountRequest = BaseRequest<Pick<Account, '_id'>>;

export interface JobDefinition {
    jobId: number;
    jobName: string;
    schema: RJSFSchema;
}

export interface Job {
    id: string;
    accountId: string;
    mode: string;
    createdDate: number;
    nextPlannedDate: number;
    params?: Record<string, any>
    originalJobId: string;
    tag: string;
}

export type AddNewJobRequest = BaseRequest<Omit<Job, 'id'>>;

export type RemoveJobRequest = BaseRequest<{jobId: string}>;