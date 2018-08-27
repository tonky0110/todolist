import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import styles from './styles.scss';
import Auth from "components/Auth";
import Plan from "components/Plan";
import Navigation from 'components/Navigation';
import TodoForm from "components/TodoForm";
import TodoDetail from "components/TodoDetail";
import Search from "components/Search";

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
    <Route exact path="/" component={Plan} />
    <Route path="/search/:searthTerm" component={Search} />
    <Route path="/todo/:todoId" component={TodoForm} />
    <Route path="/addTodo" component={TodoForm} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/recover" render={() => "recover password"} />
  </Switch>
);

export default App;
