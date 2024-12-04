import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/actions';

import { loadFromLocalStorage } from 'services/localStorage';
import { INGREDIENTS_LIST } from 'constants/resource_URL';

// import { ListWithPagination } from 'components/common/Pagination';

import './style.scss';

export const PopularIngredients = (props) => {
  const { ingredients } = props;
  const ingredientsList = loadFromLocalStorage('ingredients', ingredients);

  useEffect(() => {
    if (ingredientsList.length !== 0) {
      const { doRequestToGetListOfIngredients } = props;
      doRequestToGetListOfIngredients(INGREDIENTS_LIST);
    }
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content-container">

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.appState.ingredients,
  currentPage: state.appState.paginationOptions.currentPage,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export const PopularIngredientsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopularIngredients);
