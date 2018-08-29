import React, { Component } from "react";
import PropTypes from "prop-types";
import Search from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {
    searchByTerm: PropTypes.func.isRequired,
    todo: PropTypes.array
  };

  componentDidMount() {
    const { searchByTerm } = this.props;
    searchByTerm(this.props.match.params.searthTerm);
  }

  componentWillReceiveProps(nextProps) {
    const {
      searchByTerm,
      location: { pathname }
    } = this.props;

    if (nextProps.todo) {
      this.setState({
        loading: false
      });
    }

    if (nextProps.location.pathname !== pathname) {
      searchByTerm(nextProps.match.params.searthTerm);
    }
  }
  
  render() {
    const { todo } = this.props;

    return <Search {...this.state} todo={todo} />;
  }
}

export default Container;
