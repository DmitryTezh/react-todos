/**
 * Created by DIMOS on 18.02.2017.
 */
import {combineReducers} from 'redux';
import todos from './todos';
import filters from './filters';

const rootReducer = combineReducers({
    todos,
    filters
});

export default rootReducer;
