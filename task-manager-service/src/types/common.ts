export class BaseRequest<T> {
    userId: string;
    payload: T;
}

export enum Activities {
    'HELLO' = 'HELLO',
    'SNAPSHOT_VOTING' = 'SNAPSHOT_VOTING',
}

export const Scripts = {
    [Activities.HELLO]: `/crypto-fighters/task-manager/task-manager-service/scripts/hello.js`,
    [Activities.SNAPSHOT_VOTING]: `/crypto-fighters/task-manager/task-manager-service/scripts/snapshot/index.js`
}

export const Params = {
    [Activities.HELLO]: ['text'],
    [Activities.SNAPSHOT_VOTING]: ['projects', 'vote', 'metamaskPhrases']
} as const;