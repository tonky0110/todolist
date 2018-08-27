// imports
import { routerMiddleware, push } from "react-router-redux";
import { actionCreators as userActions } from 'redux/modules/user';

// actions
const SET_TODO = "SET_TODO";
const ADD_TODO = "ADD_TODO";
const DONE_TODO = "DONE_TODO";
const DOING_TODO = "DOING_TODO";

// action creators
function setTodo(todo){
    return {
        type: SET_TODO,
        todo
    }
}

function addTodo(title, beforeIds){
    return { 
        type: ADD_TODO,
        title,
        beforeIds
    };
}

function doDoneTodo(todoId){
    return {
        type: DONE_TODO,
        todoId
    }
}

function doDoingTodo(todoId) {
  return {
    type: DOING_TODO,
    todoId
  };
}

// API actions
function getTodo() {
    return (dispatch, getState) => {
        const { user: {token}} = getState();
        fetch("/todos/", {
            headers:{
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setTodo(json)));
    }
}

function doneTodo(todoId) {
    return (dispatch, getState) => {
        dispatch(doDoneTodo(todoId));
        const { user: { token } } = getState();
        fetch(`/todos/${todoId}/done/`, {
            method: "PUT",
            headers: {
                Authorization: `JWT ${token}`
            }
        }).
        then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            } else if (!response.ok) {
                dispatch(doDoingTodo(todoId));
            }
        });
    }
}

function doingTodo(todoId) {
    return (dispatch, getState) => {
        dispatch(doDoingTodo(todoId));
        const { user: { token } } = getState();
        fetch(`/todos/${todoId}/doing/`, {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`
          }
        }).then(response => {
          if (response.status === 401) {
            dispatch(userActions.logout());
          } else if (!response.ok) {
            dispatch(doDoneTodo(todoId));
          }
        });
    }
}

function submitTodo(title, beforeIds) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/todos/`, {
          method: "POST",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            beforeIds
          })
        })
          .then(response => {
            if (response.status === 401) {
              dispatch(userActions.logout());
            }
            return response.json();
          })
          .then(json => {
              //console.log("submitTodo: ", json);
              //dispatch(getTodo());
              //dispatch(push("/"));
          });
    };
}

function searchByTerm(searchTerm) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        console.log("searchTerm: ", searchTerm);
        fetch(`/todos/search/?terms=${searchTerm}`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => {
            console.log("searchByTerm fetch: ", json);
            dispatch(setTodo(json));
        });
    };
}

// initial state
const initialState = {
};

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODO:
        return applySetTodo(state, action);
        case ADD_TODO:
            return applyAddTodo(state, action);
        case DONE_TODO:
            return applyDoneTodo(state, action);
        case DOING_TODO:
            return applyDoingTodo(state, action);
        default:
        return state;
    }
}

// recuder functions
function applySetTodo(state, action) {
    const { todo } = action;
    //console.log( todo );
  return {
    ...state,
      todo
  };
}

function applyAddTodo(state, action){
    const { title, beforeIds } = action;
    
}

function applyDoneTodo(state, action){
    const { todoId } = action;
    const { todo } = state;
    const updatedTodo = todo.map(todo => {
        if(todo.id === todoId){
            return { ...todo, status: 'done'}
        }
        return todo;
    });
    return { ...state, todo: updatedTodo };
}

function applyDoingTodo(state, action){
    const { todoId } = action;
    const { todo } = state;
    const updatedTodo = todo.map(todo => {
        if(todo.id === todoId){
            return { ...todo, status: 'doing'}
        }
        return todo;
    });
    return { ...state, todo: updatedTodo };
}

// exports
const actionCreators = {
    getTodo,
    doneTodo,
    doingTodo,
    submitTodo,
    searchByTerm,
};

export { actionCreators };

// reducer export
export default reducer;