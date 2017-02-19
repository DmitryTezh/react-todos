import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import appReducers from './reducers';
import App from './containers/App';
import TodoBox from './containers/TodoBox';
import './index.css';

let appStore = createStore(appReducers, devToolsEnhancer());

ReactDOM.render(
    <Provider store={appStore}>
        <App>
            <TodoBox title="My Tasks"/>
        </App>
    </Provider>,
    document.getElementById('root')
);
