import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as todoActions } from "redux/modules/todos";

const mapStateToProps = (state, ownProps) => {
  // const { id, title, status, before, updated_at, created_at} = state;
  console.log("todoFrom", state);

  if (state.routing.location.pathname.startsWith("/todo")) {
    const todoId = parseInt(ownProps.match.params.todoId, 10);
    const todo = state.todos.todo.find(item => item.id === todoId);

    console.log(ownProps.match.params, todoId);

    return {
      title: todo.title,
      before: todo.before
    };
  }

  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitTodo: (title, beforeIds) => {
      dispatch(todoActions.submitTodo(title, beforeIds));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
