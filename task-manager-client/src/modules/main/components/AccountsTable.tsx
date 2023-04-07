import React, {useCallback, useEffect, useMemo, useState} from 'react';
import MaterialReactTable, {
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {Account} from "../types";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {accountsSelector} from "../selectors";
import {fetchAccounts} from "../actions";

const useStyles = makeStyles()(() => ({
    tableRoot: {
        height: 'calc(100% - 30px)',
        margin: '15px',

        '& > div': {
            height: '100%',
        }
    },
}));

export const AccountsTable = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const accounts = useSelector(accountsSelector);
    const dispatch = useDispatch();
    const {classes} = useStyles();

    useEffect(() => {
        dispatch(fetchAccounts.request());
    }, []);

    const handleCreateNewRow = (newAccount: Account) => {

    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Account>) => {
            // if (
            //     !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            // ) {
            //     return;
            // }
            //send api delete request here, then refetch or update local table data for re-render
            // tableData.splice(row.index, 1);
            // setTableData([...tableData]);
        },
        [accounts],
    );

    const columns = useMemo<MRT_ColumnDef<Account>[]>(
        () => [
            {
                accessorKey: '_id',
                header: 'ID',
                enableColumnOrdering: false,
                size: 20,
                enableEditing: false,
                enableSorting: false,
            },
            {
                accessorKey: 'metamask.phrases',
                header: 'Metamask фразы',
            },
            {
                accessorKey: 'metamask.password',
                header: 'Metamask пароль для расширения',
            },
            {
                accessorKey: 'metamask.balance',
                header: 'Metamask баланс (скоро)',
            },
            {
                accessorKey: 'twitter.login',
                header: 'Twitter логин',
            },
            {
                accessorKey: 'twitter.password',
                header: 'Twitter пароль',
            },
            {
                accessorKey: 'discord.login',
                header: 'Discord логин',
            },
            {
                accessorKey: 'discord.password',
                header: 'Dwitter пароль',
            },
        ],
        [],
    );

    return (
        <>
            <div className={classes.tableRoot}>
                <MaterialReactTable
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            size: 120,
                        },
                    }}
                    columns={columns}
                    data={accounts}
                    editingMode="modal" //default
                    enableColumnOrdering
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    renderTopToolbarCustomActions={() => (
                        <Button
                            color="secondary"
                            onClick={() => setCreateModalOpen(true)}
                            variant="contained"
                        >
                            Create New Account
                        </Button>
                    )}
                />
            </div>
            <CreateNewAccountModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};

interface CreateModalProps {
    columns: MRT_ColumnDef<Account>[];
    onClose: () => void;
    onSubmit: (values: Account) => void;
    open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
                                          open,
                                          columns,
                                          onClose,
                                          onSubmit,
                                      }: CreateModalProps) => {
    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {} as any),
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Account</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.filter(col => col.accessorKey !== '_id').map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};