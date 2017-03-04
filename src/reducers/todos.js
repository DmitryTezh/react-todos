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
    isSaving: false,
    currentTodo: 0
};

const todos = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.LOAD_TODOS_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case actionTypes.LOAD_TODOS_SUCCESS: {
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

        case actionTypes.ADD_TODO_REQUEST: {
            return {
                ...state,
                isSaving: true
            }
        }
        case actionTypes.ADD_TODO_SUCCESS: {
            const newTodo = action.data;
            const newId = newTodo.id;
            return {
                ...state,
                todos: state.todos.concat(newId),
                todosById: {
                    ...state.todosById,
                    [newId]: newTodo
                },
                isSaving: false,
                error: undefined
            }
        }
        case actionTypes.ADD_TODO_FAILURE: {
            return {
                ...state,
                isSaving: false,
                error: action.error
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
