import axios from "axios";
import {BASE_URL} from "../../urls";
import {
    AddNewJobRequest,
    CreateAccountRequest,
    EditAccountRequest,
    RemoveAccountRequest,
    RemoveJobRequest
} from "./types";

export const getAllJobs = async (userId: string) => {
    const { data } = await axios.post(`${BASE_URL}/jobs/all/${userId}`);

    return data;
};

export const addNewJobApi = async (request: AddNewJobRequest) => {
    const { data } = await axios.post(`${BASE_URL}/jobs/create`);

    return data;
};

export const deleteJobApi = async (request: RemoveJobRequest) => {
    const { data } = await axios.post(`${BASE_URL}/jobs/remove`, {data: request});

    return data;
};

export const getJobsDefinitions = async () => {
    const { data } = await axios.get(`${BASE_URL}/jobs/all/definitions`);

    return data;
};

export const getAccounts = async (userId: string) => {
    const { data } = await axios.post(`${BASE_URL}/accounts/all/${userId}`);

    return data;
};

export const addNewAccount = async (request: CreateAccountRequest) => {
    const { data } = await axios.post(`${BASE_URL}/accounts/create`, request);

    return data;
};

export const editAccountApi = async (request: EditAccountRequest) => {
    const { data } = await axios.put(`${BASE_URL}/accounts/update`, request);

    return data;
};

export const deleteAccount = async (request: RemoveAccountRequest) => {
    const { data } = await axios.delete(`${BASE_URL}/accounts/remove`, {data: request});

    return data;
};