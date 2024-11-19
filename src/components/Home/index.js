import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/actions';
import { SEARCH_MEAL_BY_NAME } from 'constants/resource_URL';

import { ListWithPagination } from 'components/common/Pagination';
import { SearchField } from './Search';

import './style.scss';

const INITIAL_SEARCH_PARAMETER = 'a';

const Home = (props) => {
  useEffect(() => {
    const { doRequestToGetItemsByFirstLetter } = props;
    doRequestToGetItemsByFirstLetter(`${SEARCH_MEAL_BY_NAME}${INITIAL_SEARCH_PARAMETER}`);
  }, []);

  const { meals, currentPage, changeSelectedPage } = props;

  return (
    <div className='page-wrapper'>
      <div className='content-container'>
        <div className='title-wrapper'>
            <h1>Welcome</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <SearchField />
        <div className='meals-container'>
          <ListWithPagination
            meals={meals}
            currentPage={currentPage}
            amountItemsOnPage={5}
            changeSelectedPage={changeSelectedPage}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  meals: state.appState.meals,
  currentPage: state.appState.paginationOptions.currentPage,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
