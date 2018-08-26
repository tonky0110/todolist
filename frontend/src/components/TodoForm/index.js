import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as todoActions } from 'redux/modules/todos';

const mapStateToProps = (state, ownProps) => {
    const { id, title, status, before, updated_at, created_at} = state;
    console.log("todoFrom", state);

}
const mapDispatchToProps = ( dispatch, ownProps ) => {
    return {
        submitTodo: (title, beforeIds ) => {
            dispatch(todoActions.submitTodo(title, beforeIds));
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);