import {JobDefinition} from "../../../types/jobs";
import {Activities} from "../../../types/common";

export const JobDefinitions: Array<JobDefinition> = [
    {
        jobId: 0,
        jobName: 'send Message to TG Channel [TEST]',
        activity: Activities.HELLO,
        schema: {
            type: 'object',
            properties: {
                text: { type: 'string'},
            },
        }
    },
    {
        jobId: 1,
        jobName: 'Голосование SNAPSHOT',
        activity: Activities.SNAPSHOT_VOTING,
        schema: {
            type: 'object',
            properties: {
                projects: {
                    type: 'array',
                    title: 'Проекты (xxx.eth)',
                    items: {
                        type: 'string'
                        // default: 'bazinga'
                    }
                },
                vote: {
                    type: "string",
                    title: 'Мод',
                    default: 'random',
                    readOnly: true
                }
            },
        }
    }
];