import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import styles from './styles.scss';
import Auth from "components/Auth";
import Plan from "components/Plan";
import Navigation from 'components/Navigation';
import TodoForm from "components/TodoForm";


const App = props => [
    //Nav
    props.isLoggedIn ? <Navigation key={1} /> : null,
    //Routes
    props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
        
]

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
const PrivateRoutes = props => (
  <Switch>
    <Route key="1" exact path="/" component={Plan} />
    <Route key="2" path="/addTodo" component={TodoForm} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/recover" render={() => "recover password"} />
  </Switch>
);

export default App;
