import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import Ionicon from "react-ionicons";


const TodoDetail = props => {
    console.log("TodoDetail: ", props);
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <header className={styles.header}>
                    <h4 className={styles.title}>{props.title}</h4>
                    <span onClick={props.closeTodoDetail}>
                        <Ionicon icon="md-close" fontSize="20px" color="black" />
                    </span>
                </header>
                <div className={styles.content}>
                    {props.loading ? (
                        <Loading />
                    ) : (
                            <RenderTodoDetail todo={props} />
                        )}
                </div>
            </div>
        </div>
    );
};

const RenderTodoDetail = props => {
    console.log("RenderTodoDetail: ", props);
    const { todo : { todo }} = props;
    return (
        <div>
            <input
                type="text"
                prlaceholder="title"
                className={styles.textInput}
                value={todo.title}
                onChange={props.handleInputChange}
                name="title"
            />
            <input
                type="text"
                prlaceholder="title"
                className={styles.textInput}
                value={todo.before.map(before => before.before+",")}
                onChange={props.handleInputChange}
                name="title"
            />
        </div>
    );
};


RenderTodoDetail.propTypes = {};

RenderTodoDetail.propTypes = {
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    todo: PropTypes.array,
    closeTodoDetail: PropTypes.func.isRequired,
};

export default TodoDetail;
