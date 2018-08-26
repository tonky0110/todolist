import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoDetail from './presenter';
class Container extends Component {
    render() {
        return <TodoDetail {...this.props} />;
    }
}
export default Container;