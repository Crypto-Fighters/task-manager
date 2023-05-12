import {Params, Scripts} from "../types/common";
import {JobDefinitions} from "../modules/job/jobDefinitions";
import {isArray} from "@nestjs/swagger/dist/plugin/utils/ast-utils";

export const getCommandLine = (jobId: number, params: Record<string, any>) => {
    const job = JobDefinitions.find(job => job.jobId === jobId);
    if (job) {
        return `/usr/local/nodejs/bin/node ${Scripts[job.activity]} ${Params[job.activity].map(v => `${v}="${isArray(params[v]) ? params[v].join('|') : JSON.stringify(params[v])}"`).join()}`
    }
    throw 'Невозможной найти задачу!'
}