/**
 * Created by DIMOS on 12.02.2017.
 */
import React, {Component, PropTypes} from 'react';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

class TodoBox extends Component {
    lastIdx = 0;
    constructor(props) {
        super(props);
        this.lastIdx = this.props.items.length;
        this.state = {items: this.props.items, activeId: -1};
        this.handleFilter = this.handleFilter.bind(this);
        this.handleInsertItem = this.handleInsertItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleCompleteItem = this.handleCompleteItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }
    handleFilter(priority, status) {
        let items = this.state.items.map(item => ({...item, filtered: this.filterItem(priority, status, item)}));
        this.setState({items: items, activeId: -1});
    }
    filterItem(priority, status, item) {
        let filterPriority = priority === 0 || item.priority === priority || false;
        let filterStatus = status === 0 || (status === 1 && !item.completed) || (status === 2 && item.completed) || false;
        return filterPriority && filterStatus;
    }
    handleInsertItem(item) {
        if (!item)
        {
            this.setState({activeId: -1});
            return;
        }

        let items = this.state.items.concat({...item, id: this.lastIdx++});
        this.setState({items: items, activeId: -1});
    }
    handleEditItem(id) {
        this.setState({activeId: id});
    }
    handleUpdateItem(item) {
        if (!item)
        {
            this.setState({activeId: -1});
            return;
        }

        let items = this.state.items.map(e => e.id === item.id ? item : e);
        this.setState({items: items, activeId: -1});
    }
    handleCompleteItem(id) {
        let items = this.state.items.map(item => item.id === id ? {...item, completed: !item.completed} : item);
        this.setState({items: items, activeId: -1});
    }
    handleDeleteItem(id) {
        let items = this.state.items.filter(item => item.id !== id);
        this.setState({items: items, activeId: -1});
    }
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <TodoFilter
                    priority={this.props.priority}
                    status={this.props.status}
                    onFilter={this.handleFilter}/>
                <TodoList
                    items={this.state.items}
                    activeId={this.state.activeId}
                    onInsert={this.handleInsertItem}
                    onEdit={this.handleEditItem}
                    onUpdate={this.handleUpdateItem}
                    onComplete={this.handleCompleteItem}
                    onDelete={this.handleDeleteItem}
                />
            </div>
        );
    }
}

TodoBox.propTypes = {
    title: PropTypes.string.isRequired,
    priority: PropTypes.oneOf([0,1,2,3]),
    status: PropTypes.oneOf([0,1,2]),
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        priority: PropTypes.oneOf([1,2,3]).isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}

export default TodoBox;