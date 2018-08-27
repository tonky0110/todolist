import React from 'react';
import PropTypes from "prop-types";
import formStyles from "components/shared/formStyles.scss";

const TodoForm = props => (
  <div className={formStyles.formComponent}>
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
        //value={JSON.stringify(props.beforeIdsValue)}
        value={beforeIds(props.beforeIdsValue)}
        onChange={props.handleInputChanage}
        name="beforeIds"
      />
      <input type="submit" value={"Add Todo"} className={formStyles.button} />
    </form>
  </div>
);

const beforeIds = beforeIdsValue => {
  console.log(beforeIdsValue);
  if (beforeIdsValue){
    return beforeIdsValue.map(beforeId => beforeId.before);
  }
  return '';
}
  ;

TodoForm.propTypes = {
    titleValue: PropTypes.string.isRequired,
    beforeIdsValue: PropTypes.array.isRequired,
    handleInputChanage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
export default TodoForm;