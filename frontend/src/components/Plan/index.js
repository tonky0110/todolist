import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as todoActions } from 'redux/modules/todos';

const mapStateToProps = ( state, ownProps ) => {
    console.log("plan:", state);;
    const { todos: { todo } } = state;
    return { todo };
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
    return {
        getTodo: () => {
            dispatch(todoActions.getTodo());
        }
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);