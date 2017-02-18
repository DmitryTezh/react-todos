import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoBox from './components/TodoBox'
import './index.css';

var items = [
    {id:0, priority:1, text:"Test1", completed:false},
    {id:1, priority:2, text:"Test2", completed:false},
    {id:2, priority:3, text:"Test3", completed:false},
    {id:3, priority:1, text:"Test4", completed:true},
    {id:4, priority:2, text:"Test5", completed:false},
    {id:5, priority:3, text:"Test6", completed:true},
    {id:6, priority:1, text:"Test7", completed:false},
    {id:7, priority:2, text:"Test8", completed:true},
    {id:8, priority:3, text:"Test9", completed:true},
    {id:9, priority:3, text:"Test10", completed:false}
];

ReactDOM.render(
    <App>
        <TodoBox title="My Tasks" items={items}/>
    </App>,
    document.getElementById('root')
);
