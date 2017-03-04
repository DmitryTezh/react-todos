/**
 * Created by DIMOS on 18.02.2017.
 */

/*
    Action types
 */
export const AMEND_TODO = 'AMEND_TODO';
export const SELECT_TODO = 'SELECT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

/*
    Fetching action types
 */
export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';
/*
    Filter types
 */
export const SET_PRIORITY_FILTER = 'PRIORITY_FILTER';
export const SET_TOGGLE_FILTER = 'TOGGLE_FILTER';
export const RESET_ALL_FILTERS = 'RESET_ALL_FILTERS';

/*
    Priorities enums
 */
export const PRIORITIES = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
};

export const PRIORITY_FILTERS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_HIGH: 'SHOW_HIGH',
    SHOW_MEDIUM: 'SHOW_MEDIUM',
    SHOW_LOW: 'SHOW_LOW'
};

export const TOGGLE_FILTERS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_COMPLETED: 'SHOW_COMPLETED'
};
