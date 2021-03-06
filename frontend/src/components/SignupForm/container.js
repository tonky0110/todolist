import React, { Component } from 'react';
import SignupForm from './presenter';
import PropTypes from 'prop-types';

class Container extends Component {
  state = {
    email: "",
    name: "",
    username: "",
    password: ""
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired
  };
  render() {
    const { email, name, username, password } = this.state;
    return (
      <SignupForm
        emailValue={email}
        nameValue={name}
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
      />
    );
  }

  _handleInputChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    });
  };
  _handleSubmit = event => {
    const { createAccount } = this.props;
    const { username, password, email, name } = this.state;
    event.preventDefault();
    //redux will be here
    createAccount(username, password, email, name);
  };
  _handleFacebookLogin = response => {
    // console.log(response);
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;