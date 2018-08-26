// imports


// actions
const SAVE_TOKEN = 'SAVE_TOKEN';


// action creators
function saveToken(token){
    return {
        type: SAVE_TOKEN,
        token
    }
}

// API actions
function facebookLogin(access_token){
    return function(dispatch){
        fetch("/users/login/facebook/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.token) {
                localStorage.setItem("jwt", json.token);
                dispatch(saveToken(json.token));
            }
        })
        .then(err => console.log(err))
    };
}

// initial state
const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false
}

// reducer
function reducer(state=initialState, action) {
    switch(action.type){
        case SAVE_TOKEN:
            return applySaveToken(state, action);
        default:
        return state;
    }
}

// recuder functions
function applySaveToken(state, action){
    const { token } = action;
    return { ...state, isLoggedIn: true, token };
}

// exports
const actionCreators = {
  facebookLogin,

};
export { actionCreators };
// reducer export
export default reducer;