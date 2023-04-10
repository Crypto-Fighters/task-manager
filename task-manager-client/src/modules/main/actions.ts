import { createAsyncAction } from "typesafe-actions";
import {Account, CreateAccountRequest, EditAccountRequest, JobDefinition, RemoveAccountRequest} from "./types";

export const fetchAccounts = createAsyncAction(
    'FETCH_ACCOUNTS_REQUEST',
    'FETCH_ACCOUNTS_AUTH_SUCCESS',
    'FETCH_ACCOUNTS_AUTH_FAILURE'
)<void, Account[], string>();

export const addAccount = createAsyncAction(
    'ADD_ACCOUNT_REQUEST',
    'ADD_ACCOUNT_SUCCESS',
    'ADD_ACCOUNT_FAILURE'
)<CreateAccountRequest['payload'], void, string>();

export const editAccount = createAsyncAction(
    'EDIT_REQUEST',
    'EDIT_SUCCESS',
    'EDIT_FAILURE'
)<EditAccountRequest, void, string>();

export const removeAccount = createAsyncAction(
    'DELETE_REQUEST',
    'DELETE_SUCCESS',
    'DELETE_FAILURE'
)<RemoveAccountRequest['payload'], void, string>();

export const fetchJobDefinitions = createAsyncAction(
    'GET_JOBS_DEFINITIONS_REQUEST',
    'GET_JOBS_DEFINITIONS_SUCCESS',
    'GET_JOBS_DEFINITIONS_FAILURE'
)<void, JobDefinition[], string>();