import {Activities, BaseRequest} from "./common";
import { RJSFSchema } from '@rjsf/utils';

export interface Job {
    id: string;
    accountId: number;
    mode: string;
    originalJobId: number;
    createdDate: number;
    nextPlannedDate: number;
    tag: string;
}

export const JobMode = {
    'FIXED': 'FIXED',
    'REPEATABLE': 'REPEATABLE'
} as const;

export class JobCreateRequest extends BaseRequest<{
    mode: string,
    date: number,
    accountId: number,
    activityName?: Activities,
    nextPlannedDate: number;
    originalJobId: number,
    tag: string,
    params?: Record<string, string>,
}> {}

export class JobRemoveRequest extends BaseRequest<{
    jobId: string,
}> {}

export interface JobDefinition {
    jobId: number;
    jobName: string;
    activity: Activities,
    schema: RJSFSchema;
}