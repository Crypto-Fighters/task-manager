import axios from "axios";
import {BASE_URL} from "../../urls";
import {CreateAccountRequest, EditAccountRequest} from "./types";

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