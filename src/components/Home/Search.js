import React from 'react';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/actions';
import { SEARCH_MEAL_BY_NAME } from 'constants/resource_URL';

import { Input } from 'components/common/Input';
import './style.scss';

const Search = (props) => {
  const debouncedSearch = debounce(props.doRequestToGetItemsByFirstLetter, 1500);

  const handleInputChange = async ({ target }) => {
    const { query, onSearchInputChange } = props;
    await onSearchInputChange(query);
    debouncedSearch(`${SEARCH_MEAL_BY_NAME}${target.value}`);
    console.log('target', SEARCH_MEAL_BY_NAME + target.value);
  };

  return (
    <div className='search-container'>
      <div className='form-search-meal'>
        <Input
          type='text'
          placeholder='Search by meal'
          className='input-search'
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  query: state.appState.query,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export const SearchField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
