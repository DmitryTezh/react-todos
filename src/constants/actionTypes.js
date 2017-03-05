/**
 * Created by DIMOS on 18.02.2017.
 */

/*
    Todo types
 */
export const LOAD_TODOS = 'LOAD_TODO';
export const ADD_TODO = 'ADD_TODO';
export const AMEND_TODO = 'AMEND_TODO';
export const SELECT_TODO = 'SELECT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

/*
    Filter types
 */
export const SET_PRIORITY_FILTER = 'PRIORITY_FILTER';
export const SET_TOGGLE_FILTER = 'TOGGLE_FILTER';
export const RESET_ALL_FILTERS = 'RESET_ALL_FILTERS';

/*
    Fetch types
 */
export const toRequestType = type => type + '_REQUEST';
export const toSuccessType = type => type + '_SUCCESS';
export const toFailureType = type => type + '_FAILURE';

/*
    Priority enums
 */
export const PRIORITIES = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
};

/*
    Priority filters
 */
export const PRIORITY_FILTERS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_HIGH: 'SHOW_HIGH',
    SHOW_MEDIUM: 'SHOW_MEDIUM',
    SHOW_LOW: 'SHOW_LOW'
};

/*
    Toggle filters
 */
export const TOGGLE_FILTERS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_COMPLETED: 'SHOW_COMPLETED'
};

