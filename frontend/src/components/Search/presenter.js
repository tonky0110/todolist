import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.scss';
import Loading from 'components/Loading';
import Plan from "components/Plan";


const Search = props => {
  return (
    <div className={Styles.search}>
        <div className={Styles.section}>
            {props.loading && <Loading />}
            {!props.loading && 
                props.todo.length >= 0 && (
                  <RenderTodoSearch todo ={props.todo} />
              )
              }
        </div>
    </div>
  );
};

const RenderTodoSearch = props => (
    <Plan todo={props.todo} />
);
    
const NotFound = props => <span clasName={Styles.notFound}>{props.text}</span>;

Search.propTypes = {
    loading: PropTypes.bool.isRequired,
    imageList: PropTypes.array,
    userList: PropTypes.array
};

export default Search;