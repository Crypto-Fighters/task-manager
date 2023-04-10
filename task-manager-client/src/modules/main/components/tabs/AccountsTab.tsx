import * as React from 'react';
import {AccountsTable} from "../AccountsTable";

export const AccountsTab = () => {

    return (
        <div style={{width: 'calc(100% - 300px)'}}>
            <AccountsTable/>
        </div>
    );
}