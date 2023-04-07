import * as React from 'react';
import {Sidebar} from "./components/SideBar";
import {useLocation} from "react-router";
import {AccountsTable} from "./components/AccountsTable";
import Paper from "@mui/material/Paper";

export const Main = () => {
    const location = useLocation();

    return (
        <div style={{backgroundColor: '#80808026', display: 'flex' }}>
            <Sidebar onSidebarClose={() => {}} isSidebarOpen={true} isMobileSidebarOpen={true}/>
            {location.pathname.includes('dashboard/task') && (
                <div style={{width: '100%'}}>
                    <Paper sx={{height: '300px', margin: '15px  15px 0px', borderRadius: '10px'}}/>
                </div>
            )}
            {location.pathname.includes('dashboard/accounts') && (
                <div style={{width: 'calc(100% - 300px)'}}>
                    <AccountsTable/>
                </div>
            )}
        </div>
    );
}