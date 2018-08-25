import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import users from "redux/modules/users";
import todos from "redux/modules/todos";


const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];


if (env === 'development'){
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}


const reducer = combineReducers({
    users,
    todos,
    routing: routerReducer
});

let store;

if (env === 'development') {
    store = initialState =>
        createStore(
            reducer,
            composeWithDevTools(applyMiddleware(...middlewares))
        );
} else {
    store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}


export { history };

export default store();