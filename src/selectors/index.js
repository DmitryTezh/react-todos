/**
 * Created by DIMOS on 03.03.2017.
 */
import {createSelector} from 'reselect';
import * as actionTypes from '../constants/actionTypes';
import filter from 'lodash/filter';

const filterSelector = (state) => state.filters;
const todoSelector = (state) => state.todos.todosById;

const filterItem = (priorityFilter, toggleFilter, item) => {
    const priorityCheck = priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_ALL
        || (priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_HIGH && item.priority === actionTypes.PRIORITIES.HIGH )
        || (priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_MEDIUM && item.priority === actionTypes.PRIORITIES.MEDIUM)
        || (priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_LOW && item.priority === actionTypes.PRIORITIES.LOW);
    const toggleCheck = toggleFilter === actionTypes.TOGGLE_FILTERS.SHOW_ALL
        || (toggleFilter === actionTypes.TOGGLE_FILTERS.SHOW_ACTIVE && !item.completed)
        || (toggleFilter === actionTypes.TOGGLE_FILTERS.SHOW_COMPLETED && item.completed);
    return priorityCheck && toggleCheck;
};

export const selectTodos = createSelector(
    [filterSelector, todoSelector],
    (filters, todos) => filter(todos, item => filterItem(filters.priorityFilter, filters.toggleFilter, item))
);
