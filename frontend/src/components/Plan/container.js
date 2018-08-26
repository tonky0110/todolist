import React, { Component } from 'react';
import Plan from "./presenter";

class Container extends Component {
    state = {
        loading: true
    }
    render() {
        return <Plan {...this.state} />;
    }
}

export default Container;
