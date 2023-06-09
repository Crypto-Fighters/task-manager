import { createSelector } from "reselect";
import {AppState} from "../../store/rootReducer";
import {commonState, currentUserSelector} from "../auth/selectors";

export const userIdSelector = createSelector(currentUserSelector, (state) => state?._id);

export const accountsSelector = createSelector(commonState, (state) => state?.dashBoard.accountsState.accounts);