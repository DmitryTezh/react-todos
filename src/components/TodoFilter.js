/**
 * Created by DIMOS on 15.02.2017.
 */
import React, {Component, PropTypes} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class TodoFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {priority: this.props.priority, status: this.props.status};
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value}, () => this.handleFilter());
    }
    handleFilter() {
        let priority = Number(this.state.priority);
        let status = Number(this.state.status);
        this.props.onFilter(priority, status);
    }
    handleReset(event) {
        this.setState({priority: 0, status: 0}, () => this.handleFilter());
    }
    render() {
        return (
            <div className="form-inline">
                <select name="priority" value={this.state.priority} onChange={this.handleChange}>
                    <option value={0}>All</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
                <select name="status" value={this.state.status} onChange={this.handleChange}>
                    <option value={0}>All</option>
                    <option value={1}>Not completed</option>
                    <option value={2}>Completed</option>
                </select>
                <input type="button" value="Reset" onClick={this.handleReset}/>
            </div>
        )
    }
}

TodoFilter.propTypes = {
    priority: PropTypes.oneOf([0,1,2,3]).isRequired,
    status: PropTypes.oneOf([0,1,2]).isRequired,
    onFilter: PropTypes.func.isRequired
}

TodoFilter.defaultProps = {
    priority: 0,
    status: 0
}

export default TodoFilter;