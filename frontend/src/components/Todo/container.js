import React, { Component } from "react";
import PropTypes from "prop-types";
import Todo from "./presenter";

class Container extends Component {
  state = {
    seeingTodoDetail: false
  };
  render() {
    return (
      <Todo {...this.state} {...this.props} showTodo={this.props.showTodo} />
    );
  }
}
export default Container;
