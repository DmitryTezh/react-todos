/**
 * Created by DIMOS on 18.02.2017.
 */
import * as actionTypes from '../constants/actionTypes';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';

const initialState = {
    todos: [],
    todosById: {},
    isFetching: false,
    currentTodo: 0
};
/*
const initialState = {
    todos: [1,2,3],
    todosById: {
        1: {id: 1, priority: actionTypes.PRIORITIES.HIGH, text: 'VERY URGENT TASK', completed: false},
        2: {id: 2, priority: actionTypes.PRIORITIES.MEDIUM, text: 'URGENT TASK', completed: false},
        3: {id: 3, priority: actionTypes.PRIORITIES.LOW, text: 'NOT URGENT TASK', completed: false},
    },
    isFetching: false,
    currentTodo: 0
};
*/
let nextId = initialState.todos.length + 1;

const todos = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_TODOS_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case actionTypes.LOAD_TODOS_SUCCESS: {
            nextId = action.data.length + 1;
            return {
                ...state,
                todos: map(action.data, item => item.id),
                todosById: keyBy(action.data, item => item.id),
                isFetching: false,
                error: undefined
            }
        }
        case actionTypes.LOAD_TODOS_FAILURE: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        }
        case actionTypes.ADD_TODO: {
            const newId = nextId++;
            return {
                ...state,
                todos: state.todos.concat(newId),
                todosById: {
                    ...state.todosById,
                    [newId]: {id: newId, priority: action.priority, text: action.text, completed: false}
                }
            }
        }
        case actionTypes.AMEND_TODO: {
            return {
                ...state,
                todosById: mapValues(state.todosById, todo => {
                    return todo.id === action.id ? {...todo, priority: action.priority, text: action.text} : todo
                }),
                currentTodo: 0
            }
        }
        case actionTypes.SELECT_TODO: {
            return {
                ...state,
                currentTodo: action.id
            }
        }
        case actionTypes.TOGGLE_TODO: {
            return {
                ...state,
                todosById: mapValues(state.todosById, todo => {
                    return todo.id === action.id ? {...todo, completed: !todo.completed} : todo
                })
            }
        }
        case actionTypes.REMOVE_TODO: {
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id),
                todosById: omit(state.todosById, action.id)
            }
        }
        default:
            return state;
    }
};

export default todos;
