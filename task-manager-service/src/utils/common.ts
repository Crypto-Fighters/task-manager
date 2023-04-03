import {Activities, Params, Scripts} from "../types/common";

export const getCommandLine = (activity: Activities, params: Record<string, string>) => {
    return `node ${Scripts[activity]} ${Params[activity].map(v => `--${v} "${params[v]}"`).join()}`
}