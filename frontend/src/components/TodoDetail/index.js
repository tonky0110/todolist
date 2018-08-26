import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { todos: { todo } } = state;
    return {
        todo
    };
};

export default connect(mapStateToProps)(Container);