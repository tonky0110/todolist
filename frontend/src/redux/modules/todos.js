// imports
import { actionCreators as userActions } from 'redux/modules/user';

// actions
const SET_TODO = "SET_TODO";

// action creators
function setTodo(todo){
    return {
        type: SET_TODO,
        todo
    }
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


// initial state
const initialState = {};

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_TODO:
        return applySetTodo(state, action);
      default:
        return state;
    }
}



// recuder functions
function applySetTodo(state, action) {
    const { todo } = action;
  return {
    ...state,
      todo
  };
}

// exports
const actionCreators = {
    getTodo,
};

export { actionCreators };

// reducer export
export default reducer;