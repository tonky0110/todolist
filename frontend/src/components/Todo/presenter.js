import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Todo = props => {
    //console.log(props);
    const { 
        id, 
             title, 
        created_at, 
        updated_at, 
        status, 
        before
    } = props;
    return <li className={styles.todo} onClick={props.handleTodoDetail} >
        <div className={styles.id}>{id}</div>
        <div className={styles.title} >
          {title}
          {before.map(todo => referTodoId(todo))}
        </div>
        <div className={styles.created_at}>{created_at}</div>
        <div className={styles.updated_at}>{updated_at}</div>
        <div className={styles.status} onClick={props.handleTodoStatus}>{status}</div>
      </li>;
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
    username: PropTypes.string.isRequired
  }).isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  before: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      before: PropTypes.number.isRequired,
      after: PropTypes.number.isRequired
    })
  ),
  handleTodoDetail: PropTypes.func.isRequired,
};

export default Todo;