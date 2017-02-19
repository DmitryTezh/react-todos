/**
 * Created by DIMOS on 15.02.2017.
 */
import React, {PropTypes} from 'react';
import * as actionTypes from '../constants/actionTypes';
import 'bootstrap/dist/css/bootstrap.css';

const TodoFilter = ({priorityFilter, toggleFilter, actions}) => (
    <div className="form-inline">
        <select name="priority" value={priorityFilter} onChange={(e) => actions.setPriorityFilter(e.target.value)}>
            <option value={actionTypes.PRIORITY_FILTERS.SHOW_ALL}>All</option>
            <option value={actionTypes.PRIORITY_FILTERS.SHOW_HIGH}>High</option>
            <option value={actionTypes.PRIORITY_FILTERS.SHOW_MEDIUM}>Medium</option>
            <option value={actionTypes.PRIORITY_FILTERS.SHOW_LOW}>Low</option>
        </select>
        <select name="status" value={toggleFilter} onChange={(e) => actions.setToggleFilter(e.target.value)}>
            <option value={actionTypes.TOGGLE_FILTERS.SHOW_ALL}>All</option>
            <option value={actionTypes.TOGGLE_FILTERS.SHOW_ACTIVE}>Not completed</option>
            <option value={actionTypes.TOGGLE_FILTERS.SHOW_COMPLETED}>Completed</option>
        </select>
        <input type="button" value="Reset" onClick={actions.resetAllFilters}/>
    </div>
);

TodoFilter.propTypes = {
    priorityFilter: PropTypes.string.isRequired,
    toggleFilter: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};

export default TodoFilter;