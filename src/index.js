import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import App from './containers/App';
import TodoBox from './containers/TodoBox';
//import DevTools from './containers/DevTools';
import './index.css';

const store = configureStore();

render(
    <Provider store={store}>
        <App>
            <TodoBox title="My Tasks"/>
        </App>
    </Provider>,
    document.getElementById('root')
);
