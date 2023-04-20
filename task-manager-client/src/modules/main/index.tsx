import * as React from 'react';
import {Sidebar} from "./components/SideBar";
import {useLocation} from "react-router";
import Paper from "@mui/material/Paper";
import {AccountsTab} from "./components/tabs/AccountsTab";
import {useEffect} from "react";
import {fetchAccounts, fetchAllJobs, fetchJobDefinitions} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../auth/selectors";
import {JobsTab} from "./components/tabs/JobsTab";

export const Main = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelector);

    useEffect(() => {
        if (user?.access_token){
            // TODO govno
            setTimeout(() => {
                dispatch(fetchAccounts.request());
                dispatch(fetchJobDefinitions.request());
                dispatch(fetchAllJobs.request());
            }, 200);
        }
    }, [])

    return (
        <div style={{backgroundColor: '#80808026', display: 'flex' }}>
            <Sidebar onSidebarClose={() => {}} isSidebarOpen={true} isMobileSidebarOpen={true}/>
            {location.pathname.includes('dashboard/task') && <JobsTab/>}
            {location.pathname.includes('dashboard/accounts') && <AccountsTab/>}
        </div>
    );
}