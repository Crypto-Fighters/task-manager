import {Activities, BaseRequest} from "./common";

export interface Job {
    id: string;
    accountId: number;
    mode: string;
    activityName: string;
    createdDate: number;
    nextPlannedDate: number;
}

export const JobMode = {
    'FIXED': 'FIXED',
    'REPEATABLE': 'REPEATABLE'
} as const;

export class JobCreateRequest extends BaseRequest<{
    mode: string,
    date: number,
    accountId: number,
    activityName: Activities,
    params: Record<string, string>,
}> {}

export class JobRemoveRequest extends BaseRequest<{
    jobComment: string,
}> {}