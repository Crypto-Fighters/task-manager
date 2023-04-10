import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import {DashboardState} from './types';
import {fetchAccounts, fetchJobDefinitions} from "./actions";

const initialState: DashboardState = {
    accountsState: {
        loading: 'IDLE',
        accounts: []
    },
    jobsState: {
        definitions: [],
    }
};

type Actions = ActionType<typeof actions>;

export const dashBoardReducer: Reducer<DashboardState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(fetchAccounts.request):
            return {
                ...state,
                accountsState: {
                    loading: 'REQUEST',
                    accounts: []
                }
            };

        case getType(fetchAccounts.success):
            return {
                ...state,
                accountsState: {
                    loading: 'SUCCESS',
                    accounts: action.payload
                }
            };

        case getType(fetchJobDefinitions.success):
            return {
                ...state,
                jobsState: {
                    ...state.jobsState,
                    definitions: action.payload,
                }
            };

        default:
            return state;
    }
};