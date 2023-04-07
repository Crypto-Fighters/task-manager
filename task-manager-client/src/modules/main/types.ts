import {LOADING_STATE} from "../../utils.comon";

export interface DashboardState {
    accountsState: {
        loading: LOADING_STATE;
        accounts: Account[];
    }
}

export interface Account {
    _id: string;
    userId: string;
    metamask: {
        phrases: string;
        password: string;
        balance?: number;
    };
    twitter?: {
        login: string;
        password: string;
    };
    discord?: {
        login: string;
        password: string;
    };
}

export interface BaseRequest<T> {
    userId: string;
    payload?: T;
}