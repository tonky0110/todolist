import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as todoActions } from 'redux/modules/todos';

const mapStateToProps = (state, ownProps) => {
    const { todos: { todo }, routing: { location } } = state;
    console.log("todo: ", todo);
    console.log("location: ", location);

    return {
        todo, 
        location
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    // const { match: { params: { searthTerm } } } = ownProps;
    return { searchByTerm: searthTerm => {
        //console.log("searthTerm: ", searthTerm);
        dispatch(todoActions.searchByTerm(searthTerm));
      } };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);