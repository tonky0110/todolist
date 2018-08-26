import React from 'react';
import PropTypes from "prop-types";
import styles from './styles.scss';
import Loading from "components/Loading";
import Todo from "components/Todo";
import Footer from "components/Footer";

const Plan = props => {
    if(props.loading) {
        return <LoadingPlan />
    }else if(props.todo){
        return (
            <div className={styles.plan} >
                <div className={styles.column}>
                    <div className={styles.header}>
                        <div className={styles.id}>id</div>
                        <div className={styles.title}>title</div>
                        <div className={styles.created_at}>created_at</div>
                        <div className={styles.updated_at}>updated_at</div>
                        <div className={styles.status}>status</div>
                    </div>
                </div>
                <div className={styles.column}>
                    <ul className={styles.data}>
                        <ReanderTodo {...props} />
                    </ul>
                </div>            
                <Footer key = {"page"}/>
            </div>
        );
    }
};

const LoadingPlan = props => (
  <div className={styles.plan}>
    <Loading />
  </div>
);
const ReanderTodo = props => {
    const { todo } = props;
    if( todo.length === 0){
        return (
            <li>none</li>
        )
    }
    return (
        props.todo.map(todo => <Todo {...todo} key={todo.id} />)
    )
}
Plan.propTypes = {
    loading: PropTypes.bool.isRequired,
}
export default Plan;