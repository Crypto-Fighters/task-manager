import {JobDefinition} from "../../../types/jobs";

export const JobDefinitions: Array<JobDefinition> = [
    {
        jobId: 0,
        jobName: 'send Message to TG Channel',
        schema: {
            type: 'object',
            properties: {
                text: { type: 'string', title: 'Сообщение', description: 'Текст сообщения' },
            },
        }
    }
];