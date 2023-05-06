import * as React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import {Job} from "../../types";
import {useSelector} from "react-redux";
import {jobsSelector} from "../../selectors";
import {useCallback, useMemo, useState} from "react";
import {EventSourceInput} from "@fullcalendar/core";
import {Tooltip} from "@mui/material";

const colors = [
    {id: 0, color: '#776096'},
    {id: 1, color: '#e14d34'},
    {id: 2, color: '#27508c'},
    {id: 3, color: '#f0ba09'},
    {id: 4, color: '#5d7a56'},
    {id: 5, color: '#e2dde2'},
    {id: 6, color: '#6b4244'},
    {id: 7, color: '#e26934'}
];

export const CalendarTab = () => {
    const jobs: Job[] = useSelector(jobsSelector);
    const [elToTooltip, setElToTooltip] = useState<HTMLElement>();
    const [tooltipText, setTooltipText] = useState<string>('');

    const events: EventSourceInput = useMemo(() => {
        return jobs.map(job => {
            const color = colors.find(c => c.id === job.originalJobId)?.color;
            return {
                title: job.tag,
                date: new Date(job.nextPlannedDate),
                extendedProps: { description: job.tag },
                color
            };
        });
    }, [jobs]);

    const handleMouseEnter = useCallback((info: any) => {
        if (info.event.extendedProps.description) {
            setElToTooltip(info.el);
            setTooltipText(info.event.extendedProps.description);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setElToTooltip(undefined);
    }, []);

    return (
        <div style={{width: 'calc(100% - 300px)'}}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                eventMouseEnter={handleMouseEnter}
                eventMouseLeave={handleMouseLeave}
                initialView="dayGridMonth"
                eventInteractive
                weekends
                events={events}
            />
            <Tooltip
                open={!!elToTooltip}
                title={tooltipText}
                placement="top"
                PopperProps={{anchorEl: elToTooltip}}
            >
                <div/>
            </Tooltip>
        </div>
    );
}