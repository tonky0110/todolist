import React, { Component } from 'react';
import Navigation from './presenter';
//<ion-icon name="clipboard"></ion-icon>
class Container extends Component {
    render() {
        return <Navigation handleLogout={this._handleLogout} />;
    }

    _handleLogout = () => {
        const { logout } = this.props;
        logout();
    }
}



export default Container;