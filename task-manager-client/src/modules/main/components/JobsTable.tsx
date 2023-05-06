import React, {useCallback, useMemo} from 'react';
import MaterialReactTable, {
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import {Job} from "../types";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {jobsDefinitionsSelector, jobsSelector} from "../selectors";
import {removeJob} from "../actions";
import {isNumber, isObject, omit} from "lodash";
import {useConfirm} from "material-ui-confirm";
import Typography from "@mui/material/Typography";

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


function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}-${month}-${year} | ${hours}:${minutes}`;
}

export const JobsTable = () => {
    const jobs: Job[] = useSelector(jobsSelector);
    const confirm = useConfirm();
    const definitions = useSelector(jobsDefinitionsSelector);
    const {classes} = useStyles();

    const dispatch = useDispatch();

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Job>) => {
            confirm({ description: `Вы действительно хотите удалить задачу?`, title: 'Подтверждение' }).then(() => {
                dispatch(removeJob.request({jobId: jobs[row.index].id}))
            }).catch(() => console.log('Удаление задачи отменено'));
        },
        [jobs],
    );

    const columns = useMemo<MRT_ColumnDef<Job>[]>(
        () => [
            {
                accessorKey: 'originalJobId',
                enableEditing: false,
                header: 'Имя',
                Cell: ({ renderedCellValue, row }) => {
                    const jobName = definitions.find(def => def.jobId === renderedCellValue)?.jobName;

                    return !!jobName ? (
                        <Typography>
                            {jobName}
                        </Typography>
                    ) : null;
                }
            },
            {
                accessorKey: 'tag',
                header: 'Тег',
            },
            {
                accessorKey: 'nextPlannedDate',
                enableEditing: false,
                header: 'Следующий запуск',
                Cell: ({ renderedCellValue, row }) =>
                    isNumber(renderedCellValue) ? (
                        <Typography>
                            {formatDate(new Date(renderedCellValue))}
                        </Typography>
                    ) : null,
            },
            {
                accessorKey: 'createdDate',
                enableEditing: false,
                header: 'Дата создания',
                Cell: ({ renderedCellValue, row }) =>
                    isNumber(renderedCellValue) ? (
                        <Typography>
                            {formatDate(new Date(renderedCellValue))}
                        </Typography>
                    ) : null,
            },
            {
                accessorKey: 'mode',
                enableEditing: false,
                header: 'Мод',
            },
            {
                accessorKey: 'params',
                enableEditing: false,
                header: 'Параметры',
                Cell: ({ renderedCellValue, row }) =>
                    isObject(renderedCellValue) ? (
                        <Typography>
                            {JSON.stringify(renderedCellValue)}
                        </Typography>
                    ) : null,
            },
        ],
        [definitions],
    );

    return (
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
                data={jobs}
                enableColumnOrdering
                enableRowActions
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
        </div>
    );
};