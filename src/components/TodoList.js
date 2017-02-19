/**
 * Created by DIMOS on 11.02.2017.
 */
import React, {PropTypes} from 'react';
import * as actionTypes from '../constants/actionTypes';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

const TodoList = ({items, currentId, actions}) => (
    <div>
        <TodoInput priority={actionTypes.PRIORITIES.HIGH} text={''} actions={actions}/>
        {items.map(item => (
            item.id === currentId
                ? <TodoInput key={item.id} {...item} actions={actions}/>
                : <TodoItem key={item.id} item={item} actions={actions}/>
        ))}
    </div>
);

TodoList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        priority: PropTypes.oneOf([1,2,3]).isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    currentId: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};

export default TodoList;