/**
 * Created by DIMOS on 18.02.2017.
 */
import * as actionTypes from '../constants/actionTypes';

/*
    Action creators
*/
export const addTodo = (priority, text) => {
    return {
        type: actionTypes.ADD_TODO,
        priority,
        text
    }
};

export const amendTodo = (id, priority, text) => {
    return {
        type: actionTypes.AMEND_TODO,
        id,
        priority,
        text
    }
};

export const selectTodo = (id) => {
    return {
        type: actionTypes.SELECT_TODO,
        id
    }
};

export const toggleTodo = (id) => {
    return {
        type: actionTypes.TOGGLE_TODO,
        id
    }
};

export const removeTodo = (id) => {
    return {
        type: actionTypes.REMOVE_TODO,
        id
    }
};

export const setPriorityFilter = (filter) => {
    return {
        type: actionTypes.SET_PRIORITY_FILTER,
        filter
    }
};

export const setToggleFilter = (filter) => {
    return {
        type: actionTypes.SET_TOGGLE_FILTER,
        filter
    }
};

export const resetAllFilters = () => {
    return {
        type: actionTypes.RESET_ALL_FILTERS
    }
};