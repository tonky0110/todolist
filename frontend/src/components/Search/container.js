import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from './presenter';

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    searchByTerm: PropTypes.func.isRequired,
    todo: PropTypes.array,
  };
  componentDidMount() {
    const { searchByTerm } = this.props;
    console.log(this.props);
    searchByTerm();
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.todo){
          this.setState({
              loading: false
          })
      }
  }
  render() {
    return <Search {...this.state} />;
  }
}

export default Container;