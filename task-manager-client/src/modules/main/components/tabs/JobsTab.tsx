import * as React from 'react';
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";
import Form from '@rjsf/mui';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {accountsSelector, jobsDefinitionsSelector} from "../../selectors";
import {
    Autocomplete,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select, Stack,
    TextField,
    Theme,
    useTheme
} from '@mui/material';
import {useCallback, useMemo, useState} from "react";
import validator from '@rjsf/validator-ajv8';
import {isNumber, isString, isUndefined} from "lodash";
import {makeStyles} from "tss-react/mui";
import {addNewJob} from "../../actions";

const useStyles = makeStyles()(() => ({
    customForm: {
        margin: '15px',
    },
}));

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const JobsTab = () => {
    const definitions = useSelector(jobsDefinitionsSelector);
    const accounts = useSelector(accountsSelector);
    const [values, setValues] = useState<any>({mode: "FIXED"});
    const theme = useTheme();
    const dispatch = useDispatch();
    const {classes} = useStyles();

    const jobNames = useMemo(() => definitions.map(({jobName}) => jobName), [definitions]);

    const isFullData = useMemo(() => {
        return !!values && !!values?.mode && !!values.tag && !!values.nextPlannedDate && !!values.accountId && !isUndefined(values.originalJobId);
    }, [values])

    const onCreateNewJob = useCallback(() => {
        dispatch(addNewJob.request(values));
        setValues({mode: "FIXED"});
    }, [isFullData, values, dispatch]);

    const accountsOptions = useMemo(() => {
        return accounts.map(acc => ({label: acc._id, id: acc._id}));
    }, [accounts]);

    return (
        <div style={{width: 'calc(100% - 300px)', display: 'flex', flexDirection: 'column'}}>
            <Paper sx={{height: '300px', margin: '15px  15px 0px', borderRadius: '10px'}}>
                <Stack>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'baseline'}}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Задачи</InputLabel>
                            <Select
                                value={values?.originalJobId}
                                name='originalJobId'
                                onChange={(e) =>
                                    setValues({...(values || {}), originalJobId: e.target.value})
                                }
                                input={<OutlinedInput label="Задача"/>}
                                // MenuProps={MenuProps}
                            >
                                {definitions.map(({jobName, jobId}) => (
                                    <MenuItem
                                        key={jobName}
                                        value={jobId}
                                        style={getStyles(jobName, jobNames, theme)}
                                    >
                                        {jobName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <form>
                            <div style={{display: 'flex', gap: '15px'}}>
                                <TextField
                                    label={'Тег'}
                                    onChange={(e) =>
                                        setValues({...(values || {}), tag: e.target.value})
                                    }
                                />
                                <Select
                                    label={'Мод'}
                                    value={values?.mode || 'FIXED'}
                                    onChange={(e) =>
                                        setValues({...(values || {}), mode: e.target.value})
                                    }
                                    readOnly
                                >
                                    <MenuItem
                                        value={'FIXED'}
                                    >
                                        FIXED
                                    </MenuItem>
                                    <MenuItem
                                        value={'FLEXIBLE'}
                                    >
                                        FLEXIBLE
                                    </MenuItem>
                                </Select>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props}/>}
                                        label="Дата планирования"
                                        value={values.date}
                                        onChange={(value) => setValues({...(values || {}), nextPlannedDate: value})}
                                    />
                                </LocalizationProvider>
                                <Autocomplete
                                    disablePortal
                                    options={accountsOptions}
                                    sx={{ width: 300 }}
                                    renderInput={(params: any) => <TextField {...params} label="Account" />}
                                    onChange={(e, value) => setValues({...(values || {}), accountId: value?.id})}
                                />
                            </div>
                        </form>
                    </div>
                    {
                        (!values?.originalJobId && !isNumber(values.originalJobId)) || (
                            <Form
                                validator={validator}
                                disabled={!isFullData}
                                className={classes.customForm}
                                tagName='div'
                                schema={!isString(values.originalJobId) ? definitions[values.originalJobId].schema : { }}
                                uiSchema={{}}
                                onSubmit={onCreateNewJob}
                                onChange={(e) => {
                                    setValues({...(values || {}), params: e.formData})
                                }}
                            />
                        )
                    }
                </Stack>
            </Paper>
            <Paper sx={{height: 20, margin: '15px', display: 'flex', flexGrow: 1, borderRadius: '10px'}}></Paper>
        </div>
    );
}