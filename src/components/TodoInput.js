/**
 * Created by DIMOS on 12.02.2017.
 */
import React, {Component, PropTypes} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {item: this.props.item};
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleChange(event) {
        let value = event.target.name === 'priority' ? Number(event.target.value) : event.target.value;
        this.setState({item: {...this.state.item, [event.target.name]: value}});
    }
    handleSave(event) {
        event.preventDefault();
        let priority = this.state.item.priority;
        let text = this.state.item.text.trim();
        if (priority && text)
        {
            this.props.onSave(this.state.item);
            this.setState({item: {...this.state.item, priority: 1, text: ''}});
        }
    }
    handleCancel(event) {
        this.props.onSave();
        this.setState({item: {...this.state.item, priority: 1, text: ''}});
    }
    render() {
        return (
            <form onSubmit={this.handleSave} className="form-inline">
                <select name="priority" value={this.state.item.priority} onChange={this.handleChange}>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
                <input type="text" name="text" value={this.state.item.text} onChange={this.handleChange}/>
                <input type="submit" value={this.state.item.id >= 0 ? 'Save' : 'Add'}/>
                <input type="button" value="Cancel" onClick={this.handleCancel}/>
            </form>
        )
    }
}

TodoInput.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        priority: PropTypes.oneOf([1,2,3]).isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    onSave: PropTypes.func.isRequired
}

export default TodoInput;
