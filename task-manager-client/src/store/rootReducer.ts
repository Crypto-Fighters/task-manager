import { combineReducers } from "redux";
import {todoReducer} from "../modules/todo/reducer";

const rootReducer = combineReducers({
    // you can create more new reducers by another modules
    todo: todoReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;