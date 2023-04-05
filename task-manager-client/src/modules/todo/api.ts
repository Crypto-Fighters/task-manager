import axios from "axios";
import {ITodo} from "./types";

export const getTodos = async () => {
    const { data } = await axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos");

    return data;
};