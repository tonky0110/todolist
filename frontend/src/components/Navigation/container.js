import React, { Component } from 'react';
import Navigation from './presenter';
//<ion-icon name="clipboard"></ion-icon>
class Container extends Component {
  state = {
    term: ""
  };
  render() {
    const { term } = this.state;
    return (
      <Navigation
        value={term}
        onSubmit={this._onSubmit}
        onInputChange={this._onInputChange}
        handleLogout={this._handleLogout}
      />
    );
  }
  _onSubmit = event => {
    const { term } = this.state;
    event.preventDefault();
    this.setState({
      term: ""
    });
  };

  _onInputChange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      term: value
    });
  };

  _handleLogout = () => {
    const { logout } = this.props;
    logout();
  };
}



export default Container;