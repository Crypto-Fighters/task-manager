import {JobDefinition} from "../../../types/jobs";
import {Activities} from "../../../types/common";

export const JobDefinitions: Array<JobDefinition> = [
    {
        jobId: 0,
        jobName: 'send Message to TG Channel',
        activity: Activities.HELLO,
        schema: {
            type: 'object',
            properties: {
                text: { type: 'string'},
            },
        }
    }
];