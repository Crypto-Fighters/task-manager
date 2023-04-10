import * as React from 'react';
import Paper from "@mui/material/Paper";
import {useSelector} from "react-redux";
import Form from '@rjsf/mui';
import {jobsDefinitionsSelector} from "../../selectors";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, Theme, useTheme} from '@mui/material';
import {useMemo, useState} from "react";
import validator from '@rjsf/validator-ajv8';
import {RJSFSchema} from "@rjsf/utils";

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const JobsTab = () => {
    const definitions =  useSelector(jobsDefinitionsSelector);
    const [definitionId, setDefinitionId] = useState<number | string>();
    const theme = useTheme();

    const jobNames = useMemo(() => definitions.map(({jobName}) => jobName), [definitions]);

    const test: RJSFSchema = {
        type: 'object',
        properties: {
            text: { type: 'string' },
        },
    };
    return (
        <div style={{width: 'calc(100% - 300px)'}}>
            <Paper sx={{height: '300px', margin: '15px  15px 0px', borderRadius: '10px'}}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Задачи</InputLabel>
                    <Select
                        value={definitionId}
                        onChange={(e) => setDefinitionId(e.target.value)}
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
                <Form
                    validator={validator}
                    tagName='div'
                    schema={test}
                    uiSchema={{}}
                    onChange={(value) => {}}
                >
                    <React.Fragment />
                </Form>
            </Paper>
        </div>
    );
}