/**
 * Created by DIMOS on 04.03.2017.
 */
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import {persistState} from 'redux-devtools';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import fetchApi from '../middlewares/fetchApi';
//import DevTools from '../containers/DevTools';

const configureStore = preloadedState => {
    const store = createStore(
        reducers,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(fetchApi, createLogger()),
            //DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
};

export default configureStore;