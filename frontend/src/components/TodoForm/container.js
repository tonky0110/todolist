import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoForm from "./presenter";
class Container extends Component {
    state = {
        title : "",
        beforeIds: "",
    };

    render() {
        const { title, beforeIds } = this.state;
        return (
            <TodoForm 
                handleInputChanage={this._handleInputChanage}
                handleSubmit={this._handleSubmit}
                titleValue={title}
                beforeIdsValue={beforeIds}
            />
        );
    }

    _handleInputChanage = event => {
        const {target: { value, name }} = event;
        this.setState({
            [name]: value
        });
    }
    
    _handleSubmit = event => {
        const { title, beforeIds } = this.state;
        const { submitTodo } = this.props;
        event.preventDefault();
        submitTodo(title, beforeIds);
    }
}
export default Container;