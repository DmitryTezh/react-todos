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

        case actionTypes.toRequestType(actionTypes.LOAD_TODOS): {
            return {
                ...state,
                isFetching: true
            }
        }
        case actionTypes.toSuccessType(actionTypes.LOAD_TODOS): {
            return {
                ...state,
                todos: map(action.data, item => item.id),
                todosById: keyBy(action.data, item => item.id),
                isFetching: false,
                error: undefined
            }
        }
        case actionTypes.toFailureType(actionTypes.LOAD_TODOS): {
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        }

        case actionTypes.toRequestType(actionTypes.ADD_TODO):
        case actionTypes.toRequestType(actionTypes.AMEND_TODO):
        case actionTypes.toRequestType(actionTypes.TOGGLE_TODO):
        case actionTypes.toRequestType(actionTypes.REMOVE_TODO): {
            return {
                ...state,
                isSaving: true
            }
        }
        case actionTypes.toSuccessType(actionTypes.ADD_TODO): {
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
        case actionTypes.toFailureType(actionTypes.ADD_TODO):
        case actionTypes.toFailureType(actionTypes.AMEND_TODO):
        case actionTypes.toFailureType(actionTypes.TOGGLE_TODO):
        case actionTypes.toFailureType(actionTypes.REMOVE_TODO): {
            return {
                ...state,
                isSaving: false,
                error: action.error
            }
        }

        case actionTypes.toSuccessType(actionTypes.AMEND_TODO):
        case actionTypes.toSuccessType(actionTypes.TOGGLE_TODO): {
            return {
                ...state,
                todosById: mapValues(state.todosById, todo => {
                    return todo.id === action.data.id ? action.data : todo
                }),
                isSaving: false,
                error: undefined,
                currentTodo: 0
            }
        }

        case actionTypes.toSuccessType(actionTypes.REMOVE_TODO): {
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id),
                todosById: omit(state.todosById, action.id),
                isSaving: false,
                error: undefined
            }
        }

        case actionTypes.SELECT_TODO: {
            return {
                ...state,
                currentTodo: action.id
            }
        }

        default:
            return state;
    }
};

export default todos;
