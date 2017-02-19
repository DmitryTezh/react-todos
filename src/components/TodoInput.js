/**
 * Created by DIMOS on 12.02.2017.
 */
import React, {Component, PropTypes} from 'react';
import * as actionTypes from '../constants/actionTypes';
import 'bootstrap/dist/css/bootstrap.css'

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {priority: this.props.priority, text: this.props.text};
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleChange(event) {
        let value = event.target.name === 'priority' ? Number(event.target.value) : event.target.value;
        this.setState({[event.target.name]: value});
    }
    handleSave(event) {
        event.preventDefault();
        let priority = this.state.priority;
        let text = this.state.text.trim();
        if (priority && text)
        {
            if (this.props.id !== undefined)
            {
                this.props.actions.amendTodo(this.props.id, priority, text);
            }
            else
            {
                this.props.actions.addTodo(priority, text);
            }
            this.setState({priority: 1, text: ''});
        }
    }
    handleCancel(event) {
        this.props.actions.selectTodo(0);
        this.setState({priority: 1, text: ''});
    }
    render() {
        return (
            <form onSubmit={this.handleSave} className="form-inline">
                <select name="priority" value={this.state.priority} onChange={this.handleChange}>
                    <option value={actionTypes.PRIORITIES.HIGH}>High</option>
                    <option value={actionTypes.PRIORITIES.MEDIUM}>Medium</option>
                    <option value={actionTypes.PRIORITIES.LOW}>Low</option>
                </select>
                <input type="text" name="text" value={this.state.text} onChange={this.handleChange}/>
                <input type="submit" value={this.props.id !== undefined ? 'Save' : 'Add'}/>
                <input type="button" value="Cancel" onClick={this.handleCancel}/>
            </form>
        )
    }
}

TodoInput.propTypes = {
    id: PropTypes.number,
    priority: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    actions: PropTypes.any.isRequired
};

export default TodoInput;
