import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './presenter';


class Container extends Component {
  state = {
    id: "",
    title: "",
    created_at: "",
    updated_at: "",
    status: ""
  };
  render() {
      const { handleTodoDetail } = this.props;
    return (
      <Todo
        {...this.state}
        {...this.props}
            handleTodoDetail={handleTodoDetail}
      />
    );
  }
} 
export default Container;