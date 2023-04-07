import { combineReducers } from "redux";
import {authReducer} from "../modules/auth/reducer";
import {dashBoardReducer} from "../modules/main/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    dashBoard: dashBoardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;