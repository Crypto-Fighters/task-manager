import {Activities, BaseRequest} from "./common";
import { RJSFSchema } from '@rjsf/utils';

export interface Job {
    id: string;
    accountId: number;
    mode: string;
    activityName: string;
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
    activityName: Activities,
    tag: string,
    params: Record<string, string>,
}> {}

export class JobRemoveRequest extends BaseRequest<{
    jobId: string,
}> {}

export interface JobDefinition {
    jobId: number;
    jobName: string;
    schema: RJSFSchema;
}