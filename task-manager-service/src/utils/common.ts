import {Params, Scripts} from "../types/common";
import {JobDefinitions} from "../modules/job/jobDefinitions";

export const getCommandLine = (jobId: number, params: Record<string, string>) => {
    const job = JobDefinitions.find(job => job.jobId === jobId);
    if (job) {
        return `/usr/local/nodejs/bin/node ${Scripts[job.activity]} ${Params[job.activity].map(v => `${v}="${params[v]}"`).join()}`
    }
    throw 'Невозможной найти задачу!'
}