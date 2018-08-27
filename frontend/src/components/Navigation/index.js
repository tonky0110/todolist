import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from 'redux/modules/user';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(userActions.logout());
    },
    goToSearch: searchTerm => {
      dispatch(push(`/search/${searchTerm}`));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);