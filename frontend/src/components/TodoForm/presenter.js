import React from 'react';
import PropTypes from "prop-types";
import formStyles from "./styles.scss";

const TodoForm = props => {
    
  return (<div className={formStyles.formComponent}>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder={"title"}
        className={formStyles.textInput}
        value={props.titleValue}
        onChange={props.handleInputChanage}
        name="title"
      />
      <input
        type="text"
        placeholder={"beforeIds"}
        className={formStyles.textInput}
        value={props.beforeIdsValue}
        onChange={props.handleInputChanage}
        name="beforeIds"
      />
      <input type="submit" value={"Add Todo"} className={formStyles.button} />
    </form>
  </div>);
};


TodoForm.propTypes = {
    titleValue: PropTypes.string.isRequired,
    beforeIdsValue: PropTypes.string.isRequired,
    handleInputChanage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
export default TodoForm;