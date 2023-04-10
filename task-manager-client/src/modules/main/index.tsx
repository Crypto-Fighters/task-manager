import * as React from 'react';
import {Sidebar} from "./components/SideBar";
import {useLocation} from "react-router";
import Paper from "@mui/material/Paper";
import {AccountsTab} from "./components/tabs/AccountsTab";
import {useEffect} from "react";
import {fetchAccounts} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../auth/selectors";

export const Main = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelector);

    useEffect(() => {
        if (user?.access_token){
            // TODO govno
            setTimeout(() => dispatch(fetchAccounts.request()), 200);
        }
    }, [])

    return (
        <div style={{backgroundColor: '#80808026', display: 'flex' }}>
            <Sidebar onSidebarClose={() => {}} isSidebarOpen={true} isMobileSidebarOpen={true}/>
            {location.pathname.includes('dashboard/task') && (
                <div style={{width: '100%'}}>
                    <Paper sx={{height: '300px', margin: '15px  15px 0px', borderRadius: '10px'}}/>
                </div>
            )}
            {location.pathname.includes('dashboard/accounts') && <AccountsTab/>}
        </div>
    );
}