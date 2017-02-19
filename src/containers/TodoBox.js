/**
 * Created by DIMOS on 12.02.2017.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionTypes from '../constants/actionTypes';
import * as TodoActions from '../actions';
import TodoFilter from '../components/TodoFilter';
import TodoList from '../components/TodoList';
import _ from 'lodash';

class _TodoBox extends Component {
    filterItem(priorityFilter, toggleFilter, item) {
        const priorityCheck = priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_ALL
            || (priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_HIGH && item.priority === actionTypes.PRIORITIES.HIGH )
            || (priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_MEDIUM && item.priority === actionTypes.PRIORITIES.MEDIUM)
            || (priorityFilter === actionTypes.PRIORITY_FILTERS.SHOW_LOW && item.priority === actionTypes.PRIORITIES.LOW);
        const toggleCheck = toggleFilter === actionTypes.TOGGLE_FILTERS.SHOW_ALL
            || (toggleFilter === actionTypes.TOGGLE_FILTERS.SHOW_ACTIVE && !item.completed)
            || (toggleFilter === actionTypes.TOGGLE_FILTERS.SHOW_COMPLETED && item.completed);
        return priorityCheck && toggleCheck;
    }
    render() {
        const {todoState: {todosById, currentTodo}, filterState: {priorityFilter, toggleFilter}, dispatch} = this.props;
        const actions = bindActionCreators(TodoActions, dispatch);
        const items = _.filter(todosById, item => this.filterItem(priorityFilter, toggleFilter, item));

        return (
            <div>
                <h3>{this.props.title}</h3>
                <TodoFilter
                    priorityFilter={priorityFilter}
                    toggleFilter={toggleFilter}
                    actions={actions}/>
                <TodoList
                    items={items}
                    currentId={currentTodo}
                    actions={actions}
                />
            </div>
        );
    }
}

_TodoBox.propTypes = {
    title: PropTypes.string.isRequired,
    todoState: PropTypes.shape({
        todosById: PropTypes.object.isRequired,
        currentTodo: PropTypes.number.isRequired
    }).isRequired,
    filterState: PropTypes.shape({
        priorityFilter: PropTypes.string.isRequired,
        toggleFilter: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
};

const TodoBox = connect(state => ({todoState: state.todos, filterState: state.filters}))(_TodoBox);

export default TodoBox;