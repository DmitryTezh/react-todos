/**
 * Created by DIMOS on 12.02.2017.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TodoActions from '../actions';
import TodoFilter from '../components/TodoFilter';
import TodoList from '../components/TodoList';
import {getFilteredTodos} from '../selectors';

class TodoBox extends Component {
    componentDidMount() {
        this.props.actions.loadTodos();
    }
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                {this.props.isFetching && <h4>Loading...</h4>}
                <div>
                    <TodoFilter
                        priorityFilter={this.props.priorityFilter}
                        toggleFilter={this.props.toggleFilter}
                        actions={this.props.actions}/>
                    <TodoList
                        items={this.props.todos}
                        currentId={this.props.currentTodo}
                        actions={this.props.actions}
                    />
                </div>
                {!this.props.isFetching && this.props.todos.length === 0 && <h4>Nothing todo</h4>}
            </div>
        );
    }
}

TodoBox.propTypes = {
    title: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        priority: PropTypes.oneOf([1,2,3]).isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    currentTodo: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    priorityFilter: PropTypes.string.isRequired,
    toggleFilter: PropTypes.string.isRequired,
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired
};

const mapStateToProps = (state) => {
    return {
        todos: getFilteredTodos(state),
        currentTodo: state.todos.currentTodo,
        isFetching: state.todos.isFetching,
        priorityFilter: state.filters.priorityFilter,
        toggleFilter: state.filters.toggleFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoBox);