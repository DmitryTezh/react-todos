/**
 * Created by DIMOS on 18.02.2017.
 */
import * as actionTypes from '../constants/actionTypes';

const initialState = {
    priorityFilter: actionTypes.PRIORITY_FILTERS.SHOW_ALL,
    toggleFilter: actionTypes.TOGGLE_FILTERS.SHOW_ALL
};

const filters = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRIORITY_FILTER: {
            return {
                ...state,
                priorityFilter: action.filter
            }
        }
        case actionTypes.SET_TOGGLE_FILTER: {
            return {
                ...state,
                toggleFilter: action.filter
            }
        }
        case actionTypes.RESET_ALL_FILTERS: {
            return {
                ...state,
                priorityFilter: actionTypes.PRIORITY_FILTERS.SHOW_ALL,
                toggleFilter: actionTypes.TOGGLE_FILTERS.SHOW_ALL
            }
        }
        default:
            return state;
    }
};

export default filters;