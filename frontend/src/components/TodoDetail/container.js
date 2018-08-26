import React, { Component } from "react";
import TodoDetail from "./presenter";

class Container extends Component {
  state = {
    id: "",
    title: "",
    beforeIds: [],
  };

  render() {
    return <TodoDetail {...this.props} {...this.state} />;
  }
}

export default Container;
