import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

import * as actions from 'actions/actions';

import { loadFromLocalStorage } from 'services/localStorage';
import { INGREDIENTS_LIST } from 'constants/resource_URL';
import { SearchField } from '../../common/Search';
import { IngredientCard } from '../IngredientCard';

const IngredientsList = (props) => {
  const { ingredients, currentPage, changeSelectedPage } = props;
  const ingredientsList = loadFromLocalStorage('ingredients', ingredients);
  const amountItemsOnPage = 12;

  const [currentDisplayedItems, setCurrentDisplayedItems] = useState([]);
  const [countPages, setCountPages] = useState(1);
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    const { doRequestToGetListOfIngredients } = props;
    if (ingredientsList.length !== 0) {
      doRequestToGetListOfIngredients(INGREDIENTS_LIST);
    }
  }, []);

  useEffect(() => {
    if (!ingredientsList) {
      setNoDataMessage('Ingredients are not found');
      setCurrentDisplayedItems([]);
      setCountPages(1);
    } else {
      const startItemIndex = (currentPage - 1) * amountItemsOnPage;
      const endItemIndex = currentPage * amountItemsOnPage;
      setCurrentDisplayedItems(ingredientsList.slice(startItemIndex, endItemIndex));
      setCountPages(Math.ceil(ingredientsList.length / amountItemsOnPage));
      setNoDataMessage('');
    }
  }, [currentPage]);

  const handlePageClick = async ({ selected }) => {
    const selectedPage = selected + 1;
    await changeSelectedPage(selectedPage);
  };

  const handleInputChange = async ({ target }) => {
    const { query, onSearchInputChange } = props;
    await onSearchInputChange(query);
    debounce(`${target.value}`);
  };

  return (
    <>
      <SearchField searchHandler = {handleInputChange}/>
      <div className="ingredients-list">
        {noDataMessage && <p className="no-data-message">{noDataMessage}</p>}
        {currentDisplayedItems && currentDisplayedItems.map((item, index) => (
            <IngredientCard item={item} key={index} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        initialPage={currentPage - 1}
        pageCount={countPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </>
  );
};

IngredientsList.propTypes = {
  ingredientsList: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  amountItemsOnPage: PropTypes.number.isRequired,
  changeSelectedPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ingredients: state.appState.ingredients,
  currentPage: state.appState.paginationOptions.currentPage,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export const PopularIngredientsList = connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
