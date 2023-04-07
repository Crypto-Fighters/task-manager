import axios from "axios";
import {BASE_URL} from "../../urls";

export const getAccounts = async (userId: string) => {
    const { data } = await axios.get(`${BASE_URL}/accounts/all/${userId}`);

    return data;
};