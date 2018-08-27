import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './presenter';


class Container extends Component {
  state = {
    seeingTodoDetail: false
  };
  render() {
    return (
      <Todo
        {...this.state}
        {...this.props}
        openTodoDetail={this._openTodoDetail}
        closeTodoDetail={this._closeTodoDetail}
      />
    );
  }
  _openTodoDetail = () => {
      //console.log(this.props);
      this.setState({
          seeingTodoDetail: true
      });
  }
  _closeTodoDetail = () => {
      this.setState({
          seeingTodoDetail: false
      });
  }
} 
export default Container;