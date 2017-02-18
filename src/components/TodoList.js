/**
 * Created by DIMOS on 11.02.2017.
 */
import React, {PropTypes} from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

const TodoList = ({items, activeId, onInsert, onEdit, onUpdate, onComplete, onDelete}) => (
    <div>
        <TodoInput item={{id: -1, priority: 1, text: '', completed: false}} onSave={onInsert}/>
        {items.map(item => (
            item.id === activeId
                ? <TodoInput key={item.id} item={item} onSave={onUpdate}/>
                : (item.filtered || item.filtered === undefined) &&
                <TodoItem key={item.id} item={item} onEdit={onEdit} onComplete={onComplete} onDelete={onDelete}/>
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
    activeId: PropTypes.number.isRequired,
    onInsert: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default TodoList;