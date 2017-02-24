import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
//import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import appReducers from './reducers';
import fetchMiddleware from './middlewares/fetchMiddleware'
import App from './containers/App';
import TodoBox from './containers/TodoBox';
import './index.css';

let appStore = createStore(appReducers, composeWithDevTools(applyMiddleware(fetchMiddleware)));

ReactDOM.render(
    <Provider store={appStore}>
        <App>
            <TodoBox title="My Tasks"/>
        </App>
    </Provider>,
    document.getElementById('root')
);
