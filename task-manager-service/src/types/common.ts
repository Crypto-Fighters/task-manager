import path from "path";

export class BaseRequest<T> {
    userId: string;
    payload: T;
}

export enum Activities {
    'HELLO' = 'HELLO',
}

const a = `${__dirname}/../..`;
export const Scripts = {
    [Activities.HELLO]: `${path.resolve(a)}/scripts/hello.js`
}

export const Params = {
    [Activities.HELLO]: ['name']
} as const;