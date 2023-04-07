import { createSelector } from "reselect";
import {AppState} from "../../store/rootReducer";

export const commonState = (state: AppState) => state;

export const currentUserSelector = createSelector(commonState, (state) => state.auth.user);