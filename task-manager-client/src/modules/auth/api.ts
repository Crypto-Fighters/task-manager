import axios from "axios";
import {BASE_URL} from "../../urls";

export const authApi = async (login: string, password: string) => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {login, password});

    return data;
};