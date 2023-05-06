import { createAsyncAction } from "typesafe-actions";
import {
    Account,
    AddNewJobRequest,
    CreateAccountRequest,
    EditAccountRequest,
    Job,
    JobDefinition,
    RemoveAccountRequest, RemoveJobRequest
} from "./types";

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

export const fetchAllJobs = createAsyncAction(
    'GET_ALL_JOBS_REQUEST',
    'GET_ALL_JOBS_SUCCESS',
    'GET_ALL_JOBS_FAILURE'
)<void, Job[], string>();

export const addNewJob = createAsyncAction(
    'ADD_NEW_JOB_REQUEST',
    'ADD_NEW_JOB_SUCCESS',
    'ADD_NEW_JOB_FAILURE'
)<AddNewJobRequest['payload'], void, string>();

export const removeJob = createAsyncAction(
    'REMOVE_JOB_REQUEST',
    'REMOVE_JOB_SUCCESS',
    'REMOVE_JOB_FAILURE'
)<RemoveJobRequest['payload'], void, string>();