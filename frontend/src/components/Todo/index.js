import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as todoActions } from 'redux/modules/todos';
import { push } from "react-router-redux";
// const mapStateToProps = ( state, ownProps) => {
//     console.log(state);
// }

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleTodoStatus: () => {
            const { status, id } = ownProps;
            if (status === "doing") {
                console.log("todo_container_status(doing): ", id);
                dispatch(todoActions.doneTodo(id));
            } else if (status === "done") {
                console.log("todo_container_status(done): ", id);
                dispatch(todoActions.doingTodo(id));
            }
        },
        showTodo: (todoId) => {
            // console.log("ownProps: ", ownProps);
            //dispatch(push(`/${todoId}`));
            dispatch(push(`/todo/${todoId}`));
        }
    }
}

export default connect(
  null,
  mapDispatchToProps
)(Container);