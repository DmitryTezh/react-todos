/**
 * Created by DIMOS on 18.02.2017.
 */
import * as actionTypes from '../constants/actionTypes';

/*
    Action creator pattern
 */
function makeActionCreator(type, ...argNames) {
    return function(...args) {
        let action = {type};
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action;
    }
}

/*
    Todo action creators
 */
export const amendTodo = makeActionCreator(actionTypes.AMEND_TODO, 'id', 'priority', 'text');
export const selectTodo = makeActionCreator(actionTypes.SELECT_TODO, 'id');
export const toggleTodo = makeActionCreator(actionTypes.TOGGLE_TODO, 'id');
export const removeTodo = makeActionCreator(actionTypes.REMOVE_TODO, 'id');

/*
    Filter action creators
 */
export const setPriorityFilter = makeActionCreator(actionTypes.SET_PRIORITY_FILTER, 'filter');
export const setToggleFilter = makeActionCreator(actionTypes.SET_TOGGLE_FILTER, 'filter');
export const resetAllFilters = makeActionCreator(actionTypes.RESET_ALL_FILTERS);

/*
    Fetching action creators
 */
export const loadTodos = () => ({
    types: [actionTypes.LOAD_TODOS_REQUEST, actionTypes.LOAD_TODOS_SUCCESS, actionTypes.LOAD_TODOS_FAILURE],
    fetchUrl: 'http://localhost:5000/api/todo'
});

export const addTodo = (priority, text) => ({
    types: [actionTypes.ADD_TODO_REQUEST, actionTypes.ADD_TODO_SUCCESS, actionTypes.ADD_TODO_FAILURE],
    fetchUrl: 'http://localhost:5000/api/todo',
    method: 'post',
    payload: {priority, text}
});