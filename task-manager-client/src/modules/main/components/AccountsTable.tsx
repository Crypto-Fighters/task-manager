import React, {useCallback, useMemo, useState} from 'react';
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
    DialogTitle, Divider,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {Account} from "../types";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {accountsSelector, userIdSelector} from "../selectors";
import {addAccount, editAccount, removeAccount} from "../actions";
import {omit} from "lodash";
import {normalizeDto} from "../../../utils.comon";
import {useConfirm} from "material-ui-confirm";

const useStyles = makeStyles()(() => ({
    tableRoot: {
        height: 'calc(100% - 30px)',
        margin: '15px',

        '& > div': {
            height: '100%',
        }
    },
    inputsBlock: {
        display: 'flex',
        gap: '15px',

        '& > div': {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },

        '& hr': {
            width: 1,
            height: 125,
        }
    }
}));

export const AccountsTable = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const accounts: Account[] = useSelector(accountsSelector);
    const userId: string | undefined = useSelector(userIdSelector);
    const confirm = useConfirm();

    const {classes} = useStyles();
    const dispatch = useDispatch();

    const handleCreateNewRow = (newAccount: Account) => {
        dispatch(addAccount.request(omit(newAccount, ['_id', 'metamask.balance']) as any));
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Account>) => {
            confirm({ description: `Вы действительно хотите удалить аккаунт?`, title: 'Подтверждение' }).then(() => {
                dispatch(removeAccount.request({_id: accounts[row.index]._id}))
            }).catch(() => console.log('Удаление аккаунта отменено'));
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
                header: 'Metamask пароль',
            },
            {
                accessorKey: 'metamask.balance',
                enableEditing: false,
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
                header: 'Discord пароль',
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
                    onEditingRowSave={({row, values, exitEditingMode}) => {
                        dispatch(editAccount.request({
                            userId: userId || '',
                            payload: {...accounts[row.index], ...normalizeDto(values)},
                        }));
                        exitEditingMode();
                    }}
                    editingMode="modal"
                    enableColumnOrdering
                    enableEditing
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
                            style={{borderRadius: '25px', background: '#ff7207'}}
                        >
                            Добавить аккаунт
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

    const {classes} = useStyles();

    const handleSubmit = () => {
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open} style={{borderRadius: '15px'}}>
            <DialogTitle textAlign="center">Добавление аккаунта</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={classes.inputsBlock}>
                       <div>
                           <TextField
                               label={'Metamask фразы'}
                               name={'metamask.phrases'}
                               onChange={(e) =>
                                   setValues({ ...values, [e.target.name]: e.target.value })
                               }
                           />
                           <TextField
                               label={'Metamask пароль'}
                               name={'metamask.password'}
                               onChange={(e) =>
                                   setValues({ ...values, [e.target.name]: e.target.value })
                               }
                           />
                       </div>
                        <Divider orientation='vertical'/>
                        <div>
                            <TextField
                                label={'Twitter логин'}
                                name={'twitter.login'}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                            <TextField
                                label={'Twitter пароль'}
                                name={'twitter.password'}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        </div>
                        <Divider orientation='vertical'/>
                        <div>
                            <TextField
                                label={'Discord логин'}
                                name={'discord.login'}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                            <TextField
                                label={'Discord пароль'}
                                name={'discord.password'}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >

                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Отмена</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Добавть новый аккаунт
                </Button>
            </DialogActions>
        </Dialog>
    );
};