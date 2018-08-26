import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Todo = props => {
    console.log(props);
    const { 
        id, 
             title, 
        created_at, 
        updated_at, 
        status, 
        before
    } = props;
    return (
        <li className={styles.todo}>
            <span className={styles.id}>{id}</span>
            <span className={styles.title}>
                {title}
                {before.map(todo => referTodoId(todo))}
            </span>
            <span className={styles.created_at}>{created_at}</span>
            <span className={styles.updated_at}>{updated_at}</span>
            <span className={styles.status}>{status}</span>
      </li>
    );
}

const referTodoId = (todo) => {
    const { before } = todo;
    return "@" + before;
}
Todo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    creator: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    before: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            before: PropTypes.number.isRequired,
            after: PropTypes.number.isRequired
        }
    ))
};

export default Todo;