import { createAsyncAction } from "typesafe-actions";
import {
    AuthRequest,
    AuthResponse,
} from "./types";

export const auth = createAsyncAction(
    'AUTH_REQUEST',
    'AUTH_SUCCESS',
    'AUTH_FAILURE'
)<AuthRequest, AuthResponse, string>();