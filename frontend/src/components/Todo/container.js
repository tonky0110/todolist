import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './presenter';

class Container extends Component{
    render(){
        return <Todo {...this.props} />;
    }
} 

export default Container;