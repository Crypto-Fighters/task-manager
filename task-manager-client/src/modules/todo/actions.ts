import { createAsyncAction } from "typesafe-actions";
import {
    FetchTodoSuccessPayload,
    FetchTodoFailurePayload,
} from "./types";

export const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
export const FETCH_TODO_FAILURE = "FETCH_TODO_FAILURE";

export const fetchTODO = createAsyncAction(
    'FETCH_TODO_REQUEST',
    'FETCH_TODO_SUCCESS',
    'FETCH_TODO_FAILURE'
)<void, FetchTodoSuccessPayload, FetchTodoFailurePayload>();