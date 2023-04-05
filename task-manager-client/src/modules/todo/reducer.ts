import { Reducer } from 'redux';
import { TodoState } from "./types";
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import {fetchTODO} from "./actions";

const initialState: TodoState = {
    pending: false,
    todos: [],
    error: null,
};

type Actions = ActionType<typeof actions>;

export const todoReducer: Reducer<TodoState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(fetchTODO.request):
            return {
                ...state,
                pending: true,
            };
        case getType(fetchTODO.success):
            return {
                ...state,
                pending: false,
                todos: action.payload.todos,
                error: null,
            };
        case getType(fetchTODO.failure):
            return {
                ...state,
                pending: false,
                todos: [],
                error: action.payload.error,
            };
        default:
            return state;
    }
};