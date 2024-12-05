import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/actions';

import { Input } from 'components/common/Input';
import './style.scss';

const Search = (props) => {
  const { searchHandler } = props;
  return (
    <div className='search-container'>
      <div className='form-search-meal'>
        <Input
          type='text'
          placeholder='Search by name'
          className='input-search'
          onChange={searchHandler}
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
