import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plan from "./presenter";


class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {
      getTodo: PropTypes.func.isRequired
  };

  componentDidMount() {
      const { getTodo } = this.props;
      if(!this.props.todo){
          getTodo();
      }else {
          this.setState({
              loading: false
          })
      }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.todo) {
      //console.log("nextProps.todo: ", nextProps.todo);
      this.setState({
        loading: false
      });
    }
  }
  render() {
    const { todo } = this.props;
    //console.log("state: ", this.state, "todo: ", todo);
    return <Plan {...this.state} todo={todo} />;
  }
}

export default Container;
