import {LOADING_STATE} from "../../utils.comon";

export interface BaseUser {
    login: string;
    password: string;
}

export interface AuthRequest extends BaseUser {
    isRemember?: boolean;
}

export interface UserInfo {
    _id: string;
    login: string;
    avatar?: string;
}

export interface AuthResponse {
    access_token: string,
    userInfo: UserInfo;
}

export interface StoredUser extends UserInfo {
    access_token: string;
}

export type State = {
    user?: StoredUser;
    loading: LOADING_STATE;
};