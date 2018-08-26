import React from 'react';
import PropTypes from "prop-types";
import styles from './styles.scss';
import Loading from "components/Loading";

const Plan = props => {
    if(props.loading) {
        return <LoadingPlan />
    }
};

const LoadingPlan = props => (
  <div className={styles.plan}>
    <Loading />
  </div>
);
Plan.propTypes = {
    loading: PropTypes.bool.isRequired,
}
export default Plan;