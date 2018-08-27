import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as todoActions } from "redux/modules/todos";

const mapStateToProps = (state, ownProps) => {
  // const { id, title, status, before, updated_at, created_at} = state;
  console.log("todoFrom", state);

  if (state.routing.location.pathname.startsWith("/todo")) {
    const todoId = parseInt(ownProps.match.params.todoId, 10);
    const todo = state.todos.todo.find(item => item.id === todoId);
    const { before } = todo;

    console.log(ownProps.match.params, todoId);
    
    const beforeArray = before.map(before => before.before);
    const beforeString = beforeArray.join(",");
    return {
      title: todo.title,
        before: beforeString
    };
  }

  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitTodo: (title, beforeIds) => {
        // TODO ID가 있는 경우, UPDATE TODO로 DISPATCH...
        console.log("TodoForm.submitTodo: ", ownProps);
        const {match: {params: {todoId}}} = ownProps;
        if ( todoId ){
            console.log("todoId: ", todoId);
            const id = parseInt(todoId, 10);
            dispatch(todoActions.updateTodo(id, title, beforeIds));      
        }
        else {
            const id = parseInt(ownProps.match.params.todoId, 10);
            dispatch(todoActions.submitTodo(title, beforeIds));
        }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
