import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as todoActions } from 'redux/modules/todos';

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const { todos: { todo }} = state;
    return { todo };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: { searthTerm } } } = ownProps;
    return {
        searchByTerm: () => {
            dispatch(todoActions.searchByTerm(searthTerm));
        }
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);