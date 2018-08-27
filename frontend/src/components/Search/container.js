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
    console.log("~~~~~~~~~~~~~~~~~2~~~~~~~~~~~~~~~~~~~~");
    searchByTerm(this.props.match.params.searthTerm);
  }

  componentWillReceiveProps(nextProps) {
    console.log("~~~~~~~~~~~~~~~~~1~~~~~~~~~~~~~~~~~~~~");
    const {
      searchByTerm,
      location: { pathname }
    } = this.props;

    if (nextProps.todo) {
      this.setState({
        loading: false
      });
    }

    // if (nextProps.match !== this.props.match) {
    //   searchByTerm();
    // }
    console.log("nextProps.location.pathname : ", nextProps.location);
    console.log("this.props.location.pathname : ", pathname);
    console.log(this.props.match.params.searthTerm);

    if (nextProps.location.pathname !== pathname) {
      console.log("1~~~~~~~~~~~~~~~~~1~~~~~~~~~~~~~~~~~~~~1");
      searchByTerm(nextProps.match.params.searthTerm);
      console.log("2~~~~~~~~~~~~~~~~~2~~~~~~~~~~~~~~~~~~~~2");
    }
  }
  
  render() {
    const { todo } = this.props;

    return <Search {...this.state} todo={todo} />;
  }
}

export default Container;
