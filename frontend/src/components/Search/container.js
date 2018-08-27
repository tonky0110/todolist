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
      console.log("~~~~~~~~~~~~~~~~~2~~~~~~~~~~~~~~~~~~~~")
    searchByTerm();
  }
    componentWillReceiveProps = nextProps => {
        console.log("~~~~~~~~~~~~~~~~~1~~~~~~~~~~~~~~~~~~~~");
        const { searchByTerm, match, location:{pathname} } = this.props;
        if (nextProps.todo) {
            this.setState({
                loading: false
            });
        }

        console.log("this.props.location.pathname: ", pathname);
        console.log("nextProps.location.pathname: ", nextProps.location.pathname);
        console.log("this.props.match: ", match);
        console.log("nextProps.match: ", nextProps.match);
        // if (nextProps.match !== this.props.match) {
        //   searchByTerm();
        // }
        if (nextProps.location.pathname !== pathname) {
            console.log("1~~~~~~~~~~~~~~~~~1~~~~~~~~~~~~~~~~~~~~1")
          searchByTerm();
        }
    };
  render() {
      const { todo }= this.props;
      
      return <Search {...this.state} todo={todo}/>;
  }
}

export default Container;