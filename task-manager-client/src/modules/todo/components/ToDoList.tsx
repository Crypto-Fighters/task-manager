import React, {useCallback, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";

import {getErrorSelector, getPendingSelector, getTodosSelector} from "../selectors";
import {makeStyles} from "tss-react/mui";
import {fetchTODO} from "../actions";

export const useStyles = makeStyles()(() => ({
    root: {
        padding: '15px',
    },
    item: {
        marginBottom: '10px'
    }
}));

export const ToDoList = () => {
    const dispatch = useDispatch();
    const pending = useSelector(getPendingSelector);
    const todos = useSelector(getTodosSelector);
    const error = useSelector(getErrorSelector);
    const {classes} = useStyles();

    const getTodosHandler = useCallback(() => {
        dispatch(fetchTODO.request())
    }, [dispatch]);

    const items = useMemo(() => todos.map((todo, index) => (
        <div className={classes.item} key={todo.id}>
            {++index}. {todo.title}
        </div>
    )), [todos]);

    return (
        <div className={classes.root}>
            <button onClick={getTodosHandler}>Add Items</button>
            {pending ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error</div>
            ) : items}
        </div>
    );
};
