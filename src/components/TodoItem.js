/**
 * Created by DIMOS on 11.02.2017.
 */
import React, {PropTypes} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const priorities = ["text-danger", "text-primary", "text-success"];
const LabelItem = ({priority, children}) => <label className={priorities[priority - 1]}>{children}</label>;
const PendingItem = ({priority, text}) => <LabelItem priority={priority}>{text}</LabelItem>;
const CompletedItem = ({priority, text}) => <LabelItem priority={priority}><del>{text}</del></LabelItem>;

const TodoItem = ({item, onEdit, onComplete, onDelete}) => (
    <div>
        <input type="checkbox" checked={item.completed} onChange={() => onComplete(item.id)}/>
        {item.completed
            ? <CompletedItem priority={item.priority} text={item.text}/>
            : <PendingItem priority={item.priority} text={item.text}/>
        }
        <button className="btn btn-primary btn-xs" onClick={() => onEdit(item.id)}>Edit</button>
        <button className="btn btn-danger btn-xs" onClick={() => onDelete(item.id)}>Remove</button>
    </div>
)

TodoItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        priority: PropTypes.oneOf([1,2,3]).isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default TodoItem;
