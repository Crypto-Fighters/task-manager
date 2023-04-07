import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { State } from './types';
import {getCookie} from "../../utils.comon";
import {auth} from "./actions";

const cookies = {
    access_token: getCookie('access_token'),
    _id: getCookie('_id'),
    login: getCookie('login'),
    avatar: getCookie('avatar')
};

const initialState: State = {
    user: !!cookies._id && !!cookies.login && !!cookies.access_token ? {
        access_token: cookies.access_token,
        login: cookies.login,
        _id: cookies._id,
    } : undefined,
    loading: 'IDLE',
};

type Actions = ActionType<typeof actions>;

export const authReducer: Reducer<State, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(auth.success):
            return {
                ...state,
                user: {
                    access_token: action.payload.access_token,
                    ...action.payload.userInfo
                }
            };
        default:
            return state;
    }
};