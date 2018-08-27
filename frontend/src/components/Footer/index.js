import { connect } from 'react-redux';
import Container from './container';


const mapStateToProps = ( state, ownProps) => {
    
    const { todos} = state;
    console.log( todos );
    return todos;
}
export default connect(
    mapStateToProps
)(Container);