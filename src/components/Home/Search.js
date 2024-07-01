import React, { Component } from 'react';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/actions';
import { SEARCH_MEAL_BY_NAME } from 'constants/resource_URL';

import { Input } from 'components/common/Input';
import './style.scss';

class Search extends Component {
  debouncedSearch = debounce(this.props.doRequestToGetItemsByFirstLetter, 1500);

  handleInputChange = async ({ target }) => {
    const { query, onSearchInputChange } = this.props;
    await onSearchInputChange(query);
    this.debouncedSearch(`${SEARCH_MEAL_BY_NAME}${target.value}`);
  };

  render() {
    return (
      <div className='search-container'>
        <div className='form-search-meal'>
          <Input
            type='text'
            placeholder='Search by meal'
            className='input-search'
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  query: state.appState.query,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export const SearchField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
