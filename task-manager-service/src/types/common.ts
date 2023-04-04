export class BaseRequest<T> {
    userId: string;
    payload: T;
}

export enum Activities {
    'HELLO' = 'HELLO',
}

export const Scripts = {
    [Activities.HELLO]: 'scripts/hello.js'
}

export const Params = {
    [Activities.HELLO]: ['name']
} as const;