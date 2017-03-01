import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {Provider} from 'react-redux';
import reducers from './reducers';
import fetchMiddleware from './middlewares/fetchMiddleware'
import App from './containers/App';
import TodoBox from './containers/TodoBox';
import './index.css';

let store = createStore(reducers, composeWithDevTools(applyMiddleware(fetchMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <App>
            <TodoBox title="My Tasks"/>
        </App>
    </Provider>,
    document.getElementById('root')
);
